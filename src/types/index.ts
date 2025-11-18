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
  image_url: string | null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface BlogPostAPI {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: number;
  author_name: string;
  author_email: string;
  category: string;
  read_time: number;
  is_published: boolean;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
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
  image: string | null;
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
