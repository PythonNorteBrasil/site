import os
import sys
import subprocess
import re
import requests

def get_referenced_issues_and_prs(text, current_pr_number=None):
    # Encontra padrões como #123
    matches = re.findall(r'#(\d+)', text)
    numbers = set()
    for m in matches:
        num = int(m)
        if current_pr_number is None or num != current_pr_number:
            numbers.add(num)
    return sorted(list(numbers))

def main():
    webhook_url = os.environ.get("WEBHOOK_DISCORD_CHANNEL_SITE")
    if not webhook_url:
        print("Aviso: WEBHOOK_DISCORD_CHANNEL_SITE não está configurado.")
        sys.exit(0)

    repo = os.environ.get("GITHUB_REPOSITORY", "PythonNorteBrasil/site")
    branch = os.environ.get("GITHUB_REF_NAME", "main")
    sha = os.environ.get("GITHUB_SHA", "")
    actor = os.environ.get("GITHUB_ACTOR", "github-actions")
    run_id = os.environ.get("GITHUB_RUN_ID", "")
    server_url = os.environ.get("GITHUB_SERVER_URL", "https://github.com")
    github_token = os.environ.get("GITHUB_TOKEN")

    # Tenta obter os detalhes do último commit
    try:
        commit_message = subprocess.check_output(["git", "log", "-1", "--pretty=%B"]).decode("utf-8").strip()
    except Exception:
        commit_message = "Mensagem de commit indisponível"

    commit_url = f"{server_url}/{repo}/commit/{sha}" if sha else ""
    run_url = f"{server_url}/{repo}/actions/runs/{run_id}" if run_id else ""

    short_sha = sha[:7] if sha else "unknown"

    # Mapear PRs e Issues
    prs_info = []
    related_issues = set()

    # Puxar informações do commit_message
    for num in get_referenced_issues_and_prs(commit_message):
        related_issues.add(num)

    if sha:
        headers = {
            "Accept": "application/vnd.github+json",
            "User-Agent": "python-requests/github-actions-discord-notifier"
        }
        if github_token:
            headers["Authorization"] = f"Bearer {github_token}"
            
        url = f"https://api.github.com/repos/{repo}/commits/{sha}/pulls"
        try:
            response = requests.get(url, headers=headers, timeout=10)
            if response.status_code == 200:
                pulls = response.json()
                for pr in pulls:
                    pr_num = pr.get("number")
                    pr_title = pr.get("title")
                    pr_url = pr.get("html_url")
                    pr_user = pr.get("user", {}).get("login", "")
                    
                    prs_info.append(f"[#{pr_num} - {pr_title}]({pr_url}) por @{pr_user}")
                    
                    # Adiciona issues referenciadas no título ou corpo do PR
                    pr_body = pr.get("body") or ""
                    for num in get_referenced_issues_and_prs(pr_title + " " + pr_body, pr_num):
                        related_issues.add(num)
            else:
                print(f"Aviso: Não foi possível obter PRs da API do GitHub (Status: {response.status_code}). Tentando fallback por parsing do commit...")
        except Exception as e:
            print(f"Erro ao buscar Pull Requests da API do GitHub: {e}. Tentando fallback por parsing do commit...")

    # Fallback caso a API não retorne PRs (rate limits, falta de token ou repositório privado)
    if not prs_info:
        first_line = commit_message.split('\n')[0] if commit_message else ""
        # Caso 1: Merge pull request #123
        pr_match = re.search(r'Merge pull request #(\d+)', first_line, re.IGNORECASE)
        # Caso 2: Squash merge "Title (#123)"
        if not pr_match:
            pr_match = re.search(r'\(#(\d+)\)$', first_line)
            
        if pr_match:
            pr_num = int(pr_match.group(1))
            # Remover dos issues relacionados para não duplicar
            related_issues.discard(pr_num)
            
            # Limpa o título do commit para aproximar o título do PR
            pr_title = first_line.replace(f"Merge pull request #{pr_num}", "").strip()
            pr_title = re.sub(r'\s\(#\d+\)$', '', pr_title).strip()
            if not pr_title:
                pr_title = "Pull Request"
                
            pr_url = f"{server_url}/{repo}/pull/{pr_num}"
            prs_info.append(f"[#{pr_num} - {pr_title}]({pr_url})")

    embed = {
        "title": "🚀 Deploy realizado com sucesso!",
        "description": "O site foi atualizado e está no ar!",
        "color": 3066993,  # Verde / Python Green (#2f9a21)
        "fields": [
            {
                "name": "Repositório",
                "value": f"[{repo}]({server_url}/{repo})",
                "inline": True
            },
            {
                "name": "Branch/Ref",
                "value": f"`{branch}`",
                "inline": True
            },
            {
                "name": "Autor do Deploy",
                "value": f"[{actor}]({server_url}/{actor})",
                "inline": True
            },
            {
                "name": "Último Commit",
                "value": f"[`{short_sha}`]({commit_url}) - {commit_message}" if sha else "Não disponível",
                "inline": False
            }
        ],
        "footer": {
            "text": f"Workflow Run #{os.environ.get('GITHUB_RUN_NUMBER', '0')}"
        }
    }

    # Adicionar campo de Pull Requests se houver
    if prs_info:
        embed["fields"].append({
            "name": "Pull Request(s) Associado(s)",
            "value": "\n".join(prs_info),
            "inline": False
        })

    # Adicionar campo de Issues se houver
    if related_issues:
        issues_list = [f"[#{issue_num}]({server_url}/{repo}/issues/{issue_num})" for issue_num in sorted(related_issues)]
        embed["fields"].append({
            "name": "Issue(s) Relacionada(s)",
            "value": ", ".join(issues_list),
            "inline": False
        })

    if run_url:
        embed["fields"].append({
            "name": "Logs de Execução",
            "value": f"[Ver execução do workflow]({run_url})",
            "inline": False
        })

    payload = {
        "embeds": [embed]
    }

    try:
        response = requests.post(webhook_url, json=payload, timeout=10)
        if response.status_code in [200, 204]:
            print("Notificação enviada ao Discord com sucesso!")
        else:
            print(f"Erro ao enviar notificação para o Discord (Status: {response.status_code}): {response.text}")
    except Exception as e:
        print(f"Ocorreu um erro ao conectar com o Discord: {e}")

if __name__ == "__main__":
    main()
