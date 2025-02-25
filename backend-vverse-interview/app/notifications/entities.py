import uuid
from datetime import datetime

class Notification:
    """Domain entity representing a notification."""
    
    def __init__(self, id: str = None, user_id: str = "", title: str = "", message: str = "", 
                 date: datetime = None, type: str = "", is_read: bool = False, 
                 link: str = None, icon: str = None, extra_data: dict = None):
        self.id = id or str(uuid.uuid4())
        self.user_id = user_id
        self.title = title
        self.message = message
        self.date = date or datetime.utcnow()
        self.type = type
        self.is_read = is_read
        self.link = link
        self.icon = icon
        self.extra_data = extra_data or {}
