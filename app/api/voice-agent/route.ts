import { NextResponse } from 'next/server';
import { getPortfolioVoiceSession } from '@/lib/voiceAgent';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getPortfolioVoiceSession();

    return NextResponse.json(session, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Voice agent session error', error);
    const message = error instanceof Error ? error.message : 'Could not start voice chat right now.';

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  }
}
