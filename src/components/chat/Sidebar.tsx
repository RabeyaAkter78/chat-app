import React, { useState } from "react";
import { 
  Search, 
  UserPlus, 
  MessageSquare, 
  Users, 
  LogOut, 
  Settings 
} from "lucide-react";
import { ChatSession, UserProfile } from "@/types/chat";
import { mockUsers } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  chats: ChatSession[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onStartNewChat: (user: UserProfile) => void;
  onOpenCreateGroup: () => void;
  currentUser: { name: string; phone: string } | null;
  onLogout: () => void;
}

export default function Sidebar({
  chats,
  activeChatId,
  onSelectChat,
  onStartNewChat,
  onOpenCreateGroup,
  currentUser,
  onLogout,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Search through existing chats
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Search through global users that are NOT currently in the active chats list
  const filteredGlobalUsers = mockUsers.filter((user) => {
    // Exclude users already in direct chat list
    const hasExistingChat = chats.some((c) => !c.isGroup && c.phone === user.phone);
    const matchesQuery = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    return !hasExistingChat && matchesQuery;
  });

  return (
    <div className="flex h-full w-80 flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
      {/* Header / Profile info */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
            {currentUser?.name ? currentUser.name.split(" ").map(n => n[0]).join("") : "U"}
          </div>
          <div className="overflow-hidden">
            <h3 className="text-sm font-semibold truncate leading-none mb-1">
              {currentUser?.name || "Guest User"}
            </h3>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
              {currentUser?.phone || "No phone"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenCreateGroup}
            title="Create Group"
            className="h-8 w-8 text-zinc-500 hover:text-foreground"
          >
            <Users className="h-4.5 w-4.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onLogout}
            title="Logout"
            className="h-8 w-8 text-zinc-500 hover:text-destructive"
          >
            <LogOut className="h-4.5 w-4.5" />
          </Button>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
          <Input
            placeholder="Search chats or new users..."
            className="pl-9 bg-zinc-50/50 dark:bg-zinc-950/30 border-zinc-200 dark:border-zinc-800 focus:border-zinc-300 dark:focus:border-zinc-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Lists */}
      <div className="flex-1 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/40">
        {/* Search results from global users */}
        {searchQuery.trim() !== "" && filteredGlobalUsers.length > 0 && (
          <div className="pb-2">
            <div className="px-4 py-2 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Start new chat
            </div>
            {filteredGlobalUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => {
                  onStartNewChat(user);
                  setSearchQuery("");
                }}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 font-semibold text-sm">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate">{user.name}</span>
                    <span className="text-[10px] text-primary flex items-center gap-1 font-semibold">
                      <UserPlus className="h-3 w-3" />
                      Chat
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate mt-0.5">
                    {user.status || "Click to message"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Existing Chats */}
        <div>
          {searchQuery.trim() !== "" && (
            <div className="px-4 py-2 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Existing Chats
            </div>
          )}
          {filteredChats.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center text-zinc-400 dark:text-zinc-500">
              <MessageSquare className="h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">No chats found</p>
            </div>
          ) : (
            filteredChats.map((chat) => {
              const isActive = chat.id === activeChatId;
              return (
                <div
                  key={chat.id}
                  onClick={() => onSelectChat(chat.id)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-l-2 transition-all ${
                    isActive
                      ? "bg-zinc-50 dark:bg-zinc-800/40 border-primary"
                      : "border-transparent hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20"
                  }`}
                >
                  <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 font-semibold text-sm">
                      {chat.isGroup ? (
                        <Users className="h-5 w-5 text-zinc-500" />
                      ) : (
                        chat.name.split(" ").map(n => n[0]).join("")
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold truncate text-zinc-900 dark:text-zinc-100">
                        {chat.name}
                      </span>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
                        {chat.lastMessageTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate pr-2">
                        {chat.lastMessage}
                      </p>
                      {chat.unreadCount > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
