# /usr/bin/env python3
import pandas as pd
import json

# 1. Carregar o CSV
arquivo_csv = "python-norte-2025/python-norte-2025.csv"  # ajuste o caminho se precisar
df = pd.read_csv(arquivo_csv, sep=";", encoding="utf-8")

colum_name = "Cidade"
json_output = "cidades_2025.json"

# 2. Garantir que a coluna Cidade existe
if colum_name not in df.columns:
    raise ValueError(
        "Coluna 'Cidade' não encontrada no arquivo.\n"
        f"Colunas disponíveis: {list(df.columns)}"
    )

# 3. Limpar e agrupar as informações de Cidade
cidades_info = (
    df[colum_name]
    .dropna()           # remove valores vazios
    .astype(str)
    .str.strip()        # tira espaços extras
    .value_counts()     # conta quantas vezes cada cidade aparece
    .reset_index()
    .rename(columns={"index": "cidade", "Cidade": "quantidade"})
    .to_dict(orient="records")
)

# 4. Salvar em JSON
with open(json_output, "w", encoding="utf-8") as f:
    json.dump(cidades_info, f, ensure_ascii=False, indent=2)

print( f"Arquivo '{json_output}' gerado com sucesso!")
