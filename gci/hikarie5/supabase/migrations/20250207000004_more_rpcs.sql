
-- Additional RPC functions for memU Engine (Moods, Tags, Preferences, Personality)

-- 5. Insert Mood
CREATE OR REPLACE FUNCTION insert_mood(
    p_secret TEXT,
    p_entry_id UUID,
    p_mood_type TEXT,
    p_intensity FLOAT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF p_secret != 'memu-backend-secure-ops' THEN
        RAISE EXCEPTION 'Unauthorized';
    END IF;

    INSERT INTO moods (entry_id, mood_type, intensity)
    VALUES (p_entry_id, p_mood_type, p_intensity);
END;
$$;
GRANT EXECUTE ON FUNCTION insert_mood TO anon;

-- 6. Insert Tags
CREATE OR REPLACE FUNCTION insert_tags(
    p_secret TEXT,
    p_tags JSONB -- Array of {entry_id, tag_name, tag_type, relevance_score}
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF p_secret != 'memu-backend-secure-ops' THEN
        RAISE EXCEPTION 'Unauthorized';
    END IF;

    INSERT INTO tags (entry_id, tag_name, tag_type, relevance_score)
    SELECT 
        (x->>'entry_id')::UUID,
        x->>'tag_name',
        x->>'tag_type',
        (x->>'relevance_score')::FLOAT
    FROM jsonb_array_elements(p_tags) x;
END;
$$;
GRANT EXECUTE ON FUNCTION insert_tags TO anon;

-- 7. Get Preferences
CREATE OR REPLACE FUNCTION get_preferences(
    p_secret TEXT,
    p_user_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_result JSONB;
BEGIN
    IF p_secret != 'memu-backend-secure-ops' THEN
        RAISE EXCEPTION 'Unauthorized';
    END IF;

    SELECT jsonb_build_object(
        'likes', likes,
        'dislikes', dislikes,
        'interests', interests,
        'avoidances', avoidances
    ) INTO v_result
    FROM preferences
    WHERE user_id = p_user_id;

    RETURN v_result;
END;
$$;
GRANT EXECUTE ON FUNCTION get_preferences TO anon;

-- 8. Update Preferences
CREATE OR REPLACE FUNCTION update_preferences(
    p_secret TEXT,
    p_user_id UUID,
    p_likes JSONB,
    p_dislikes JSONB,
    p_interests JSONB,
    p_avoidances JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF p_secret != 'memu-backend-secure-ops' THEN
        RAISE EXCEPTION 'Unauthorized';
    END IF;

    UPDATE preferences
    SET likes = p_likes, dislikes = p_dislikes, interests = p_interests, avoidances = p_avoidances, updated_at = NOW()
    WHERE user_id = p_user_id;
END;
$$;
GRANT EXECUTE ON FUNCTION update_preferences TO anon;

-- 9. Get Personality
CREATE OR REPLACE FUNCTION get_personality(
    p_secret TEXT,
    p_user_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_traits JSONB;
BEGIN
    IF p_secret != 'memu-backend-secure-ops' THEN
        RAISE EXCEPTION 'Unauthorized';
    END IF;

    SELECT traits INTO v_traits
    FROM personality_profiles
    WHERE user_id = p_user_id;

    RETURN v_traits;
END;
$$;
GRANT EXECUTE ON FUNCTION get_personality TO anon;

-- 10. Upsert Personality
CREATE OR REPLACE FUNCTION upsert_personality(
    p_secret TEXT,
    p_user_id UUID,
    p_traits JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF p_secret != 'memu-backend-secure-ops' THEN
        RAISE EXCEPTION 'Unauthorized';
    END IF;

    INSERT INTO personality_profiles (user_id, traits, last_updated)
    VALUES (p_user_id, p_traits, NOW())
    ON CONFLICT (user_id) DO UPDATE
    SET traits = EXCLUDED.traits, last_updated = NOW();
END;
$$;
GRANT EXECUTE ON FUNCTION upsert_personality TO anon;
