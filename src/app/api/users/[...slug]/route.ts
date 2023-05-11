import { getPostsOf, getSavedPostOf } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: {
    slug: string[];
  };
};

export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;

  if (!slug || !slug?.length) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  const [username, query] = slug;

  return query === 'saved'
    ? getSavedPostOf(username).then((data) => NextResponse.json(data))
    : getPostsOf(username).then((data) => NextResponse.json(data));
}
