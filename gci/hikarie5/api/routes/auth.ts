/**
 * This is a user authentication API route demo.
 * Handle user registration, login, token management, etc.
 */
import { Router, type Request, type Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { supabase } from '../db.js'

const router = Router()

const JWT_SECRET = process.env.JWT_SECRET || 'memu-jwt-secret-key-change-it'

/**
 * User Registration
 * POST /api/auth/register
 */
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      res.status(400).json({ success: false, error: 'Missing required fields' })
      return
    }

    if (password.length < 8) {
      res.status(400).json({ success: false, error: 'Password must be at least 8 characters' })
      return
    }

    // Check if user exists
    const { data: existingUsers, error: checkError } = await supabase
      .from('users')
      .select('id')
      .or(`username.eq.${username},email.eq.${email}`)

    if (checkError) {
      console.error('Error checking user:', checkError)
      res.status(500).json({ success: false, error: 'Database error' })
      return
    }

    if (existingUsers && existingUsers.length > 0) {
      res.status(400).json({ success: false, error: 'Username or email already exists' })
      return
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const password_hash = await bcrypt.hash(password, salt)

    // Create user
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert([
        {
          username,
          email,
          password_hash,
          is_active: true
        }
      ])
      .select()
      .single()

    if (createError) {
      console.error('Error creating user:', createError)
      res.status(500).json({ success: false, error: 'Failed to create user' })
      return
    }

    // Initialize preferences for new user
    await supabase.from('preferences').insert([{ user_id: newUser.id }])
    
    // Initialize personality profile for new user (empty traits)
    await supabase.from('personality_profiles').insert([{ 
      user_id: newUser.id,
      traits: {} 
    }])

    res.status(201).json({
      success: true,
      user_id: newUser.id,
      message: 'User registered successfully'
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

/**
 * User Login
 * POST /api/auth/login
 */
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      res.status(400).json({ success: false, error: 'Missing username or password' })
      return
    }

    // Find user (allow login by username or email)
    const { data: user, error: findError } = await supabase
      .from('users')
      .select('*')
      .or(`username.eq.${username},email.eq.${username}`)
      .single()

    if (findError || !user) {
      res.status(401).json({ success: false, error: 'Invalid credentials' })
      return
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password_hash)
    if (!isMatch) {
      res.status(401).json({ success: false, error: 'Invalid credentials' })
      return
    }

    // Update last login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id)

    // Generate JWT
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

/**
 * User Logout
 * POST /api/auth/logout
 */
router.post('/logout', async (req: Request, res: Response): Promise<void> => {
  // Since we use JWT, logout is client-side (clearing token).
  // We can just return success here.
  res.status(200).json({ success: true, message: 'Logged out successfully' })
})

export default router
