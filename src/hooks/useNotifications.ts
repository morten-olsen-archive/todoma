import { nanoid } from 'nanoid';
import { useState, useCallback, ReactNode } from 'react';

interface Notification {
  id: string;
  content: ReactNode;
}

const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const dismiss = useCallback((id: string) => {
    setNotifications(
      current => current.filter(notification => notification.id !== id),
    );
  }, [setNotifications]);

  const show = useCallback((content: ReactNode, timeout?: number) => {
    const id = nanoid();
    setNotifications(current => [
      ...current,
      { id, content },
    ]);
    if (timeout) {
      setTimeout(
        () => dismiss(id),
        timeout,
      );
    }
  }, [setNotifications, dismiss]);

  return {
    notifications,
    show,
    dismiss,
  };
};

export type { Notification };
export default useNotifications;
