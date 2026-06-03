import os
import sys
import subprocess
import json
import re
import requests

def get_referenced_issues_and_prs(text, current_pr_number=None):
    if not text:
        return []
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
    actor = os.environ.get("GITHUB_ACTOR", "github-actions")
    server_url = os.environ.get("GITHUB_SERVER_URL", "https://github.com")
    event_name = os.environ.get("GITHUB_EVENT_NAME", "push")
    event_path = os.environ.get("GITHUB_EVENT_PATH")
    github_token = os.environ.get("GITHUB_TOKEN")

    # Carregar o payload do evento do GitHub
    event_data = {}
    if event_path and os.path.exists(event_path):
        try:
            with open(event_path, "r", encoding="utf-8") as f:
                event_data = json.load(f)
        except Exception as e:
            print(f"Erro ao ler GITHUB_EVENT_PATH: {e}")

    embed = {}
    
    # ----------------------------------------------------
    # Caso 1: Evento de Pull Request
    # ----------------------------------------------------
    if event_name == "pull_request":
        action = event_data.get("action", "opened")
        pr = event_data.get("pull_request", {})
        pr_num = pr.get("number")
        pr_title = pr.get("title")
        pr_url = pr.get("html_url")
        pr_user = pr.get("user", {}).get("login", actor)
        pr_body = pr.get("body") or ""
        
        merged = pr.get("merged", False)
        
        # Cores para cada ação de PR
        if action == "opened":
            color = 1752220  # Verde claro (#1abc9c)
            title = f"🆕 Pull Request #{pr_num} Aberto"
            description = f"Um novo Pull Request foi aberto por **{pr_user}**."
        elif action == "closed":
            if merged:
                color = 10181046 # Roxo/Purple (#9b59b6)
                title = f"🔀 Pull Request #{pr_num} Mesclado"
                description = f"O Pull Request foi mesclado por **{actor}**."
            else:
                color = 15158332 # Vermelho (#e74c3c)
                title = f"❌ Pull Request #{pr_num} Fechado"
                description = f"O Pull Request foi fechado sem mesclar por **{actor}**."
        elif action == "reopened":
            color = 3447003  # Azul (#3498db)
            title = f"🔄 Pull Request #{pr_num} Reaberto"
            description = f"O Pull Request foi reaberto por **{pr_user}**."
        else:
            color = 12370112 # Cinza
            title = f"📝 Pull Request #{pr_num} Atualizado ({action})"
            description = f"Pull Request atualizado por **{actor}**."

        embed = {
            "title": title,
            "description": description,
            "color": color,
            "fields": [
                {
                    "name": "Título",
                    "value": f"[{pr_title}]({pr_url})",
                    "inline": False
                },
                {
                    "name": "Repositório",
                    "value": f"[{repo}]({server_url}/{repo})",
                    "inline": True
                },
                {
                    "name": "Autor",
                    "value": f"[{pr_user}]({server_url}/{pr_user})",
                    "inline": True
                }
            ]
        }
        
        # Mapear issues relacionadas mencionadas no PR
        related_issues = get_referenced_issues_and_prs(pr_title + " " + pr_body, pr_num)
        if related_issues:
            issues_list = [f"[#{issue_num}]({server_url}/{repo}/issues/{issue_num})" for issue_num in related_issues]
            embed["fields"].append({
                "name": "Issue(s) Relacionada(s)",
                "value": ", ".join(issues_list),
                "inline": False
            })

    # ----------------------------------------------------
    # Caso 2: Evento de Issues
    # ----------------------------------------------------
    elif event_name == "issues":
        action = event_data.get("action", "opened")
        issue = event_data.get("issue", {})
        issue_num = issue.get("number")
        issue_title = issue.get("title")
        issue_url = issue.get("html_url")
        issue_user = issue.get("user", {}).get("login", actor)
        
        if action == "opened":
            color = 15844367  # Amarelo/Orange (#f1c40f)
            title = f"⚠️ Issue #{issue_num} Aberta"
            description = f"Uma nova Issue foi criada por **{issue_user}**."
        elif action == "closed":
            color = 3066993  # Verde (#2f9a21)
            title = f"✅ Issue #{issue_num} Resolvida/Fechada"
            description = f"A Issue foi fechada por **{actor}**."
        elif action == "reopened":
            color = 3447003  # Azul (#3498db)
            title = f"🔄 Issue #{issue_num} Reaberta"
            description = f"A Issue foi reaberta por **{issue_user}**."
        else:
            color = 12370112 # Cinza
            title = f"📝 Issue #{issue_num} Atualizada ({action})"
            description = f"Issue atualizada por **{actor}**."

        embed = {
            "title": title,
            "description": description,
            "color": color,
            "fields": [
                {
                    "name": "Título",
                    "value": f"[{issue_title}]({issue_url})",
                    "inline": False
                },
                {
                    "name": "Repositório",
                    "value": f"[{repo}]({server_url}/{repo})",
                    "inline": True
                },
                {
                    "name": "Criador",
                    "value": f"[{issue_user}]({server_url}/{issue_user})",
                    "inline": True
                }
            ]
        }

    # ----------------------------------------------------
    # Caso 3: Evento de Push / Workflow Dispatch (Deploy)
    # ----------------------------------------------------
    else:
        branch = os.environ.get("GITHUB_REF_NAME", "main")
        sha = os.environ.get("GITHUB_SHA", "")
        run_id = os.environ.get("GITHUB_RUN_ID", "")

        try:
            commit_message = subprocess.check_output(["git", "log", "-1", "--pretty=%B"]).decode("utf-8").strip()
        except Exception:
            commit_message = "Mensagem de commit indisponível"

        commit_url = f"{server_url}/{repo}/commit/{sha}" if sha else ""
        run_url = f"{server_url}/{repo}/actions/runs/{run_id}" if run_id else ""
        short_sha = sha[:7] if sha else "unknown"

        prs_info = []
        related_issues = set()

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
                        
                        pr_body = pr.get("body") or ""
                        for num in get_referenced_issues_and_prs(pr_title + " " + pr_body, pr_num):
                            related_issues.add(num)
            except Exception as e:
                print(f"Erro ao buscar Pull Requests da API: {e}")

        # Fallback offline para PRs
        if not prs_info:
            first_line = commit_message.split('\n')[0] if commit_message else ""
            pr_match = re.search(r'Merge pull request #(\d+)', first_line, re.IGNORECASE)
            if not pr_match:
                pr_match = re.search(r'\(#(\d+)\)$', first_line)
                
            if pr_match:
                pr_num = int(pr_match.group(1))
                related_issues.discard(pr_num)
                
                pr_title = first_line.replace(f"Merge pull request #{pr_num}", "").strip()
                pr_title = re.sub(r'\s\(#\d+\)$', '', pr_title).strip()
                if not pr_title:
                    pr_title = "Pull Request"
                    
                pr_url = f"{server_url}/{repo}/pull/{pr_num}"
                prs_info.append(f"[#{pr_num} - {pr_title}]({pr_url})")

        embed = {
            "title": "🚀 Deploy realizado com sucesso!",
            "description": "O site foi atualizado e está no ar!",
            "color": 3066993,  # Python Green (#2f9a21)
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
            ]
        }

        if prs_info:
            embed["fields"].append({
                "name": "Pull Request(s) Associado(s)",
                "value": "\n".join(prs_info),
                "inline": False
            })

        if related_issues:
            issues_list = [f"[#{issue_num}]({server_url}/{repo}/issues/{issue_num})" for issue_num in sorted(related_issues)]
            embed["fields"].append({
                "name": "Issue(s) Relacionada(s)",
                "value": ", ".join(issues_list),
                "inline": False
            })

    # ----------------------------------------------------
    # Rodar o Envio
    # ----------------------------------------------------
    if run_id:
        run_url = f"{server_url}/{repo}/actions/runs/{run_id}"
        embed.setdefault("footer", {})["text"] = f"Workflow Run #{os.environ.get('GITHUB_RUN_NUMBER', '0')}"
        if "fields" not in embed:
            embed["fields"] = []
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
