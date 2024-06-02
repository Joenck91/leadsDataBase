import mysql.connector

try:
    conn = mysql.connector.connect(
        host='localhost',  # ou o endereço do seu servidor MySQL
        user='root',
        password='Luis@1991',
        database='firstData'
    )
    if conn.is_connected():
        print("Conexão estabelecida com sucesso!")
except mysql.connector.Error as err:
    print(f"Erro ao conectar: {err}")
