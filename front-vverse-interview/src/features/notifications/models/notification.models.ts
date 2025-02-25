export interface INotification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: "reaction" | "comment" | "post" | "birthday" | "friend_request";
    is_read: boolean;
    date: string;
    link?: string;
    icon?: string;
    extraData?: Record<string, unknown>;
}