import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  MessageSquare, 
  Phone, 
  Video, 
  MoreVertical, 
  Smile, 
  Paperclip 
} from "lucide-react";
import { ChatSession } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatAreaProps {
  chat: ChatSession | null;
  onSendMessage: (text: string) => void;
}

export default function ChatArea({ chat, onSendMessage }: ChatAreaProps) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText("");
  };

  if (!chat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 mb-4 shadow-sm">
          <MessageSquare className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
          Your Messages
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
          Search for users in the sidebar, select a chat, or create a group to start conversation instantly.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-50/30 dark:bg-zinc-950/20">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 font-semibold text-sm">
            {chat.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-none text-zinc-900 dark:text-zinc-50">
              {chat.name}
            </h3>
            <span className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 inline-block">
              {chat.isGroup ? "Group Chat" : chat.phone}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-500 hover:text-foreground">
            <Phone className="h-4.5 w-4.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-500 hover:text-foreground">
            <Video className="h-4.5 w-4.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-500 hover:text-foreground">
            <MoreVertical className="h-4.5 w-4.5" />
          </Button>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {chat.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-zinc-400 dark:text-zinc-500">
            <p className="text-sm">No messages yet. Send a message to start the conversation.</p>
          </div>
        ) : (
          chat.messages.map((msg) => {
            const isMe = msg.senderId === "me";
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                {!isMe && chat.isGroup && (
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 ml-1 mb-1 font-semibold">
                    {msg.senderName}
                  </span>
                )}
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-xs ${
                    isMe
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-tl-none"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                  <div
                    className={`text-[9px] text-right mt-1 font-medium ${
                      isMe ? "text-primary-foreground/70" : "text-zinc-400 dark:text-zinc-500"
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Footer */}
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-zinc-500 hover:text-foreground">
            <Smile className="h-5 w-5" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-zinc-500 hover:text-foreground">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-zinc-50/50 dark:bg-zinc-950/40 border-zinc-200 dark:border-zinc-800 focus:border-zinc-300 dark:focus:border-zinc-700"
          />
          <Button type="submit" size="icon" className="h-9 w-9 shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
