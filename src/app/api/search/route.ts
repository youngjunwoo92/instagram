import { NextRequest, NextResponse } from 'next/server';

import { withSessionUser } from '@/util/session';
import { searchUsers } from '@/service/user';

export const dynamic = 'force-dynamic';

export async function GET(_: NextRequest) {
  return withSessionUser(async () => {
    return searchUsers().then((data) => NextResponse.json(data));
  });
}
