from flask import Flask

from myapp.database import check_tables
from myapp.routes import init_routes

def create_app():
    app = Flask(__name__, static_folder="../static", template_folder="../templates")

    with app.app_context():
        check_tables()

    init_routes(app)

    return app
