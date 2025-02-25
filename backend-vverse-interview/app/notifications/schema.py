from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from app.notifications.entities import Notification

class NotificationSchema(BaseModel):
    """Schema for serializing notifications."""
    id: str
    user_id: str
    title: str
    message: str
    date: datetime
    type: str
    is_read: bool
    link: Optional[str] = None
    icon: Optional[str] = None
    extra_data: Optional[dict] = None

    @classmethod
    def from_entity(cls, entity: Notification):
        """Converts a Notification entity to a response schema."""
        return cls(**entity.__dict__)

class MarkAsReadSchema(BaseModel):
    """Schema for marking a notification as read."""
    is_read: bool


class NotificationPaginationSchema(BaseModel):
    """Schema for paginated notifications response."""
    notifications: List[NotificationSchema]
    next_cursor: Optional[str] = None