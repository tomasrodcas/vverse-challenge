from sqlalchemy.orm import Session
from app.notifications.models import NotificationModel
from app.notifications.entities import Notification
from app.notifications.repository import NotificationRepository
from typing import List
from app.core.exceptions import NotFoundError
from sqlalchemy import desc
from app.core.sqlalchemy import transactional

class NotificationRepositoryImpl(NotificationRepository):
    """Implementation of NotificationRepository using SQLAlchemy."""

    def __init__(self, session: Session):
        self.session = session

    def get_all_paginated(self, limit: int, cursor: str = None, unread_only: bool = False) -> [List[Notification], str]:
        """Fetches paginated notifications using cursor-based pagination."""
        query = (self.session.query(NotificationModel)
                 .order_by(desc(NotificationModel.date)))
        if cursor:
            query = query.filter(NotificationModel.date < cursor)

        if unread_only:
            query = query.filter(NotificationModel.is_read == False)

        notifications = query.limit(limit + 1).all()

        if len(notifications) > limit:
            next_cursor = notifications[-1].date.isoformat()
            notifications = notifications[:-1]
        else:
            next_cursor = None

        return [n.to_entity() for n in notifications], next_cursor

    def get_by_id(self, notification_id: str) -> Notification:
        model = self.session.query(NotificationModel).filter_by(id=notification_id).first()
        if not model:
            raise NotFoundError("Notification", notification_id)
        return model.to_entity()

    @transactional
    def mark_as_read(self, notification_id: str) -> None:
        model = self.session.query(NotificationModel).filter_by(id=notification_id).first()
        if not model:
            raise NotFoundError("Notification", notification_id)
        model.is_read = True
        self.session.commit()

    @transactional
    def mark_as_read_batch(self, notification_ids: list) -> None:
        models = self.session.query(NotificationModel).filter(NotificationModel.id.in_(notification_ids)).all()
        for model in models:
            model.is_read = True