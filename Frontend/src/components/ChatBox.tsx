"use client";
import { useState } from "react";
import { askAI } from "../lib/ai";

export default function ChatBox() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    // Add user message
    setMessages(prev => [...prev, { role: "user", text: input }]);
    setInput("");

    // Get AI response
    const res = await askAI(input);

    // Add AI message (use res.message instead of res.reply)
    setMessages(prev => [...prev, { role: "assistant", text: res.message }]);
  };

  return (
    <div className="p-4 border rounded-lg w-full max-w-md mx-auto bg-white shadow-md">
      <div className="h-64 overflow-y-auto mb-3">
        {messages.map((m, i) => (
          <p
            key={i}
            className={m.role === "user" ? "text-right text-blue-600" : "text-left text-gray-800"}
          >
            <strong>{m.role === "user" ? "You" : "AI"}:</strong> {m.text}
          </p>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border px-2 py-1 rounded"
          placeholder="Ask me anything..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
