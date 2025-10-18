// app/dashboard/ChatbotSimple.tsx
"use client";

import { useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };



export default function ChatbotSimple({ vehicleProfile }: { vehicleProfile?: any }) {

  
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Msg = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setErr(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg], vehicleProfile }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const botMsg: Msg = { role: "assistant", content: data.reply ?? "No reply" };
      setMessages((prev) => [...prev, botMsg]);
    } catch (e: any) {
      setErr(e?.message ?? "Failed to get reply");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[70vh]">
      <div className="flex-1 overflow-y-auto space-y-3 p-3 border rounded bg-white/5">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <div className="inline-block rounded px-3 py-2 bg-white/10 whitespace-pre-wrap">
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-sm text-white/70">Thinking…</div>}
        {err && <div className="text-sm text-red-400">Error: {err}</div>}
      </div>

      <form onSubmit={sendMessage} className="mt-3 flex gap-2">
        <input
          className="flex-1 rounded border border-white/20 bg-transparent px-3 py-2 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe the issue (e.g., engine light after 15 km)…"
          required
        />
        <button
          className="rounded bg-white/10 px-4 py-2 hover:bg-white/20"
          type="submit"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
}
