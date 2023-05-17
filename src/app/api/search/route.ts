import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { searchUsers } from '@/service/user';

export const dynamic = 'force-dynamic';

export async function GET(_: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return searchUsers().then((data) => NextResponse.json(data));
}
