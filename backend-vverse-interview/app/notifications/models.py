from datetime import datetime
from sqlalchemy import Column, String, DateTime, Boolean, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.core.sqlalchemy import db
from app.notifications.entities import Notification


class NotificationModel(db.Model):
    __tablename__ = "notifications"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), default=uuid.uuid4, nullable=False)
    title = Column(String, nullable=False)
    message = Column(String, nullable=False)
    date = Column(DateTime, default=datetime.now)
    type = Column(String, nullable=False)
    is_read = Column(Boolean, default=False)
    link = Column(String, nullable=True)
    icon = Column(String, nullable=True)
    extra_data = Column(JSON, nullable=True)

    @classmethod
    def from_entity(cls, entity: Notification):
        """Converts a Notification entity to a NotificationModel."""
        return cls(
            id=entity.id,
            user_id=entity.user_id,
            title=entity.title,
            message=entity.message,
            date=entity.date,
            type=entity.type,
            is_read=entity.is_read,
            link=entity.link,
            icon=entity.icon,
            extra_data=entity.extra_data,
        )

    def to_entity(self):
        """Converts NotificationModel to a Notification entity."""
        return Notification(
            id=str(self.id),
            user_id=str(self.user_id),
            title=self.title,
            message=self.message,
            date=self.date,
            type=self.type,
            is_read=self.is_read,
            link=self.link,
            icon=self.icon,
            extra_data=self.extra_data,
        )
