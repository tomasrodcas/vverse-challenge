import os
from dotenv import load_dotenv

class Config:
    dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
    load_dotenv(dotenv_path)
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///kanban.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False