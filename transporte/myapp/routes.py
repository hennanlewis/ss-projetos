from flask import render_template, jsonify, request
from datetime import datetime
import sqlite3

def init_routes(app):
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
    
    @app.route("/cadastrar-motorista")
    def cadastrar_motorista():
        return render_template("cadastrar-motorista.html")

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

    @app.route("/buscar-viagem", methods=["POST"])
    def buscar_lista():
        data = request.get_json()
        id = data.get("id")
        date = data.get("date")

        conn = sqlite3.connect("data/transporte.db")
        c = conn.cursor()

        if id:
            deleted_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            c.execute("UPDATE viagens SET deleted_at = ? WHERE id = ?", (deleted_at, id))
            conn.commit()
            conn.close()
            return jsonify({"message": "Registro atualizado com sucesso."})

        elif date:
            c.execute("SELECT * FROM viagens WHERE data = ? AND deleted_at IS NULL", (date,))
        else:
            c.execute("SELECT * FROM viagens WHERE deleted_at IS NULL")

        viagens = c.fetchall()
        conn.close()

        viagens_json = [{"id": row[0], "cpf": row[1], "nome": row[2], "endereco": row[3], "bairro": row[4], "contato": row[5], "data": row[6], "destino": row[7], "local": row[8], "acompanhante": row[9], "obs": row[10], "motivo": row[11]} for row in viagens]

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
        obs = data["obs"]
        motivo = data["motivo"]

        created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        modified_at = created_at

        conn = sqlite3.connect("data/transporte.db")
        c = conn.cursor()
        c.execute("""INSERT INTO viagens
                     (cpf, nome, endereco, bairro, contato, data, destino, local, acompanhante, obs, motivo, created_at, modified_at, deleted_at)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                  (cpf, nome, endereco, bairro, contato, data_viagem, destino, local, acompanhante, obs, motivo, created_at, modified_at, None))
        conn.commit()
        conn.close()

        return jsonify({"message": "Viagem adicionada com sucesso"})

    @app.route("/submit-motorista", methods=["POST"])
    def submit_motorista():
        data = request.get_json()
        nome = data["nome"]
        veiculo = data["veiculo"]
        quantidade_passageiros = data["quantidade_passageiros"]

        created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        modified_at = created_at

        conn = sqlite3.connect("data/transporte.db")
        c = conn.cursor()
        c.execute("""INSERT INTO motoristas
                    (nome, veiculo, qtdd_lugares, created_at, modified_at)
                    VALUES (?, ?, ?, ?, ?)""",
                (nome, veiculo, quantidade_passageiros, created_at, modified_at))
        conn.commit()
        conn.close()

        return jsonify({"message": "Motorista adicionado com sucesso"})
