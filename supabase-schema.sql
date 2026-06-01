-- =====================================================
-- ZenFlow Yoga — Supabase Database Schema
-- Run this in the Supabase SQL Editor
-- =====================================================

-- 1. PROFILES TABLE (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT CHECK (role IN ('student', 'studio')) NOT NULL,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  city TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. STUDIOS TABLE
CREATE TABLE studios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  studio_name TEXT NOT NULL,
  description TEXT,
  address TEXT,
  city TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  total_reviews INT DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CLASSES TABLE
CREATE TABLE classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
  class_name TEXT NOT NULL,
  description TEXT,
  style TEXT, -- vinyasa, yin, power, prenatal, kids, meditation
  level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced', 'all')),
  duration_minutes INT,
  schedule_days TEXT[], -- ['monday', 'wednesday', 'friday']
  schedule_time TIME,
  max_students INT DEFAULT 20,
  price_monthly INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BOOKINGS TABLE
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('confirmed', 'cancelled', 'completed')) DEFAULT 'confirmed',
  booked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, class_id)
);

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Studios
ALTER TABLE studios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view studios"
  ON studios FOR SELECT
  USING (true);

CREATE POLICY "Studio owners can manage own studio"
  ON studios FOR ALL
  USING (user_id = auth.uid());

-- Classes
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active classes"
  ON classes FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Studios can manage own classes"
  ON classes FOR ALL
  USING (
    studio_id IN (SELECT id FROM studios WHERE user_id = auth.uid())
  );

-- Bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own bookings"
  ON bookings FOR SELECT
  USING (student_id = auth.uid());

CREATE POLICY "Students can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can cancel own bookings"
  ON bookings FOR UPDATE
  USING (student_id = auth.uid());

-- Studio owners can view bookings for their classes
CREATE POLICY "Studios can view class bookings"
  ON bookings FOR SELECT
  USING (
    class_id IN (
      SELECT c.id FROM classes c
      JOIN studios s ON c.studio_id = s.id
      WHERE s.user_id = auth.uid()
    )
  );

-- =====================================================
-- TRIGGER: Auto-create profile on signup
-- =====================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =====================================================
-- INDEXES for performance
-- =====================================================

CREATE INDEX idx_studios_user_id ON studios(user_id);
CREATE INDEX idx_classes_studio_id ON classes(studio_id);
CREATE INDEX idx_classes_is_active ON classes(is_active);
CREATE INDEX idx_bookings_student_id ON bookings(student_id);
CREATE INDEX idx_bookings_class_id ON bookings(class_id);
CREATE INDEX idx_bookings_status ON bookings(status);

-- =====================================================
-- ADMIN ROLE & PROMOTIONS TABLE
-- Run this AFTER the initial schema above
-- =====================================================

-- Allow 'admin' as a profile role
ALTER TABLE profiles DROP CONSTRAINT profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check CHECK (role IN ('student', 'studio', 'admin'));

-- Promotions table
CREATE TABLE promotions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  redirect_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage promotions"
  ON promotions FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Anyone can view active promotions"
  ON promotions FOR SELECT
  USING (is_active = TRUE);

-- Admin can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin can delete profiles
CREATE POLICY "Admins can delete profiles"
  ON profiles FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- =====================================================
-- PUBLIC PROFILE SHARING FEATURE
-- Run this AFTER the schema above
-- =====================================================

-- Add new columns for public profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS instagram_url TEXT;

-- Anyone can view public profiles (no login required)
CREATE POLICY "Anyone can view public profiles"
  ON profiles FOR SELECT
  USING (is_public = TRUE);
