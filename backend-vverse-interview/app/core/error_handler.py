from flask import jsonify
from app.core.exceptions import DomainError, NotFoundError, DatabaseCommitError, ValidationError

def handle_exception(e):
    """Handles exceptions globally for structured API responses."""
    if isinstance(e, NotFoundError):
        return jsonify({"error": str(e)}), 404
    elif isinstance(e, DatabaseCommitError):
        return jsonify({"error": str(e)}), 500
    elif isinstance(e, ValidationError):
        return jsonify({"error": str(e)}), 400
    elif isinstance(e, DomainError):
        return jsonify({"error": str(e)}), 422
    return jsonify({"error": "An unexpected error occurred"}), 500
