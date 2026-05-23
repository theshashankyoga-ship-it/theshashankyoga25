export interface UserProfile {
  id: string;
  role: 'student' | 'studio';
  full_name: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Studio {
  id: string;
  user_id: string;
  studio_name: string;
  description: string | null;
  address: string | null;
  city: string | null;
  rating: number;
  total_reviews: number;
  is_verified: boolean;
  created_at: string;
}

export interface YogaClass {
  id: string;
  studio_id: string;
  class_name: string;
  description: string | null;
  style: string | null;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all';
  duration_minutes: number | null;
  schedule_days: string[];
  schedule_time: string | null;
  max_students: number;
  price_monthly: number;
  is_active: boolean;
  created_at: string;
  studios?: Studio;
}

export interface Booking {
  id: string;
  student_id: string;
  class_id: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  booked_at: string;
  classes?: YogaClass;
  profiles?: UserProfile;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
