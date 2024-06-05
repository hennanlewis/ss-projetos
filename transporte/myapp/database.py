import sqlite3

def check_tables():
    conn = sqlite3.connect("data/transporte.db")
    c = conn.cursor()

    c.execute("""CREATE TABLE IF NOT EXISTS pacientes
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  cpf TEXT UNIQUE,
                  nome TEXT,
                  endereco TEXT,
                  bairro TEXT,
                  contato TEXT,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)""")

    c.execute("""CREATE TABLE IF NOT EXISTS viagens
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  cpf TEXT,
                  nome TEXT,
                  endereco TEXT,
                  bairro TEXT,
                  contato TEXT,
                  data TEXT,
                  destino TEXT,
                  local TEXT,
                  acompanhante TEXT,
                  obs TEXT,
                  motivo TEXT,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  deleted_at TIMESTAMP)""")
    
    c.execute("""CREATE TABLE IF NOT EXISTS motoristas
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  nome TEXT,
                  veiculo TEXT,
                  qtdd_lugares INTEGER,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  deleted_at TIMESTAMP)""")

    c.execute("""CREATE TABLE IF NOT EXISTS rotas
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  viagem_id INTEGER,
                  motorista_id INTEGER,
                  nome_rota TEXT,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  deleted_at TIMESTAMP,
                  FOREIGN KEY (viagem_id) REFERENCES viagens(id),
                  FOREIGN KEY (motorista_id) REFERENCES motoristas(id))""")

    conn.commit()
    conn.close()
