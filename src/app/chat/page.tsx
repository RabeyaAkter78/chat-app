"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChatSession, UserProfile, Message } from "@/types/chat";
import { mockChats, mockUsers } from "@/lib/mockData";
import Sidebar from "@/components/chat/Sidebar";
import ChatArea from "@/components/chat/ChatArea";
import CreateGroupDialog from "@/components/chat/CreateGroupDialog";

export default function ChatPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{ name: string; phone: string } | null>(null);
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Load user from localStorage & seed chats
  useEffect(() => {
    setIsClient(true);
    const name = localStorage.getItem("chat_user_name");
    const phone = localStorage.getItem("chat_user_phone");

    if (!name || !phone) {
      router.push("/");
      return;
    }

    setCurrentUser({ name, phone });
    setChats(mockChats);
  }, [router]);

  // Select active chat
  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    // Mark as read
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      )
    );
  };

  // Start new chat with searched user
  const handleStartNewChat = (user: UserProfile) => {
    const existingChat = chats.find((c) => !c.isGroup && c.phone === user.phone);

    if (existingChat) {
      handleSelectChat(existingChat.id);
      return;
    }

    // Create new session
    const newChat: ChatSession = {
      id: `c_${Date.now()}`,
      name: user.name,
      isGroup: false,
      phone: user.phone,
      lastMessage: "No messages yet",
      lastMessageTime: "Now",
      unreadCount: 0,
      messages: [],
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  // Create new group chat
  const handleCreateGroup = (groupName: string, memberIds: string[]) => {
    const newGroup: ChatSession = {
      id: `group_${Date.now()}`,
      name: groupName,
      isGroup: true,
      lastMessage: "Group created",
      lastMessageTime: "Now",
      unreadCount: 0,
      members: memberIds,
      messages: [
        {
          id: `m_setup_${Date.now()}`,
          senderId: "system",
          senderName: "System",
          text: `Group "${groupName}" was created.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    };

    setChats((prev) => [newGroup, ...prev]);
    setActiveChatId(newGroup.id);
  };

  // Send message
  const handleSendMessage = (text: string) => {
    if (!activeChatId) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage: Message = {
      id: `m_${Date.now()}`,
      senderId: "me",
      senderName: "You",
      text,
      timestamp,
    };

    // Update active chat's message list
    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === activeChatId) {
          const updatedMessages = [...chat.messages, newMessage];
          return {
            ...chat,
            lastMessage: text,
            lastMessageTime: timestamp,
            messages: updatedMessages,
          };
        }
        return chat;
      })
    );

    // Simulated reply
    const currentActiveChat = chats.find((c) => c.id === activeChatId);
    if (!currentActiveChat) return;

    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      let replyMessage: Message;

      if (currentActiveChat.isGroup) {
        // Pick a random group member
        const possibleMembers = currentActiveChat.members || [];
        const randomMemberId = possibleMembers[Math.floor(Math.random() * possibleMembers.length)] || "u1";
        const memberUser = mockUsers.find((u) => u.id === randomMemberId) || mockUsers[0];
        
        replyMessage = {
          id: `m_reply_${Date.now()}`,
          senderId: memberUser.id,
          senderName: memberUser.name,
          text: `Replying to your message in the group!`,
          timestamp: replyTime,
        };
      } else {
        replyMessage = {
          id: `m_reply_${Date.now()}`,
          senderId: "partner",
          senderName: currentActiveChat.name,
          text: `Thanks for the message! This is an automated response from ${currentActiveChat.name}.`,
          timestamp: replyTime,
        };
      }

      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id === activeChatId) {
            return {
              ...chat,
              lastMessage: currentActiveChat.isGroup 
                ? `${replyMessage.senderName}: ${replyMessage.text}` 
                : replyMessage.text,
              lastMessageTime: replyTime,
              messages: [...chat.messages, replyMessage],
            };
          }
          return chat;
        })
      );
    }, 1500);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("chat_user_name");
    localStorage.removeItem("chat_user_phone");
    router.push("/");
  };

  const activeChat = chats.find((c) => c.id === activeChatId) || null;

  if (!isClient) return null;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* Sidebar Area */}
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onStartNewChat={handleStartNewChat}
        onOpenCreateGroup={() => setIsGroupDialogOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Messaging Area */}
      <ChatArea
        chat={activeChat}
        onSendMessage={handleSendMessage}
      />

      {/* Create Group Modal */}
      <CreateGroupDialog
        isOpen={isGroupDialogOpen}
        onClose={() => setIsGroupDialogOpen(false)}
        onCreateGroup={handleCreateGroup}
      />
    </div>
  );
}
