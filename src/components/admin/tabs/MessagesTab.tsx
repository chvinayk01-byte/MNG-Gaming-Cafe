import React from 'react';
import { Mail, Check, Trash2, Phone } from 'lucide-react';
import { ContactMessage } from '../../../types';
import { db } from '../../../services/storage';

interface MessagesTabProps {
  messages: ContactMessage[];
  onUpdateMessages: (updated: ContactMessage[]) => void;
}

export const MessagesTab: React.FC<MessagesTabProps> = ({ messages, onUpdateMessages }) => {
  const toggleReadStatus = (id: string) => {
    const updated = messages.map((m) =>
      m.id === id ? { ...m, status: (m.status === 'read' ? 'unread' : 'read') as ContactMessage['status'] } : m
    );
    db.saveMessages(updated);
    onUpdateMessages(updated);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete message?')) return;
    const updated = messages.filter((m) => m.id !== id);
    db.saveMessages(updated);
    onUpdateMessages(updated);
  };

  return (
    <div className="space-y-6">
      <h3 className="font-heading text-lg font-bold uppercase text-white">Contact Enquiries Inbox</h3>

      {messages.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-dark-900 p-12 text-center text-xs text-slate-400">
          No customer messages submitted yet.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-2xl border p-5 space-y-3 transition-all ${
                msg.status === 'unread'
                  ? 'border-amber-400/40 bg-dark-900 shadow-xl'
                  : 'border-white/10 bg-dark-950/60 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm text-white">{msg.name}</span>
                  <a href={`tel:${msg.phone}`} className="text-xs text-neon-cyan flex items-center gap-1 font-mono">
                    <Phone className="h-3 w-3" /> {msg.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => toggleReadStatus(msg.id)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${
                      msg.status === 'unread' ? 'bg-amber-400/20 text-amber-400' : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {msg.status === 'unread' ? 'Mark Read' : 'Read'}
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-1 text-slate-500 hover:text-neon-red"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5 leading-relaxed">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
