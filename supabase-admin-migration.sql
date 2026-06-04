-- =====================================================
-- ADMIN DASHBOARD MIGRATION
-- Run this in the Supabase SQL Editor
-- =====================================================

-- 1. Add is_blocked to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_blocked BOOLEAN DEFAULT FALSE;

-- 2. Add new columns to promotions
ALTER TABLE promotions ADD COLUMN IF NOT EXISTS target_audience TEXT DEFAULT 'all' CHECK (target_audience IN ('all', 'student', 'studio'));
ALTER TABLE promotions ADD COLUMN IF NOT EXISTS start_date DATE DEFAULT CURRENT_DATE;
ALTER TABLE promotions ADD COLUMN IF NOT EXISTS end_date DATE;
ALTER TABLE promotions ADD COLUMN IF NOT EXISTS views_count INTEGER DEFAULT 0;
ALTER TABLE promotions ADD COLUMN IF NOT EXISTS clicks_count INTEGER DEFAULT 0;

-- 3. Create promotion_analytics table
CREATE TABLE IF NOT EXISTS promotion_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  promotion_id UUID REFERENCES promotions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  event_type TEXT CHECK (event_type IN ('view', 'click')) NOT NULL,
  user_role TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_promo_analytics_promo_id ON promotion_analytics(promotion_id);
CREATE INDEX IF NOT EXISTS idx_promo_analytics_event_type ON promotion_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_promo_analytics_created_at ON promotion_analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_profiles_is_blocked ON profiles(is_blocked);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- 5. RLS for promotion_analytics
ALTER TABLE promotion_analytics ENABLE ROW LEVEL SECURITY;

-- Admins can view all analytics
CREATE POLICY "Admins can view all analytics"
  ON promotion_analytics FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Any authenticated user can insert analytics (view/click tracking)
CREATE POLICY "Authenticated users can insert analytics"
  ON promotion_analytics FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Admins can delete analytics
CREATE POLICY "Admins can delete analytics"
  ON promotion_analytics FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 6. Admin can update profiles (for blocking)
CREATE POLICY "Admins can update all profiles"
  ON profiles FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 7. Admin can manage studios (for verify toggle)
CREATE POLICY "Admins can update studios"
  ON studios FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can view all studios"
  ON studios FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
