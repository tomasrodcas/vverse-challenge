class DomainError(Exception):
    """Base class for domain-level errors."""
    def __init__(self, message: str):
        super().__init__(message)

class NotFoundError(DomainError):
    """Raised when a requested resource is not found."""
    def __init__(self, resource: str, resource_id: str):
        super().__init__(f"{resource} with ID {resource_id} not found.")

class DatabaseCommitError(DomainError):
    """Raised when a database commit fails."""
    def __init__(self, message: str):
        super().__init__(message)

class ValidationError(DomainError):
    """Raised when input validation fails."""
    def __init__(self, message: str):
        super().__init__(message)


