export type SupportSender = 'user' | 'agent' | 'bot';
export type SupportConversationStatus = 'open' | 'closed';

export interface SupportFaq {
  id: string;
  question: string;
  answer: string;
}

export interface SupportMessage {
  id: string;
  conversationId: string;
  sender: SupportSender;
  body: string;
  createdAt: string;
}

export interface SupportConversation {
  id: string;
  guestId: string | null;
  userId: string | null;
  status: SupportConversationStatus;
  preview: string | null;
  lastMessageAt: string;
  createdAt: string;
  user?: { id: string; fullName: string; mobile: string } | null;
}

export interface ConversationBundle {
  conversation: SupportConversation | null;
  messages: SupportMessage[];
}

export interface AdminConversationList {
  items: SupportConversation[];
  pagination: { page: number; pageSize: number; total: number };
}
