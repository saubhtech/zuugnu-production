// app/api/career-group/route.js
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - Fetch all career groups
export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM mast_career_group ORDER BY careergroupid DESC'
    );
    
    return NextResponse.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching career groups:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch career groups' },
      { status: 500 }
    );
  }
}

// POST - Create new career group
export async function POST(request) {
  try {
    const { career_group } = await request.json();
    
    if (!career_group) {
      return NextResponse.json(
        { success: false, error: 'Career group name is required' },
        { status: 400 }
      );
    }

    const result = await query(
      'INSERT INTO mast_career_group (career_group) VALUES ($1) RETURNING *',
      [career_group]
    );

    return NextResponse.json({
      success: true,
      message: 'Career group added successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating career group:', error);
    
    if (error.code === '23505') {
      return NextResponse.json(
        { success: false, error: 'Career group already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create career group' },
      { status: 500 }
    );
  }
}

// DELETE - Delete career group
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const careergroupid = searchParams.get('id');

    if (!careergroupid) {
      return NextResponse.json(
        { success: false, error: 'Career group ID is required' },
        { status: 400 }
      );
    }

    await query(
      'DELETE FROM mast_career_group WHERE careergroupid = $1',
      [careergroupid]
    );

    return NextResponse.json({
      success: true,
      message: 'Career group deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting career group:', error);
    
    // Foreign key constraint violation
    if (error.code === '23503') {
      return NextResponse.json(
        { success: false, error: 'Cannot delete: Career group has subgroups' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to delete career group' },
      { status: 500 }
    );
  }
}