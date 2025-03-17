import pandas as pd

# Caminho para o arquivo Excel
caminho_planilha = "lista-email-simplificada.xlsx"

# Listar todas as planilhas no arquivo Excel
planilhas = pd.ExcelFile(caminho_planilha).sheet_names
print("Planilhas disponíveis no arquivo:")
for planilha in planilhas:
    print(planilha)

# Nome da planilha que você deseja ler
nome_planilha = "Professores"  # Substitua pelo nome correto

# Verificar se a planilha existe
if nome_planilha not in planilhas:
    print(f"Erro: A planilha '{nome_planilha}' não foi encontrada.")
else:
    # Ler a planilha correta
    df = pd.read_excel(
        caminho_planilha,
        sheet_name=nome_planilha,
        header=1,  # A linha 2 do Excel (B2) será o cabeçalho
        usecols="B:G"  # Usar apenas as colunas B até G
    )

    # Renomear as colunas para facilitar o acesso
    df.columns = ["Matr", "Nome", "Telefone Principal", "Telefone Alternativo", "Email Pessoal", "Email Institucional"]

    # Função para gerar os INSERTs
    def gerar_inserts(df):
        inserts = []
        for index, row in df.iterrows():
            nome = row['Nome']
            email = row['Email Institucional']
            senha = str(row['Matr'])  # Senha é a matrícula
            insert = f"INSERT INTO professor (nome, email, senha) VALUES ('{nome}', '{email}', '{senha}');"
            inserts.append(insert)
        return inserts

    # Gerar os INSERTs
    inserts = gerar_inserts(df)

    # Salvar os INSERTs em um arquivo .sql (opcional)
    with open("inserts_professores.sql", "w", encoding="utf-8") as arquivo_sql:
        for insert in inserts:
            arquivo_sql.write(insert + "\n")

    # Exibir os INSERTs no console (opcional)
    for insert in inserts:
        print(insert)