-- Drop existing tables if they exist to ensure a clean slate for memU
DROP TABLE IF EXISTS moods CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS preferences CASCADE;
DROP TABLE IF EXISTS personality_profiles CASCADE;
DROP TABLE IF EXISTS diary_entries CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- create table users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true
);

-- create indexes for users
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);

-- create table diary_entries
CREATE TABLE diary_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    entry_date DATE NOT NULL,
    raw_text TEXT NOT NULL,
    analysis_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- create indexes for diary_entries
CREATE INDEX idx_diary_user_id ON diary_entries(user_id);
CREATE INDEX idx_diary_entry_date ON diary_entries(entry_date);
CREATE INDEX idx_diary_created_at ON diary_entries(created_at DESC);

-- create table personality_profiles
CREATE TABLE personality_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    traits JSONB NOT NULL,
    confidence_score FLOAT DEFAULT 0.0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- create indexes for personality_profiles
CREATE INDEX idx_personality_user_id ON personality_profiles(user_id);

-- create table preferences
CREATE TABLE preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    likes JSONB DEFAULT '[]',
    dislikes JSONB DEFAULT '[]',
    interests JSONB DEFAULT '[]',
    avoidances JSONB DEFAULT '[]',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- create indexes for preferences
CREATE INDEX idx_preferences_user_id ON preferences(user_id);

-- create table tags
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entry_id UUID REFERENCES diary_entries(id) ON DELETE CASCADE,
    tag_name VARCHAR(100) NOT NULL,
    tag_type VARCHAR(50) NOT NULL,
    relevance_score FLOAT DEFAULT 1.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- create indexes for tags
CREATE INDEX idx_tags_entry_id ON tags(entry_id);
CREATE INDEX idx_tags_name ON tags(tag_name);
CREATE INDEX idx_tags_type ON tags(tag_type);

-- create table moods
CREATE TABLE moods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entry_id UUID REFERENCES diary_entries(id) ON DELETE CASCADE,
    mood_type VARCHAR(50) NOT NULL,
    intensity FLOAT DEFAULT 0.5,
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- create indexes for moods
CREATE INDEX idx_moods_entry_id ON moods(entry_id);
CREATE INDEX idx_moods_type ON moods(mood_type);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE diary_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE personality_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE moods ENABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT SELECT ON users TO anon;
GRANT ALL ON users TO authenticated;
GRANT SELECT ON diary_entries TO authenticated;
GRANT ALL ON diary_entries TO authenticated;
GRANT SELECT ON personality_profiles TO authenticated;
GRANT ALL ON personality_profiles TO authenticated;
GRANT SELECT ON preferences TO authenticated;
GRANT ALL ON preferences TO authenticated;
GRANT SELECT ON tags TO authenticated;
GRANT ALL ON tags TO authenticated;
GRANT SELECT ON moods TO authenticated;
GRANT ALL ON moods TO authenticated;

-- Create policies for user data isolation
-- Note: These policies assume auth.uid() matches users.id. 
-- Since we are managing users in public.users, we might need to adjust how we handle auth 
-- or ensure that the auth service populates auth.uid() correctly if we use Supabase Auth.
-- For now, we'll keep the policies as defined in the TAD.

CREATE POLICY "Users can only see their own diary entries" ON diary_entries
    FOR ALL TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can only see their own personality profile" ON personality_profiles
    FOR ALL TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can only see their own preferences" ON preferences
    FOR ALL TO authenticated
    USING (auth.uid() = user_id);
