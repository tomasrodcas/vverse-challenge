from flask import Flask
from flask_cors import CORS
from app.core.config import Config
from app.core.sqlalchemy import db, get_session, close_session
from flask import g
from flask_migrate import Migrate


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    CORS(app)

    @app.before_request
    def start_session():
        g.session = get_session()

    @app.teardown_appcontext
    def shutdown_session(exception=None):
        session = g.pop('session', None)
        if session is not None:
            close_session(session)

    from app.notifications.routes import notification_bp

    app.register_blueprint(notification_bp, url_prefix="/api/v1/notifications")

    return app


app = create_app()
migrate = Migrate(app, db)


if __name__ == "__main__":
    app.run(debug=True)
