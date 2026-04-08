"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useWindowManager } from "../WindowManager";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function parseAndRenderMessage(content: string, openWindow: (id: string) => void) {
  // Extract [OPEN:xxx] commands and execute them
  const openRegex = /\[OPEN:(\w+)\]/g;
  let match;
  while ((match = openRegex.exec(content)) !== null) {
    const windowId = match[1];
    setTimeout(() => openWindow(windowId), 500);
  }

  // Remove tags from displayed text
  const cleanText = content.replace(/\[OPEN:\w+\]/g, "").trim();
  return cleanText;
}

export function ChatWindow() {
  const { openWindow } = useWindowManager();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey! I'm DI-Bot. Ask me about Danilo's projects, skills, or experience — or tell me to open something!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    if (text.length > 300) return;

    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      if (res.ok) {
        const displayed = parseAndRenderMessage(data.reply, openWindow);
        setMessages(prev => [...prev, { role: "assistant", content: displayed }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: data.error || "Something went wrong." }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection error. Try again." }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, openWindow]);

  return (
    <div className="flex flex-col h-full -m-4">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2 text-xs sm:text-sm">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] px-3 py-2 ${
                msg.role === "user"
                  ? "bg-neon-cyan/15 text-text-primary border border-neon-cyan/20"
                  : "bg-bg-tertiary/50 text-text-secondary border border-text-muted/20"
              }`}
            >
              {msg.role === "assistant" && <span className="text-neon-green text-[10px] mr-1">DI-Bot:</span>}
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-bg-tertiary/50 text-text-muted border border-text-muted/20 px-3 py-2 text-xs">
              <span className="text-neon-green text-[10px] mr-1">DI-Bot:</span>
              <span className="cursor-blink">...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-text-muted/20 p-2 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask about Danilo..."
          maxLength={300}
          disabled={loading}
          className="flex-1 bg-bg-primary/50 border border-text-muted/30 px-3 py-1.5 text-xs font-mono text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-neon-cyan/40"
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          className="px-3 py-1.5 text-xs font-mono border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}
