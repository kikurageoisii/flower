
-- RPC functions to allow backend to perform operations securely using a shared secret
-- This bypasses the need for Service Role Key which is currently failing

-- 1. Create Diary Entry
CREATE OR REPLACE FUNCTION create_diary_entry(
    p_secret TEXT,
    p_user_id UUID,
    p_date DATE,
    p_text TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_entry_id UUID;
BEGIN
    IF p_secret != 'memu-backend-secure-ops' THEN
        RAISE EXCEPTION 'Unauthorized';
    END IF;

    INSERT INTO diary_entries (user_id, entry_date, raw_text)
    VALUES (p_user_id, p_date, p_text)
    RETURNING id INTO v_entry_id;

    RETURN v_entry_id;
END;
$$;

GRANT EXECUTE ON FUNCTION create_diary_entry TO anon;

-- 2. Get Diary Entries
CREATE OR REPLACE FUNCTION get_diary_entries(
    p_secret TEXT,
    p_user_id UUID
)
RETURNS TABLE (
    id UUID,
    entry_date DATE,
    raw_text TEXT,
    analysis_data JSONB,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF p_secret != 'memu-backend-secure-ops' THEN
        RAISE EXCEPTION 'Unauthorized';
    END IF;

    RETURN QUERY
    SELECT t.id, t.entry_date, t.raw_text, t.analysis_data, t.created_at, t.updated_at
    FROM diary_entries t
    WHERE t.user_id = p_user_id
    ORDER BY t.entry_date DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION get_diary_entries TO anon;

-- 3. Get Single Entry
CREATE OR REPLACE FUNCTION get_diary_entry(
    p_secret TEXT,
    p_user_id UUID,
    p_entry_id UUID
)
RETURNS TABLE (
    id UUID,
    entry_date DATE,
    raw_text TEXT,
    analysis_data JSONB,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF p_secret != 'memu-backend-secure-ops' THEN
        RAISE EXCEPTION 'Unauthorized';
    END IF;

    RETURN QUERY
    SELECT t.id, t.entry_date, t.raw_text, t.analysis_data, t.created_at, t.updated_at
    FROM diary_entries t
    WHERE t.user_id = p_user_id AND t.id = p_entry_id;
END;
$$;

GRANT EXECUTE ON FUNCTION get_diary_entry TO anon;

-- 4. Update Analysis Data (for memU engine)
CREATE OR REPLACE FUNCTION update_entry_analysis(
    p_secret TEXT,
    p_entry_id UUID,
    p_analysis JSONB
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF p_secret != 'memu-backend-secure-ops' THEN
        RAISE EXCEPTION 'Unauthorized';
    END IF;

    UPDATE diary_entries
    SET analysis_data = p_analysis, updated_at = NOW()
    WHERE id = p_entry_id;

    RETURN FOUND;
END;
$$;

GRANT EXECUTE ON FUNCTION update_entry_analysis TO anon;
