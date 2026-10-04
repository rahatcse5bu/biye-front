'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from '@/lib/navigation';
import { BellIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import UserContext from '../../contexts/UserContext';
import { notificationService } from '../../services/notifications';

const formatTime = (value) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));

export default function Notifications() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const seenIds = useRef(new Set());

  useEffect(() => {
    if (!user?._id) return undefined;

    let active = true;
    const refresh = async () => {
      try {
        const [nextItems, nextUnreadCount] = await Promise.all([
          notificationService.list(),
          notificationService.unreadCount(),
        ]);
        if (!active) return;
        seenIds.current = new Set(nextItems.map((item) => item._id));
        setItems(nextItems);
        setUnreadCount(nextUnreadCount);
      } catch {
        // Keep customer navigation usable when notifications are unavailable.
      }
    };

    void refresh();
    const client = notificationService.createRealtimeClient();
    const channel = client.channels.get(`notifications:user:${user._id}`);
    const handleNotification = (message) => {
      const next = message?.data;
      if (!next?._id || seenIds.current.has(next._id)) return;
      seenIds.current.add(next._id);
      setItems((current) => [next, ...current].slice(0, 30));
      setUnreadCount((count) => count + 1);

      if (document.hidden && 'Notification' in window && Notification.permission === 'granted') {
        new Notification(next.title, { body: next.message });
      }
    };

    channel.subscribe('notification', handleNotification);
    const handleConnection = () => {
      if (client.connection.state === 'connected') void refresh();
    };
    client.connection.on(handleConnection);

    return () => {
      active = false;
      channel.unsubscribe('notification', handleNotification);
      client.close();
    };
  }, [user?._id]);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  if (!user) return null;

  const toggle = async () => {
    setOpen((value) => !value);
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  const markRead = async (item) => {
    if (!item.isRead) {
      await notificationService.markRead(item._id);
      setItems((current) => current.map((entry) =>
        entry._id === item._id ? { ...entry, isRead: true } : entry,
      ));
      setUnreadCount((count) => Math.max(0, count - 1));
    }
    setOpen(false);
    if (item.link) navigate(item.link);
  };

  const markAllRead = async () => {
    await notificationService.markAllRead();
    setItems((current) => current.map((item) => ({ ...item, isRead: true })));
    setUnreadCount(0);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => void toggle()}
        aria-label={`নোটিফিকেশন${unreadCount ? `, ${unreadCount} unread` : ''}`}
        aria-expanded={open}
        className={`relative inline-flex h-10 w-10 items-center justify-center rounded-[10px] border text-white transition-colors duration-200 hover:border-white/45 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 motion-reduce:transition-none ${open ? 'border-white/45 bg-white/20' : 'border-white/25 bg-white/[0.13]'}`}
      >
        <BellIcon className="h-5 w-5" aria-hidden="true" />
        {unreadCount > 0 && (
          <span className="absolute -right-1.5 -top-1.5 min-w-[18px] rounded-full bg-[#E85D75] px-1 text-center text-[10px] font-bold leading-[18px] text-white ring-2 ring-brand-900">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-x-3 top-[calc(60px+env(safe-area-inset-top))] z-[1200] lg:absolute lg:inset-x-auto lg:right-0 lg:top-full lg:mt-2 lg:w-[22rem] overflow-hidden rounded-xl border border-gray-200 bg-white text-left shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">নোটিফিকেশন</h2>
              <p className="mt-0.5 text-xs text-gray-500">{unreadCount} unread</p>
            </div>
            <button
              type="button"
              onClick={() => void markAllRead()}
              disabled={!unreadCount}
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-900 disabled:text-gray-300"
            >
              <CheckCircleIcon className="h-4 w-4" />
              Read all
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {items.length === 0 ? (
              <div className="px-4 py-10 text-center text-sm text-gray-500">আপনি সব নোটিফিকেশন দেখে ফেলেছেন।</div>
            ) : items.map((item) => (
              <button
                type="button"
                key={item._id}
                onClick={() => void markRead(item)}
                className={`block w-full border-b border-gray-100 px-4 py-3 text-left transition hover:bg-[#0D7377]/5 ${item.isRead ? 'bg-white' : 'bg-[#0D7377]/5'}`}
              >
                <div className="flex items-start gap-3">
                  <span className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${item.isRead ? 'bg-gray-300' : 'bg-brand-900'}`} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-gray-900">{item.title}</span>
                    <span className="mt-1 block text-xs leading-5 text-gray-600">{item.message}</span>
                    <span className="mt-2 block text-[11px] text-gray-400">{formatTime(item.createdAt)}</span>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
