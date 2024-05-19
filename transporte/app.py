import sqlite3
from datetime import datetime
from flask import Flask, render_template, jsonify, request

app = Flask(__name__, static_folder="static")

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
                  tipo_viagem TEXT,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  deleted_at TIMESTAMP)""")
    
    c.execute("PRAGMA table_info(viagens)")
    columns = [info[1] for info in c.fetchall()]
    if 'deleted_at' not in columns:
        c.execute("ALTER TABLE viagens ADD COLUMN deleted_at TIMESTAMP")
    
    conn.commit()
    conn.close()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/form")
def form():
    return render_template("form.html")

@app.route("/cadastrar-paciente")
def cadastrar_paciente():
    return render_template("cadastrar-paciente.html")

@app.route("/cadastrar-viagem")
def cadastrar_viagem():
    return render_template("cadastrar-viagem.html")

@app.route("/lista-pacientes")
def lista_pacientes():
    return render_template("lista-pacientes.html")

@app.route("/lista-viagens")
def lista_viagens():
    return render_template("lista-viagens.html")

@app.route("/calendario")
def calendario():
    return render_template("calendario.html")

@app.route("/buscar-paciente", methods=["POST"])
def buscar_paciente():
    cpf = request.get_json().get("cpf")
    conn = sqlite3.connect("data/transporte.db")
    c = conn.cursor()
    if cpf:
        c.execute("SELECT * FROM pacientes WHERE cpf = ?", (cpf,))
    else:
        c.execute("SELECT * FROM pacientes")
    
    pacientes = c.fetchall()
    conn.close()

    pacientes_json = [{"id": row[0], "cpf": row[1], "nome": row[2], "endereco": row[3], "bairro": row[4], "contato": row[5]} for row in pacientes]

    return jsonify(pacientes_json)

@app.route("/buscar-lista", methods=["POST"])
def buscar_lista():
    date = request.get_json().get("date")

    conn = sqlite3.connect("data/transporte.db")
    c = conn.cursor()
    if date:
        c.execute("SELECT * FROM viagens WHERE data = ?", (date,))
    else:
        c.execute("SELECT * FROM viagens")

    viagens = c.fetchall()
    conn.close()

    viagens_json = [{"id": row[0], "cpf": row[1], "nome": row[2], "endereco": row[3], "bairro": row[4], "contato": row[5], "data": row[6], "destino": row[7], "local": row[8], "acompanhante": row[9], "tipo_viagem": row[10]} for row in viagens]

    return jsonify(viagens_json)

@app.route("/submit-pessoa", methods=["POST"])
def submit_paciente():
    data = request.get_json()
    cpf = data["cpf"]
    nome = data["nome"]
    endereco = data["endereco"]
    bairro = data["bairro"]
    contato = data["contato"]

    created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    modified_at = created_at

    conn = sqlite3.connect("data/transporte.db")
    c = conn.cursor()
    c.execute("""INSERT INTO pacientes
                 (cpf, nome, endereco, bairro, contato, created_at, modified_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?)""",
              (cpf, nome, endereco, bairro, contato, created_at, modified_at))
    conn.commit()
    conn.close()

    return jsonify({"message": "Dados adicionados com sucesso"})

@app.route("/editar-paciente", methods=["POST"])
def editar_paciente():
    data = request.get_json()
    id = data["id"]
    cpf = data["cpf"]
    nome = data["nome"]
    endereco = data["endereco"]
    bairro = data["bairro"]
    contato = data["contato"]

    modified_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    conn = sqlite3.connect("data/transporte.db")
    c = conn.cursor()
    c.execute("""UPDATE pacientes
                 SET nome=?, cpf=?, endereco=?, bairro=?, contato=?, modified_at=?
                 WHERE id=?""",
              (nome, cpf, endereco, bairro, contato, modified_at, id))
    conn.commit()
    conn.close()

    return jsonify({"message": "Dados atualizados com sucesso"})

@app.route("/submit-viagem", methods=["POST"])
def submit_viagem():
    data = request.get_json()
    cpf = data["cpf"]
    nome = data["nome"]
    endereco = data["endereco"]
    bairro = data["bairro"]
    contato = data["contato"]
    data_viagem = data["data"]
    destino = data["cidade_destino"]
    local = data["local"]
    acompanhante = data["acompanhante"]
    tipo_viagem = data["tipo_viagem"]

    created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    modified_at = created_at

    conn = sqlite3.connect("data/transporte.db")
    c = conn.cursor()
    c.execute("""INSERT INTO viagens
                 (cpf, nome, endereco, bairro, contato, data, destino, local, acompanhante, tipo_viagem, created_at, modified_at, deleted_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
              (cpf, nome, endereco, bairro, contato, data_viagem, destino, local, acompanhante, tipo_viagem, created_at, modified_at, None))
    conn.commit()
    conn.close()

    return jsonify({"message": "Viagem adicionada com sucesso"})


if __name__ == "__main__":
    check_tables()
    app.run(debug=True)
