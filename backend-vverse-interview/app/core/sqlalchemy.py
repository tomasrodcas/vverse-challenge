from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from flask_sqlalchemy import SQLAlchemy
from app.core.config import Config
from sqlalchemy.orm import Session
import logging
import functools
from sqlalchemy.exc import SQLAlchemyError
from app.core.exceptions import DatabaseCommitError

db = SQLAlchemy()

logger = logging.getLogger(__name__)

def create_db_engine():
    """Creates the PostgreSQL database engine."""
    return create_engine(Config.SQLALCHEMY_DATABASE_URI)

def get_session():
    """Creates a new SQLAlchemy session per request."""
    engine = create_db_engine()
    session = sessionmaker(bind=engine, autocommit=False, autoflush=False)
    return scoped_session(session)

def close_session(session: Session):
    """Closes and removes the session stored in `g.session`."""
    session.remove()  # Properly closes `scoped_session`


def transactional(fn):
    """Decorator to manage SQLAlchemy transactions."""

    @functools.wraps(fn)
    def wrapper(self, *args, **kwargs):
        session = self.session  # Access repository's session
        try:
            result = fn(self, *args, **kwargs)
            session.commit()  # Commit if successful
            return result
        except SQLAlchemyError as e:
            session.rollback()  # Rollback on failure
            logger.error(f"Database transaction failed: {e}")
            raise DatabaseCommitError(f"Database transaction failed: {str(e)}")

    return wrapper
