-- Grant INSERT permissions to anon role for registration workaround
GRANT INSERT ON users TO anon;
GRANT INSERT ON preferences TO anon;
GRANT INSERT ON personality_profiles TO anon;
