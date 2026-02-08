-- Allow anon to insert into users (Registration)
CREATE POLICY "Enable insert for anon" ON users FOR INSERT TO anon WITH CHECK (true);

-- Allow anon to select from users (Check existence and return ID after insert)
CREATE POLICY "Enable select for anon" ON users FOR SELECT TO anon USING (true);

-- Allow anon to insert initial data
CREATE POLICY "Enable insert preferences for anon" ON preferences FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Enable insert personality for anon" ON personality_profiles FOR INSERT TO anon WITH CHECK (true);
