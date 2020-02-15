import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md';
import { formatDistance, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
import {
  Container,
  Badge,
  NotificationList,
  Notification,
  Scroll,
} from './styles';

export default function Notifications() {
  const [visible, SetVisible] = useState(false);
  const [notificaions, setNotofications] = useState([]);

  const hasUnread = useMemo(
    () => !!notificaions.find(notif => notif.read === false),
    [notificaions]
  );

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notifications');
      const data = response.data.map(notification => ({
        ...notification,
        localDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          { addSuffix: true, locale: pt }
        ),
      }));

      setNotofications(data);
    }
    loadNotifications();
  }, []);

  function handleToggleVisible() {
    SetVisible(!visible);
  }

  async function handleMarkAsRead(id) {
    await api.put(`notifications/${id}`);

    setNotofications(
      notificaions.map(notification =>
        notification._id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  }
  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications size={20} color="#7159c1" />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notificaions &&
            notificaions.map(notification => (
              <Notification
                key={notification._id}
                unread={!notification.read}
              >
                <p>{notification.content}</p>
                <time>{notification.localDistance}</time>
                {!notification.read && (
                  <button
                    onClick={() => handleMarkAsRead(notification._id)}
                    type="button"
                  >
                    Marcar como lida
                  </button>
                )}
              </Notification>
            ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
