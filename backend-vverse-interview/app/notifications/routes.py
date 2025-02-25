from flask import Blueprint, request, jsonify, g
from app.notifications.repository_impl import NotificationRepositoryImpl
from app.notifications.service import NotificationService
from app.notifications.schema import NotificationSchema

notification_bp = Blueprint("notification", __name__)

@notification_bp.route("", methods=["GET"])
def get_notifications():
    """Fetches paginated notifications for the authenticated user using cursor-based pagination."""
    limit = int(request.args.get("limit", 10))
    cursor = request.args.get("cursor", None)
    unread = request.args.get("unread", None)

    service = NotificationService(NotificationRepositoryImpl(g.session))
    result = service.get_all_paginated(limit, cursor, unread)

    return jsonify({
        "notifications": [NotificationSchema.from_entity(n).dict() for n in result["notifications"]],
        "next_cursor": result["next_cursor"]
    })

@notification_bp.route("/<string:notification_id>", methods=["GET"])
def get_notification(notification_id):
    """Fetches a single notification by ID."""
    service = NotificationService(NotificationRepositoryImpl(g.session))
    notification = service.get_by_id(notification_id)
    
    return jsonify(NotificationSchema.from_entity(notification).dict())

@notification_bp.route("/<string:notification_id>", methods=["PATCH"])
def mark_as_read(notification_id):
    """Marks a notification as read."""
    service = NotificationService(NotificationRepositoryImpl(g.session))
    service.mark_as_read(notification_id)

    return jsonify({"message": "Notification marked as read"}), 200

@notification_bp.route("/mark-read", methods=["PATCH"])
def mark_notifications_as_read():
    data = request.json
    notification_ids = data.get("notification_ids", [])

    if not notification_ids:
        return jsonify({"error": "No notifications provided"}), 400
    
    service = NotificationService(NotificationRepositoryImpl(g.session))
    service.mark_as_read_batch(notification_ids)

    return jsonify({"message": "Notifications marked as read"}), 200
