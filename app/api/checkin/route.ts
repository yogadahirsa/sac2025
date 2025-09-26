import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // ✅ use the parameter name `req`, not `request`
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ message: 'Missing token' }, { status: 400 });
    }

    // TODO: add DB insert / validation with your `pool` if needed
    return NextResponse.json({ message: 'Token received', token });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
