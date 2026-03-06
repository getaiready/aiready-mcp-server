import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/api/auth/[...nextauth]/route';
import { getRepositoryMetrics, getRepository } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ repoId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { repoId } = await params;

    // Verify ownership
    const repo = await getRepository(repoId);
    if (!repo) {
      return NextResponse.json(
        { error: 'Repository not found' },
        { status: 404 }
      );
    }
    if (repo.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const searchParams = request.nextUrl.searchParams;
    const metricType = searchParams.get('type') || undefined;
    const limit = parseInt(searchParams.get('limit') || '50');

    const metrics = await getRepositoryMetrics({
      repoId,
      metricType,
      limit,
    });

    return NextResponse.json({ metrics });
  } catch (error) {
    console.error('Failed to fetch repository metrics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
