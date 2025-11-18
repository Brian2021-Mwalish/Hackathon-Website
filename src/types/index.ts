export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
  is_staff: boolean;
  is_superuser: boolean;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorId: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  readTime: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  maxAttendees?: number;
  registeredAttendees: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  uploadedBy: string;
  uploadedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
