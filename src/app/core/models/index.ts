// User & Auth Models
export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user?: User;
}

export interface User {
  id: number;
  email: string;
  name?: string;
}

// Group Models
export interface Group {
  description: string | null;
  accountParticipants: number;
  name: string;
  id: string;
  profilePicUrl: string | null;
}

export interface WhatsAppGroup {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  memberCount: number;
  inviteLink: string;
  recentImages: {
    url: string;
    timestamp: string;
  }[];
}

// Banned Number Models
export interface BannedNumberDto {
  id: number;
  number: string;
  motive: string;
  by: string;
  lastModified: Date;
}

export interface CreateBannedNumberDto {
  number: string;
  motive: string;
  by: string;
}

export interface BannedNumber {
  id: number;
  number: string;
  motive: string;
  by: string;
  lastModified: Date;
}

export interface CreateBannedNumberType {
  number: string;
  motive: string;
  by: string;
}

// Community Models
export interface CommunityData {
  title: string;
  memberCount: string;
  foundedYear: number;
  description: string;
  groups: {
    total: number;
    list: Array<{
      id: string;
      name: string;
      memberCount: number;
      imageUrl: string;
    }>;
  };
  hackathon: {
    status: 'em-construcao' | 'agendado' | 'finalizado';
    date?: string;
  };
  latestAnnouncement: {
    title: string;
    date: string;
    text: string;
    imageUrl?: string;
  };
  socialMedia: SocialMedia[];
}

export interface SocialMedia {
  handle: string;
  followers: string;
  imageUrl: string;
  links: Array<{
    platform: string;
    url: string;
  }>;
  recentImages?: string[];
}

// API Response Models
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface InviteResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Form Models
export interface LoginType {
  email: string;
  password: string;
}
