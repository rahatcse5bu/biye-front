/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import { BiodataAgent } from '../../services/biodataAgent';

// ── Filter chip labels (reused from PromptFilter) ────────────────────────────
const RELIGION = { islam: 'ইসলাম', hinduism: 'হিন্দু', christianity: 'খ্রিস্টান' };
const RELIGIOUS_TYPE = {
  practicing_muslim: 'প্র্যাকটিসিং মুসলিম',
  general_muslim: 'সাধারণ মুসলিম',
  practicing_hindu: 'প্র্যাকটিসিং হিন্দু',
  general_hindu: 'সাধারণ হিন্দু',
  practicing_christian: 'প্র্যাকটিসিং খ্রিস্টান',
  general_christian: 'সাধারণ খ্রিস্টান',
};

const chipLabel = (key, value) => {
  const map = {
    bio_type: () => value,
    religion: () => RELIGION[value] || value,
    religious_type: () => RELIGIOUS_TYPE[value] || value,
    marital_status: () => value,
    minAge: () => `বয়স ≥ ${value}`,
    maxAge: () => `বয়স ≤ ${value}`,
    minHeight: () => `উচ্চতা ≥ ${value}'`,
    maxHeight: () => `উচ্চতা ≤ ${value}'`,
    division: () => `বিভাগ: ${value}`,
    zilla: () => `জেলা: ${value}`,
    occupation: () => `পেশা: ${value}`,
    education_medium: () => `শিক্ষা: ${value}`,
    complexion: () => `গায়ের রঙ: ${value}`,
    economic_status: () => `আর্থিক: ${value}`,
  };
  return map[key] ? map[key]() : `${key}: ${value}`;
};

// ── FilterChips ───────────────────────────────────────────────────────────────
const FilterChips = ({ filters }) => {
  const entries = Object.entries(filters).filter(([, v]) => v !== undefined && v !== null);
  if (entries.length === 0) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-1">
      {entries.map(([k, v]) => (
        <span
          key={k}
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
        >
          {chipLabel(k, v)}
        </span>
      ))}
    </div>
  );
};

// ── Message bubble ────────────────────────────────────────────────────────────
const Bubble = ({ msg }) => {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs mr-2 flex-shrink-0 mt-0.5">
          AI
        </div>
      )}
      <div
        className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-indigo-600 text-white rounded-br-sm'
            : 'bg-gray-100 text-gray-800 rounded-bl-sm'
        }`}
      >
        <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
        {msg.appliedFilters && <FilterChips filters={msg.appliedFilters} />}
      </div>
    </div>
  );
};

// ── Typing indicator ──────────────────────────────────────────────────────────
const TypingIndicator = () => (
  <div className="flex justify-start mb-3">
    <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs mr-2 flex-shrink-0">
      AI
    </div>
    <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  </div>
);

// ── Main ChatAgent component ──────────────────────────────────────────────────
const ChatAgent = ({ onApply }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'agent',
      text: 'আসসালামু আলাইকুম! 👋 আমি আপনাকে সঠিক বায়োডাটা খুঁজে পেতে সাহায্য করব। কী ধরনের পাত্র/পাত্রী খুঁজছেন?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const agentRef = useRef(new BiodataAgent());
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const handleSend = async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setLoading(true);

    try {
      const { text: agentText, appliedFilters } = await agentRef.current.sendMessage(trimmed);

      const agentMsg = { role: 'agent', text: agentText };
      if (appliedFilters && Object.keys(appliedFilters).length > 0) {
        agentMsg.appliedFilters = appliedFilters;
        // Apply to the biodata list
        onApply(appliedFilters);
      }

      setMessages((prev) => [...prev, agentMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'agent', text: 'দুঃখিত, একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।' },
      ]);
      console.error('Agent error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    agentRef.current.reset();
    setMessages([
      {
        role: 'agent',
        text: 'চ্যাট রিসেট হয়েছে। নতুনভাবে শুরু করুন — কী ধরনের পাত্র/পাত্রী খুঁজছেন?',
      },
    ]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Quick suggestion chips shown at start
  const suggestions = [
    'ঢাকার ডাক্তার পাত্র খুঁজি',
    'প্র্যাকটিসিং মুসলিম পাত্রী',
    'চট্টগ্রামের ইঞ্জিনিয়ার পাত্র',
    'অবিবাহিত পাত্রী, বয়স ২০-২৫',
  ];

  const showSuggestions = messages.length === 1;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
        title="AI বায়োডাটা সহায়তা"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
        {/* Notification dot */}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          style={{ height: '520px' }}
        >
          {/* Header */}
          <div className="bg-indigo-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">
                AI
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">বায়োডাটা সহায়তা</p>
                <p className="text-indigo-200 text-xs">
                  {loading ? 'ভাবছি...' : 'অনলাইন'}
                </p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="text-indigo-200 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/10 transition-colors"
              title="Reset conversation"
            >
              রিসেট
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3">
            {messages.map((msg, i) => (
              <Bubble key={i} msg={msg} />
            ))}
            {loading && <TypingIndicator />}

            {/* Quick suggestions */}
            {showSuggestions && !loading && (
              <div className="mt-1 mb-2">
                <p className="text-xs text-gray-400 mb-2 text-center">দ্রুত খুঁজুন:</p>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className="text-xs px-2.5 py-1 rounded-full border border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 px-3 py-2.5 flex gap-2 flex-shrink-0">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="বাংলায় লিখুন..."
              rows={1}
              disabled={loading}
              className="flex-1 resize-none border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent disabled:opacity-50"
              style={{ maxHeight: '80px' }}
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors flex-shrink-0 self-end"
            >
              <svg className="w-4 h-4 rotate-90" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAgent;
