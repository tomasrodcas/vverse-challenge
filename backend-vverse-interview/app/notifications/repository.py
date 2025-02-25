from abc import ABC, abstractmethod
from app.notifications.entities import Notification

class NotificationRepository(ABC):
    """Abstract repository for Notification operations."""

    @abstractmethod
    def get_all_paginated(self, limit: int, cursor: str, unread_only: bool) -> (list[Notification], str):
        pass

    @abstractmethod
    def get_by_id(self, notification_id: str) -> Notification:
        pass

    @abstractmethod
    def mark_as_read(self, notification_id: str) -> None:
        pass

    @abstractmethod
    def mark_as_read_batch(self, notification_ids: list) -> None:
        pass