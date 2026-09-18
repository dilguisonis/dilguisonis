"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useWindowManager } from "../WindowManager";

interface Message {
  role: "user" | "assistant";
  content: string;
  reasoning?: string | null;
  speed?: string;
  isDanilo?: boolean;
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
    {
      role: "assistant",
      content:
        "¡Hola! Soy DI-Bot, potenciado en tiempo real por el modelo Ternary-Bonsai-2-27B corriendo en el clúster local de 4x NVIDIA RTX 3090 (96 GB VRAM). Preguntame sobre mis proyectos, experiencia, o pedime que te abra alguna ventana del sistema.",
      speed: "~70.2 t/s",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [masterKeyInput, setMasterKeyInput] = useState("");
  const [daniloKey, setDaniloKey] = useState<string>("");
  const [isDaniloUnlocked, setIsDaniloUnlocked] = useState(false);
  const [expandedReasoningIndex, setExpandedReasoningIndex] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Load saved master key on mount
  useEffect(() => {
    const saved = localStorage.getItem("dilguisonis_danilo_key");
    if (saved) {
      setDaniloKey(saved);
      setIsDaniloUnlocked(true);
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, loading]);

  const handleUnlockDanilo = (e: React.FormEvent) => {
    e.preventDefault();
    if (masterKeyInput.trim()) {
      localStorage.setItem("dilguisonis_danilo_key", masterKeyInput.trim());
      setDaniloKey(masterKeyInput.trim());
      setIsDaniloUnlocked(true);
      setShowKeyModal(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚡ Modo Danilo DESBLOQUEADO. Acceso directo total al clúster de 4x RTX 3090. Podés consultar lo que quieras a Ternary-Bonsai-2-27B sin restricciones de sandbox ni límites de tokens de invitado.",
          isDanilo: true,
        },
      ]);
    }
  };

