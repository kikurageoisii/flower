
CREATE OR REPLACE FUNCTION get_diary_entries(
    p_secret TEXT,
    p_user_id UUID,
    p_start_date DATE DEFAULT NULL,
    p_end_date DATE DEFAULT NULL
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
    AND (p_start_date IS NULL OR t.entry_date >= p_start_date)
    AND (p_end_date IS NULL OR t.entry_date <= p_end_date)
    ORDER BY t.entry_date DESC;
END;
$$;
