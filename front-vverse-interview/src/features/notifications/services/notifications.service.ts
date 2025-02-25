import { INotification } from "../models/notification.models";
import { config } from "../../../config";

const API_URL = config.API_BASE_URL + "/api/v1/notifications";


export const getNotifications = async (
  limit: number = 10,
  cursor: string | null = null,
  unreadOnly: boolean = false
): Promise<{ notifications: INotification[]; next_cursor: string | null }> => {
  const url = new URL(API_URL);
  url.searchParams.append("limit", limit.toString());
  if (cursor) url.searchParams.append("cursor", cursor);
  if (unreadOnly) url.searchParams.append("unread", "true");

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch notifications: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.log(error)
    throw new Error("Failed to fetch notifications");
  }
};


export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${notificationId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isRead: true }),
    });

    if (!response.ok) {
      throw new Error(`Failed to mark notification as read: ${response.statusText}`);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to mark notification as read");
  }
};


export const markNotificationsAsRead = async (notificationIds: string[]): Promise<void> => {
  try {
    await fetch(`${API_URL}/mark-read`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notification_ids: notificationIds }),
    });
  } catch (error) {
    console.error("Failed to mark notifications as read", error);
  }
};
