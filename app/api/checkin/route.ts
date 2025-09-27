import { NextResponse } from 'next/server';
import { pool } from '@/app/lib/db';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    console.log(token);

    if (!token) {
      return NextResponse.json({ message: 'Missing token' }, { status: 400 });
    }

    try {
      const [rows] = await pool.execute(
        'SELECT check_in FROM users WHERE token = ? LIMIT 1',
        [token]
      ) as any[];

      if (rows.length === 0) {
        return NextResponse.json(
          { message: 'Invalid token' },
          { status: 404 }
        );
      }

      const { check_in } = rows[0];

      if (check_in === 1) {
        return NextResponse.json(
          { message: 'You have already checked in' },
          { status: 200 } // or 409 Conflict if you prefer
        );
      }

      await pool.execute(
        `UPDATE users SET check_in=? WHERE token=?`,
        [1, token]
      );
    } catch (err: any) {
      return NextResponse.json(
        { message: 'Database error'}, 
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Check in berhasil!!'}, 
      { status: 200 }
    );
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
