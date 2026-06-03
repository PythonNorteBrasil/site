import os
import sys
import subprocess
import requests

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

    # Tenta obter os detalhes do último commit
    try:
        commit_message = subprocess.check_output(["git", "log", "-1", "--pretty=%B"]).decode("utf-8").strip()
    except Exception:
        commit_message = "Mensagem de commit indisponível"

    commit_url = f"{server_url}/{repo}/commit/{sha}" if sha else ""
    run_url = f"{server_url}/{repo}/actions/runs/{run_id}" if run_id else ""

    short_sha = sha[:7] if sha else "unknown"

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
