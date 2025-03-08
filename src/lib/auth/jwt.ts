import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { UserType } from '@/models/user';

// Get JWT secret from environment variables
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_for_development_only'
);

// User information for the JWT payload
interface UserPayload {
  id: string;
  email: string;
  userType: UserType;
  name?: string;
  companyId?: string;
}

// Sign a JWT with the provided payload
export async function signJWT(payload: UserPayload, expiresIn = '7d'): Promise<string> {
  try {
    const token = await new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expiresIn)
      .setNotBefore(Math.floor(Date.now() / 1000)) // Valid not before current time
      .setSubject(payload.id)
      .setAudience('https://shareyourspace.com')
      .setIssuer('https://shareyourspace.com')
      .sign(JWT_SECRET);

    return token;
  } catch (error) {
    console.error('JWT signing error:', error);
    throw new Error('Failed to create session token');
  }
}

// Verify a JWT and return the payload
export async function verifyJWT<T>(token: string): Promise<T | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: 'https://shareyourspace.com',
      audience: 'https://shareyourspace.com',
    });

    return payload as T;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}

// Get the token from cookies
export async function getTokenFromCookies() {
  const cookieStore = cookies();
  return cookieStore.get('auth-token')?.value;
}

// Get the current user from the JWT token in cookies
export async function getCurrentUser() {
  try {
    const token = await getTokenFromCookies();

    if (!token) {
      return null;
    }

    const payload = await verifyJWT<UserPayload>(token);

    if (!payload) {
      return null;
    }

    // Return basic user info from the token
    return {
      id: payload.id,
      email: payload.email,
      userType: payload.userType,
      name: payload.name,
      companyId: payload.companyId,
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}
