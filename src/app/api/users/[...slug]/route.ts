import { getPostsOf, getSavedPostsOf } from '@/service/posts';
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

  const request = query === 'saved' ? getSavedPostsOf : getPostsOf;

  return request(username).then((data) => NextResponse.json(data));
}
