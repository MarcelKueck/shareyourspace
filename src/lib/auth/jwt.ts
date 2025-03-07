import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_for_development_only'
);

export async function signJWT(payload: any, expiresIn = '7d') {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET);

  return token;
}

export async function verifyJWT<T>(token: string): Promise<T | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as T;
  } catch (error) {
    return null;
  }
}

export async function getTokenFromCookies() {
  const cookieStore = cookies();
  return cookieStore.get('auth-token')?.value;
}

export async function getCurrentUser() {
  const token = await getTokenFromCookies();

  if (!token) {
    return null;
  }

  const payload = await verifyJWT<{ id: string; email: string; userType: string }>(token);

  if (!payload) {
    return null;
  }

  // Fetch user data from API or database
  // This is just a placeholder for the real implementation
  return { id: payload.id, email: payload.email, userType: payload.userType };
}
