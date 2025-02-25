INSERT INTO notifications (id, user_id, title, message, date, type, is_read, link, icon, extra_data)
VALUES
    -- Reactions
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'New Reaction!', 'John liked your post.', NOW() - interval '1 hour', 'reaction', FALSE, 'https://your-app.com/posts/123', 'https://i.imgur.com/HeIi0wU.png', '{"emoji": "❤️"}'),
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'New Reaction!', 'Alice reacted with 😂 to your comment.', NOW() - interval '3 hours', 'reaction', FALSE, 'https://your-app.com/comments/456', 'https://i.imgur.com/HeIi0wU.png', '{"emoji": "😂"}'),
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'New Reaction!', 'Tom loved your post.', NOW() - interval '2 days', 'reaction', FALSE, 'https://your-app.com/posts/789', 'https://i.imgur.com/HeIi0wU.png', '{"emoji": "😍"}'),

    -- Comments
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'New Comment!', 'Mike commented: "Great post!"', NOW() - interval '5 hours', 'comment', FALSE, 'https://your-app.com/posts/789', 'https://i.imgur.com/HeIi0wU.png', NULL),
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'New Comment!', 'Sarah replied to your comment.', NOW() - interval '1 day', 'comment', FALSE, 'https://your-app.com/posts/999', 'https://i.imgur.com/HeIi0wU.png', NULL),

    -- Friend Requests
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'Friend Request', 'Emma sent you a friend request.', NOW() - interval '30 minutes', 'friend_request', FALSE, 'https://your-app.com/friends', 'https://i.imgur.com/HeIi0wU.png', NULL),
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'Friend Request', 'Jake wants to add you as a friend.', NOW() - interval '3 days', 'friend_request', FALSE, 'https://your-app.com/friends', 'https://i.imgur.com/HeIi0wU.png', NULL),

    -- Birthday Reminders
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'Birthday Alert!', 'Today is Sarah’s birthday!', NOW(), 'birthday', FALSE, 'https://your-app.com/birthdays', 'https://i.imgur.com/HeIi0wU.png', NULL),
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'Birthday Alert!', 'Tom’s birthday is tomorrow!', NOW() - interval '12 hours', 'birthday', FALSE, 'https://your-app.com/birthdays', 'https://i.imgur.com/HeIi0wU.png', NULL),

    -- Mentions
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'You were mentioned!', 'Alex mentioned you in a post.', NOW() - interval '4 hours', 'mention', FALSE, 'https://your-app.com/posts/999', 'https://i.imgur.com/HeIi0wU.png', NULL),
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'You were mentioned!', 'Mike tagged you in a comment.', NOW() - interval '2 days', 'mention', FALSE, 'https://your-app.com/posts/1234', 'https://i.imgur.com/HeIi0wU.png', NULL),

    -- Event Invites
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'Event Invitation', 'You are invited to Tech Conference 2025!', NOW() - interval '6 days', 'event_invite', FALSE, 'https://your-app.com/events/5678', 'https://i.imgur.com/HeIi0wU.png', '{"event_id": "5678", "location": "San Francisco"}'),
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'Event Invitation', 'Join our community meetup this weekend!', NOW() - interval '1 week', 'event_invite', FALSE, 'https://your-app.com/events/91011', 'https://i.imgur.com/HeIi0wU.png', '{"event_id": "91011", "location": "New York"}'),

    -- Unread notifications
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'Missed Notification', 'You have 5 unread messages!', NOW() - interval '1 week', 'message_alert', FALSE, 'https://your-app.com/messages', 'https://i.imgur.com/HeIi0wU.png', NULL),
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'System Update', 'We’ve updated our privacy policy.', NOW() - interval '2 weeks', 'system', FALSE, 'https://your-app.com/policy', 'https://i.imgur.com/HeIi0wU.png', NULL),

    -- Extra Notifications to Reach 30+
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'New Reaction!', 'Anna loved your photo.', NOW() - interval '2 days', 'reaction', FALSE, 'https://your-app.com/photos/567', 'https://i.imgur.com/HeIi0wU.png', '{"emoji": "🔥"}'),
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'Comment Alert!', 'Nick replied to your post.', NOW() - interval '1 day', 'comment', FALSE, 'https://your-app.com/posts/4321', 'https://i.imgur.com/HeIi0wU.png', NULL),
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'Friend Request', 'Sophia added you.', NOW() - interval '5 hours', 'friend_request', FALSE, 'https://your-app.com/friends', 'https://i.imgur.com/HeIi0wU.png', NULL),
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'Birthday Reminder', 'It’s Alex’s birthday today!', NOW(), 'birthday', FALSE, 'https://your-app.com/birthdays', 'https://i.imgur.com/HeIi0wU.png', NULL),
    (gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'Event Invite!', 'Join us for a coding workshop.', NOW() - interval '3 days', 'event_invite', FALSE, 'https://your-app.com/events/1122', 'https://i.imgur.com/HeIi0wU.png', '{"event_id": "1122", "location": "Online"}');
