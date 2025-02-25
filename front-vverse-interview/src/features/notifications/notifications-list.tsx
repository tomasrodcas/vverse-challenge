import { useCallback, useEffect, useRef, useState } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getNotifications,
  markNotificationsAsRead,
} from "./services/notifications.service";
import { NotificationItem } from "./components/notification-item";
import styled from "styled-components";
import { useDebounce } from "../../hooks/use-debounce";

export const NotificationsList = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [filter, setFilter] = useState<"all" | "unread">("all");

  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ["notifications", filter],
    queryFn: async ({ pageParam = null }) => {
      return getNotifications(10, pageParam, filter === "unread");
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
        console.log("Last Page: ", lastPage)
        return lastPage.next_cursor ?? undefined
    },
  });
  
  useEffect(() => {
    console.log("HAS NEXT PAGE: ", hasNextPage)
  }, [hasNextPage])
  

  const notifications = data?.pages.flatMap((page) => page.notifications) || [];


  const markAsRead = useMutation({
    mutationFn: markNotificationsAsRead,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notifications", filter] });
    }
  });

  const lastNotificationRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [hasNextPage, fetchNextPage]
  );

    const [seenNotifications, setSeenNotifications] = useState<string[]>([]);
    const debouncedSeenNotifications = useDebounce(seenNotifications, 3000);

    useEffect(() => {
      if (debouncedSeenNotifications.length > 0) {
        markAsRead.mutate(debouncedSeenNotifications);
        setSeenNotifications([]);
      }
    }, [debouncedSeenNotifications]);

    const handleVisibilityChange = (id: string) => {
      setSeenNotifications((prev) => (prev.includes(id) ? prev : [...prev, id]));
    };


  return (
    <Container>
      <Tabs>
        <Tab active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </Tab>
        <Tab active={filter === "unread"} onClick={() => setFilter("unread")}>
          Unread
        </Tab>
      </Tabs>

      {notifications.length ? (
        notifications.map((notification, index) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            ref={
              index === notifications.length - 1 ? lastNotificationRef : null
            }
            onVisible={() => handleVisibilityChange(notification.id)}
          />
        ))
      ) : (
        <EmptyState>No notifications</EmptyState>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 2px solid #ddd;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 10px;
  border: none;
  background: ${({ active }) => (active ? "#e7f3ff" : "transparent")};
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background: #dce8f5;
  }
`;

const EmptyState = styled.p`
  text-align: center;
  padding: 20px;
  color: #999;
`;