  const handleLockDanilo = () => {
    localStorage.removeItem("dilguisonis_danilo_key");
    setDaniloKey("");
    setIsDaniloUnlocked(false);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "🔒 Modo Invitado restablecido. El bot vuelve al sandbox seguro de portfolio.",
      },
    ]);
  };

  const send = useCallback(
    async (textToSend?: string) => {
      const text = (textToSend || input).trim();
      if (!text || loading) return;

      const maxLimit = isDaniloUnlocked ? 4000 : 350;
      if (text.length > maxLimit) return;

      setMessages((prev) => [...prev, { role: "user", content: text }]);
      if (!textToSend) setInput("");
      setLoading(true);

      // Extract recent history
      const history = messages.slice(-4).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(daniloKey ? { "x-danilo-key": daniloKey } : {}),
          },
          body: JSON.stringify({
            message: text,
            daniloKey: daniloKey || undefined,
            history,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          const displayed = parseAndRenderMessage(data.reply, openWindow);
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: displayed,
              reasoning: data.reasoning,
              speed: data.speed,
              isDanilo: data.isDanilo,
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: data.error || "Error al conectar con el servidor de inferencia.",
            },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Error de red al conectar con el clúster local 4x RTX 3090.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, openWindow, daniloKey, isDaniloUnlocked, messages]
  );

  return (
    <div className="flex flex-col h-full -m-4 relative">
      {/* Hardware & Rig Top Status Ribbon */}
      <div className="bg-bg-primary/90 border-b border-text-muted/20 px-3 py-1.5 flex items-center justify-between text-[11px] font-mono select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-neon-cyan font-bold">4x RTX 3090</span>
          <span className="text-text-muted">|</span>
          <span className="text-text-secondary hidden sm:inline">Ternary-Bonsai-2-27B</span>
          <span className="text-neon-green/90 bg-neon-green/10 px-1.5 py-0.5 rounded text-[10px]">
            70.2 t/s
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isDaniloUnlocked ? (
            <button
              onClick={handleLockDanilo}
              title="Click para volver al modo invitado seguro"
              className="text-[10px] px-2 py-0.5 bg-neon-green/20 text-neon-green border border-neon-green/40 hover:bg-neon-green/30 transition-colors flex items-center gap-1"
            >
              <span>⚡ MODO DANILO</span>
              <span className="opacity-60 text-[9px]">(Bloquear)</span>
            </button>
          ) : (
            <button
              onClick={() => setShowKeyModal(true)}
              title="Desbloquear acceso total de Danilo al cluster"
              className="text-[10px] px-2 py-0.5 bg-bg-tertiary/70 text-text-muted border border-text-muted/30 hover:text-text-primary hover:border-neon-cyan/40 transition-colors flex items-center gap-1"
            >
              <span>🔒 Invitado</span>
              <span className="opacity-60 text-[9px]">(Admin)</span>
            </button>
          )}
        </div>
      </div>

      {/* Password Modal (Modo Creador Danilo) */}
      {showKeyModal && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleUnlockDanilo}
            className="bg-bg-secondary border border-neon-cyan/40 p-4 max-w-xs w-full shadow-2xl space-y-3 font-mono"
          >
            <div className="flex justify-between items-center text-xs font-bold text-neon-cyan">
              <span>⚡ CLAVE MASTER DANILO</span>
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="text-text-muted hover:text-red-400"
              >
                ✕
              </button>
            </div>
            <p className="text-[11px] text-text-muted leading-tight">
              Ingresá tu contraseña de seguridad para desbloquear inferencia sin límites en tus 4x RTX 3090.
            </p>
            <input
              type="password"
              placeholder="Contraseña de Danilo..."
              value={masterKeyInput}
              onChange={(e) => setMasterKeyInput(e.target.value)}
              autoFocus
              className="w-full bg-bg-primary border border-text-muted/40 px-3 py-1.5 text-xs text-text-primary focus:outline-none focus:border-neon-cyan"
            />
            <div className="flex gap-2 justify-end text-xs">
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="px-2 py-1 text-text-muted hover:text-text-primary"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-neon-cyan/20 border border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/30"
              >
                Desbloquear
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2.5 text-xs sm:text-sm font-mono">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[88%] px-3 py-2 ${
                msg.role === "user"
                  ? "bg-neon-cyan/15 text-text-primary border border-neon-cyan/25 rounded-sm"
                  : "bg-bg-tertiary/60 text-text-secondary border border-text-muted/25 rounded-sm shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-neon-green text-[10px] font-bold">
                  {msg.role === "user" ? "Tú:" : msg.isDanilo ? "Bonsai 27B (Danilo Mode):" : "DI-Bot (Bonsai 4-GPU):"}
                </span>
                {msg.speed && (
                  <span className="text-[9px] text-text-muted font-mono opacity-80">
                    ⚡ {msg.speed}
                  </span>
                )}
              </div>

              {/* Reasoning Accordion (DeepSeek-style <think>) */}
              {msg.reasoning && (
                <div className="mb-2 border border-neon-green/20 bg-black/40 rounded p-1.5 text-[11px]">
                  <button
                    onClick={() =>
                      setExpandedReasoningIndex(expandedReasoningIndex === i ? null : i)
                    }
                    className="flex items-center justify-between w-full text-left text-neon-cyan/80 hover:text-neon-cyan text-[10px]"
                  >
                    <span>🧠 Razonamiento interno ({msg.reasoning.length} chars)</span>
                    <span>{expandedReasoningIndex === i ? "▲" : "▼"}</span>
                  </button>
                  {expandedReasoningIndex === i && (
                    <div className="mt-1.5 text-text-muted text-[10px] whitespace-pre-wrap font-mono border-t border-text-muted/20 pt-1 leading-relaxed max-h-40 overflow-y-auto">
                      {msg.reasoning}
                    </div>
                  )}
                </div>
              )}

              <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-bg-tertiary/60 text-text-muted border border-text-muted/20 px-3 py-2 text-xs font-mono rounded-sm flex items-center gap-2">
              <span className="text-neon-green text-[10px] font-bold">Ternary-Bonsai:</span>
              <span className="text-neon-cyan animate-pulse">Razonando en 4x RTX 3090...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-3 py-1.5 border-t border-text-muted/15 flex gap-1.5 overflow-x-auto select-none bg-bg-secondary/40 text-[10px] font-mono">
        <button
          onClick={() => send("Abrime los proyectos de Danilo")}
          className="whitespace-nowrap px-2 py-0.5 rounded bg-bg-tertiary/50 hover:bg-neon-cyan/15 hover:text-neon-cyan text-text-muted transition-colors border border-text-muted/20"
        >
          📁 Abrir proyectos
        </button>
        <button
          onClick={() => send("¿Qué experiencia tiene Danilo en AMMEG y Wombi?")}
          className="whitespace-nowrap px-2 py-0.5 rounded bg-bg-tertiary/50 hover:bg-neon-cyan/15 hover:text-neon-cyan text-text-muted transition-colors border border-text-muted/20"
        >
          💼 Experiencia AMMEG
        </button>
        <button
          onClick={() => send("¿Qué hardware y GPUs utiliza Danilo para correr modelos?")}
          className="whitespace-nowrap px-2 py-0.5 rounded bg-bg-tertiary/50 hover:bg-neon-cyan/15 hover:text-neon-cyan text-text-muted transition-colors border border-text-muted/20"
        >
          ⚡ 4x RTX 3090 specs
        </button>
        <button
          onClick={() => send("Abrime skills.sh")}
          className="whitespace-nowrap px-2 py-0.5 rounded bg-bg-tertiary/50 hover:bg-neon-cyan/15 hover:text-neon-cyan text-text-muted transition-colors border border-text-muted/20"
        >
          ⚙️ Ver Skills
        </button>
      </div>

      {/* Input Form */}
      <div className="border-t border-text-muted/20 p-2 flex gap-2 bg-bg-secondary/70">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={
            isDaniloUnlocked
              ? "⚡ Modo Danilo: Preguntale a Ternary-Bonsai en tus 4 GPUs..."
              : "Preguntá sobre Danilo, proyectos o hardware..."
          }
          maxLength={isDaniloUnlocked ? 4000 : 350}
          disabled={loading}
          className="flex-1 bg-bg-primary/70 border border-text-muted/30 px-3 py-1.5 text-xs font-mono text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-neon-cyan/60"
        />
        <button
          onClick={() => send()}
          disabled={loading || !input.trim()}
          className="px-3 py-1.5 text-xs font-mono border border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/15 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
