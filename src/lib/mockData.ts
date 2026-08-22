import { UserProfile, ChatSession } from "@/types/chat";

export const mockUsers: UserProfile[] = [
  { id: "u1", name: "Alice Johnson", phone: "+15551111111", status: "Hey there! I am using ChatApp." },
  { id: "u2", name: "Bob Smith", phone: "+15552222222", status: "Busy or sleeping." },
  { id: "u3", name: "Charlie Brown", phone: "+15553333333", status: "Out for lunch." },
  { id: "u4", name: "Diana Prince", phone: "+15554444444", status: "At the gym." },
  { id: "u5", name: "Ethan Hunt", phone: "+15555555555", status: "Mission active." },
  { id: "u6", name: "Fiona Gallagher", phone: "+15556666666", status: "Living life." },
  { id: "u7", name: "George Clark", phone: "+15557777777", status: "Available." }
];

export const mockChats: ChatSession[] = [
  {
    id: "c1",
    name: "Alice Johnson",
    isGroup: false,
    phone: "+15551111111",
    lastMessage: "Are we meeting today?",
    lastMessageTime: "10:30 AM",
    unreadCount: 2,
    messages: [
      { id: "m1", senderId: "u1", senderName: "Alice Johnson", text: "Hey! How are you doing?", timestamp: "10:15 AM" },
      { id: "m2", senderId: "me", senderName: "You", text: "Hi Alice! Doing great, how about you?", timestamp: "10:20 AM" },
      { id: "m3", senderId: "u1", senderName: "Alice Johnson", text: "Awesome! Are we meeting today?", timestamp: "10:30 AM" }
    ]
  },
  {
    id: "c2",
    name: "Bob Smith",
    isGroup: false,
    phone: "+15552222222",
    lastMessage: "I sent you the project documents.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    messages: [
      { id: "m4", senderId: "u2", senderName: "Bob Smith", text: "Hey, do you have the files?", timestamp: "Yesterday" },
      { id: "m5", senderId: "me", senderName: "You", text: "Yes, I have them. Send them over.", timestamp: "Yesterday" },
      { id: "m6", senderId: "u2", senderName: "Bob Smith", text: "I sent you the project documents.", timestamp: "Yesterday" }
    ]
  },
  {
    id: "c3",
    name: "Web Dev Group",
    isGroup: true,
    lastMessage: "Charlie: Let's use Tailwind CSS v4!",
    lastMessageTime: "09:45 AM",
    unreadCount: 0,
    members: ["u1", "u2", "u3"],
    messages: [
      { id: "m7", senderId: "u1", senderName: "Alice Johnson", text: "Should we build with Next.js?", timestamp: "09:40 AM" },
      { id: "m8", senderId: "u3", senderName: "Charlie Brown", text: "Let's use Tailwind CSS v4!", timestamp: "09:45 AM" }
    ]
  }
];
