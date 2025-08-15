import pandas as pd
from openpyxl import load_workbook
import logging
import os
import sys
import shutil

# === CONFIGURAÇÃO ===
EXCEL_PATH = sys.argv[1] if len(sys.argv) > 1 else 'horarioLabs.xlsx'  # Caminho do arquivo Excel (padrão ou via parâmetro)
OUTPUT_SQL = 'inserir_reservas.sql'                      # Nome do arquivo SQL gerado
START_DATE = '2025-06-30'                                # Data de início (YYYY-MM-DD)
END_DATE = '2025-12-31'                                  # Data de fim (YYYY-MM-DD)
# ====================

# Configuração do logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

def generate_reservas_sql(excel_path: str, output_sql: str, start_date: str, end_date: str):
    logging.info(f'Iniciando geração de SQL de reservas para as datas {start_date} a {end_date}')
    logging.info(f'Carregando planilha: {excel_path}')

    # Verifica extensão do arquivo
    ext = os.path.splitext(excel_path)[1].lower()
    if ext not in ['.xlsx', '.xlsm']:
        print(f"ERRO: Formato de arquivo não suportado: {ext}. Envie um arquivo .xlsx ou .xlsm.")
        sys.exit(1)

    try:
        wb = load_workbook(excel_path, data_only=True)
    except Exception as e:
        print(f"ERRO: Falha ao abrir o arquivo: {e}")
        sys.exit(1)

    sheets_config = {
        'MANHÃ': (['Lab1M', 'Lab2M', 'Lab3M', 'Lab4M'], 'Manhã'),
        'TARDE': (['Lab1T', 'Lab2T', 'Lab3T', 'Lab4T'], 'Tarde'),
        'NOITE': (['Lab1N', 'Lab2N'], 'Noite'),
    }

    logging.info(f'Criando arquivo SQL: {output_sql}')
    with open(output_sql, 'w', encoding='utf-8') as f:
        # f.write("DROP PROCEDURE IF EXISTS inserir_reservas;\n")
        # f.write("DELIMITER $$\n")
        f.write("CREATE PROCEDURE inserir_reservas()\nBEGIN\n")
        f.write(f"    DECLARE data_inicio DATE DEFAULT '{start_date}';\n")
        f.write(f"    DECLARE data_fim DATE DEFAULT '{end_date}';\n")
        f.write("    DECLARE data_atual DATE DEFAULT data_inicio;\n\n")
        f.write("    WHILE data_atual <= data_fim DO\n\n")

        for sheet_name, (tables, periodo) in sheets_config.items():
            logging.info(f'Processando planilha: {sheet_name} - Período: {periodo}')
            ws = wb[sheet_name]
            for tbl_name in tables:
                if tbl_name not in ws.tables:
                    logging.warning(f'Tabela {tbl_name} não encontrada em {sheet_name}')
                    continue
                logging.info(f'Lendo tabela: {tbl_name}')
                table = ws.tables[tbl_name]
                data = ws[table.ref]
                rows = [[cell.value for cell in row] for row in data]
                df = pd.DataFrame(rows[1:], columns=rows[0])
                lab_num = int(''.join(filter(str.isdigit, tbl_name)))

                for day_idx, day in enumerate(df.columns):
                    offset = f" + INTERVAL {day_idx} DAY"
                    if periodo in ['Manhã', 'Tarde']:
                        # Horários: 1=(2,3), 2=(4,5), 3=(6,7), 4=(9,10), 5=(11,12), 6=(13,14)
                        schedule_starts = [0, 2, 4, 7, 9, 11]
                        for i, start in enumerate(schedule_starts, start=1):
                            try:
                                aula = df.iloc[start, day_idx]
                                turma = df.iloc[start+1, day_idx]
                            except IndexError:
                                continue
                            if not aula or not turma:
                                continue
                            motivo_text = f"{aula} - {turma}".replace("'", "''")
                            f.write(f"        -- {day} (Laboratório {lab_num} - {periodo}) - Aula {i}\n")
                            f.write(
                                "        INSERT INTO reserva "
                                "(dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)\n"
                                f"        VALUES (data_atual{offset}, '{periodo}', {i}, 3, {lab_num}, '{motivo_text}');\n\n"
                            )
                    else:
                        # Noite: Horário1=(2,3,4), Horário2=(5,6,7)
                        schedule_starts = [0, 3]
                        for i, start in enumerate(schedule_starts, start=1):
                            try:
                                materia = df.iloc[start, day_idx]
                                prof = df.iloc[start+1, day_idx]
                                turma = df.iloc[start+2, day_idx]
                            except IndexError:
                                continue
                            if not materia or not turma:
                                continue
                            motivo_text = f"{materia} - {turma}".replace("'", "''")
                            f.write(f"        -- {day} (Laboratório {lab_num} - Noite) - Aula {i}\n")
                            f.write(
                                "        INSERT INTO reserva "
                                "(dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)\n"
                                f"        VALUES (data_atual{offset}, 'Noite', {i}, 3, {lab_num}, '{motivo_text}');\n\n"
                            )

        f.write("        SET data_atual = data_atual + INTERVAL 7 DAY;\n")
        f.write("    END WHILE;\n")
        f.write("END\n")
        # f.write("DELIMITER ;\n")
        # f.write("CALL inserir_reservas;\n")

    logging.info('Geração de SQL completa')

if __name__ == '__main__':
    generate_reservas_sql(
        excel_path=EXCEL_PATH,
        output_sql=OUTPUT_SQL,
        start_date=START_DATE,
        end_date=END_DATE
    )
    logging.info(f"Arquivo gerado: {OUTPUT_SQL}")
    # Move o arquivo SQL gerado para a pasta do controller

    CONTROLLER_SQL_DIR = os.path.join(os.path.dirname(__file__), 'src','controllers', 'sql')
    os.makedirs(CONTROLLER_SQL_DIR, exist_ok=True)
    dest_path = os.path.join(CONTROLLER_SQL_DIR, OUTPUT_SQL)
    shutil.copy2(OUTPUT_SQL, dest_path)
    logging.info(f"Arquivo SQL copiado para: {dest_path}")