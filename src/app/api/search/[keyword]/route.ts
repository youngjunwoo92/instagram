import { NextRequest, NextResponse } from 'next/server';

import { withSessionUser } from '@/util/session';
import { searchUsers } from '@/service/user';

type Context = {
  params: { keyword: string };
};

export async function GET(_: NextRequest, context: Context) {
  return withSessionUser(async () => {
    return searchUsers(context.params.keyword).then((data) =>
      NextResponse.json(data),
    );
  });
}
