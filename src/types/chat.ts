export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  status?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  name: string;
  avatar?: string;
  isGroup: boolean;
  phone?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  messages: Message[];
  members?: string[]; // IDs of users
}
