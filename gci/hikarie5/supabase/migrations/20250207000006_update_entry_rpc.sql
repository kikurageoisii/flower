
-- 11. Update Diary Entry Content
CREATE OR REPLACE FUNCTION update_diary_entry_content(
    p_secret TEXT,
    p_user_id UUID,
    p_entry_id UUID,
    p_text TEXT
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
    SET raw_text = p_text, updated_at = NOW()
    WHERE id = p_entry_id AND user_id = p_user_id;

    RETURN FOUND;
END;
$$;

GRANT EXECUTE ON FUNCTION update_diary_entry_content TO anon;
