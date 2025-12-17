import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// Hardcoded credentials for testing
const VALID_CREDENTIALS = {
  username: 'testuser',
  password: 'password123',
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Validate credentials
    if (
      username === VALID_CREDENTIALS.username &&
      password === VALID_CREDENTIALS.password
    ) {
      // Set auth cookie
      const cookieStore = await cookies()
      cookieStore.set('auth-token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      })

      return NextResponse.json({ success: true })
    } else {
      // Return specific error for testing
      const errorMessage =
        username !== VALID_CREDENTIALS.username
          ? 'Invalid username'
          : 'Invalid password'

      return NextResponse.json(
        { error: errorMessage },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
