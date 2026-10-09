'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from '@/lib/navigation';
import { createPortal } from 'react-dom';
import { BellIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import UserContext from '../../contexts/UserContext';
import { notificationService } from '../../services/notifications';

const formatTime = (value) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));

// TODO: how long the sheet's slide-out runs before it unmounts; matches duration-200 below.
const SHEET_EXIT_MS = 200;

export default function Notifications({ sheet = false }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [dragY, setDragY] = useState(0);
  const containerRef = useRef(null);
  const dragStart = useRef(null);
  const exitTimer = useRef(null);
  const seenIds = useRef(new Set());

  useEffect(() => {
    // TODO: drop the previous account's list right away so a failed refresh never leaves it on screen.
    setItems([]);
    setUnreadCount(0);
    seenIds.current = new Set();
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

  function close() {
    if (!sheet) {
      setOpen(false);
      return;
    }
    setShown(false);
    setDragY(0);
    clearTimeout(exitTimer.current);
    exitTimer.current = setTimeout(() => setOpen(false), SHEET_EXIT_MS);
  }

  useEffect(() => {
    if (!open) return undefined;
    const closeOnOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        close();
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') close();
    };
    // TODO: the sheet closes through its backdrop, so only the dropdown listens for outside clicks.
    if (!sheet) document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open, sheet]);

  // TODO: slide the sheet in on the frame after mount and keep the page behind it from scrolling.
  useEffect(() => {
    if (!sheet || !open) return undefined;
    const frame = requestAnimationFrame(() => setShown(true));
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, [sheet, open]);

  useEffect(() => () => clearTimeout(exitTimer.current), []);

  if (!user) return null;

  const toggle = async () => {
    if (open) close();
    else setOpen(true);
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
    close();
    if (item.link) navigate(item.link);
  };

  // TODO: dragging the sheet's top bar down past 80px dismisses it; a shorter drag snaps back.
  const onDragStart = (event) => {
    dragStart.current = event.touches[0].clientY;
  };
  const onDragMove = (event) => {
    if (dragStart.current === null) return;
    setDragY(Math.max(0, event.touches[0].clientY - dragStart.current));
  };
  const onDragEnd = () => {
    dragStart.current = null;
    if (dragY > 80) close();
    else setDragY(0);
  };

  const markAllRead = async () => {
    await notificationService.markAllRead();
    setItems((current) => current.map((item) => ({ ...item, isRead: true })));
    setUnreadCount(0);
  };

  const heading = (
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
  );

  const list = (
    <div className={sheet ? '' : 'max-h-96 overflow-y-auto'}>
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
  );

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

      {open && !sheet && (
        <div className="absolute right-0 top-full z-[1200] mt-2 w-[22rem] overflow-hidden rounded-xl border border-gray-200 bg-white text-left shadow-xl">
          {heading}
          {list}
        </div>
      )}

      {open && sheet && createPortal(
        <div className="fixed inset-0 z-[9000000] flex items-end">
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity duration-200 motion-reduce:transition-none ${shown ? 'opacity-100' : 'opacity-0'}`}
            onClick={close}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="নোটিফিকেশন"
            style={dragY ? { transform: `translateY(${dragY}px)`, transition: 'none' } : undefined}
            className={`relative flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white text-left shadow-2xl transition-transform duration-200 ease-out motion-reduce:transition-none ${shown ? 'translate-y-0' : 'translate-y-full'}`}
          >
            <div
              onTouchStart={onDragStart}
              onTouchMove={onDragMove}
              onTouchEnd={onDragEnd}
              className="flex-shrink-0 touch-none"
            >
              <div className="flex justify-center pb-1 pt-3" aria-hidden="true">
                <span className="h-1.5 w-10 rounded-full bg-gray-200" />
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 pb-3 pt-1">
                <div>
                  <h2 className="text-base font-bold text-gray-900">নোটিফিকেশন</h2>
                  <p className="mt-0.5 text-xs text-gray-500">{unreadCount} unread</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => void markAllRead()}
                    disabled={!unreadCount}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-brand-900 transition-colors hover:bg-brand-900/5 disabled:text-gray-300 disabled:hover:bg-transparent"
                  >
                    <CheckCircleIcon className="h-4 w-4" />
                    Read all
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    className="rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900/40"
                    aria-label="বন্ধ করুন"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]">
              {list}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
