// app/api/career-test/route.js
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - Fetch all career tests
export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM mast_career_test ORDER BY careertestid DESC'
    );
    
    return NextResponse.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching career tests:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch career tests' },
      { status: 500 }
    );
  }
}

// POST - Create new career test
export async function POST(request) {
  try {
    const { career_test } = await request.json();
    
    if (!career_test) {
      return NextResponse.json(
        { success: false, error: 'Career test name is required' },
        { status: 400 }
      );
    }

    const result = await query(
      'INSERT INTO mast_career_test (career_test) VALUES ($1) RETURNING *',
      [career_test]
    );

    return NextResponse.json({
      success: true,
      message: 'Career test added successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating career test:', error);
    
    // Check for unique constraint violation
    if (error.code === '23505') {
      return NextResponse.json(
        { success: false, error: 'Career test already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create career test' },
      { status: 500 }
    );
  }
}

// DELETE - Delete career test
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const careertestid = searchParams.get('id');

    if (!careertestid) {
      return NextResponse.json(
        { success: false, error: 'Career test ID is required' },
        { status: 400 }
      );
    }

    await query(
      'DELETE FROM mast_career_test WHERE careertestid = $1',
      [careertestid]
    );

    return NextResponse.json({
      success: true,
      message: 'Career test deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting career test:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete career test' },
      { status: 500 }
    );
  }
}