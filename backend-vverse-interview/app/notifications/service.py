from app.notifications.repository import NotificationRepository
from app.notifications.entities import Notification

class NotificationService:
    """Handles business logic for Notifications."""

    def __init__(self, repository: NotificationRepository):
        self.repository = repository

    def get_all_paginated(self, limit: int, cursor: str = None, unread_only: bool = False) -> dict:
        """Fetches paginated notifications and returns pagination metadata."""
        # check if filter is provided and it is unseen 
        notifications, next_cursor = self.repository.get_all_paginated(limit, cursor, unread_only)
        return {
            "notifications": notifications,
            "next_cursor": next_cursor
        }

    def get_by_id(self, notification_id: str) -> Notification:
        """Fetches a single notification by ID."""
        return self.repository.get_by_id(notification_id)

    def mark_as_read(self, notification_id: str) -> None:
        """Marks a notification as read."""
        self.repository.mark_as_read(notification_id)

    def mark_as_read_batch(self, notification_ids: list) -> None:
        """Marks multiple notifications as read."""
        self.repository.mark_as_read_batch(notification_ids)
        