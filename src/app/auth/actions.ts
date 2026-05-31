'use server'

import { createClient as createServerCookieClient } from '@/utils/supabase/server'
import { createClient as createJSClient } from '@supabase/supabase-js'

// We use a separate client without persistence to verify passwords 
// without storing the session in standard cookies.
const getNonCookieClient = () => {
    return createJSClient(
        process.env.SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { auth: { persistSession: false } }
    )
}

export async function initiateLogin(formData: FormData) {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const supabase = getNonCookieClient()

  // Attempt to sign in with password
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInError) {
    if (signInError.message.includes('Invalid login credentials')) {
      return { error: 'Invalid email or password.' }
    }
    return { error: signInError.message }
  }

  // If NO error, the user exists and the password is CORRECT!
  // Send an OTP for the MFA layer.
  const { error: otpError } = await supabase.auth.signInWithOtp({ email })

  if (otpError) {
    return { error: `Failed to send OTP: ${otpError.message}` }
  }

  return { success: true, message: 'Valid password! OTP sent to your email.' }
}

export async function initiateSignup(formData: FormData) {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()
  const confirmPassword = formData.get('confirmPassword')?.toString()
  const name = formData.get('name')?.toString()

  if (!email || !password || !confirmPassword || !name) {
    return { error: 'All fields are required' }
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' }
  }

  const supabase = getNonCookieClient()

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      }
    }
  })

  if (signUpError) {
    if (signUpError.message.includes('already registered')) {
      return { error: 'User already exists. Please login.' }
    }
    return { error: signUpError.message }
  }

  // Supabase may return success but with an empty identities array if the user exists but signups are open
  if (signUpData?.user?.identities && signUpData.user.identities.length === 0) {
    return { error: 'User already exists. Please login.' }
  }

  return { success: true, message: 'Account created! OTP sent to verify your email.' }
}


export async function verifyAuthOtp(formData: FormData) {
  const email = formData.get('email')?.toString()
  const token = formData.get('otp')?.toString()

  if (!email || !token) {
    return { error: 'Email and OTP token are required' }
  }

  // Verify using the SSR cookie client to actually set the session cookies
  const supabase = await createServerCookieClient()

  // Verify the Email OTP
  // For standard OTP codes sent via 'signInWithOtp' or 'signUp', the type 'email' generally covers email verifications.
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  })

  if (error) {
    const message = error.message.toLowerCase()
    if (message.includes('expired') || message.includes('invalid')) {
      return { error: 'Invalid or expired OTP code. Please try again.' }
    }
    return { error: error.message }
  }

  return { success: true, message: 'Successfully authenticated!' }
}

export async function getCurrentUser() {
  try {
    const supabase = await createServerCookieClient()
    const { data } = await supabase.auth.getUser()
    return data.user
  } catch (error) {
    return null
  }
}

export async function signOutAction() {
  const supabase = await createServerCookieClient()
  await supabase.auth.signOut()
}
