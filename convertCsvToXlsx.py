import pandas as pd

# Carregar o arquivo CSV
df = pd.read_csv('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\listaselecionada.csv')

# Converter para Excel
df.to_excel(r'C:\ProgramData\MySQL\MySQL Server 8.0\Uploads\listaselecionada.xlsx', index=False)
