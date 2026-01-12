// app/api/career-subgroup/route.js
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - Fetch all career subgroups with their parent groups
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const careergroupid = searchParams.get('groupid');

    let result;
    if (careergroupid) {
      // Fetch subgroups for specific group
      result = await query(
        `SELECT cs.*, cg.career_group 
         FROM mast_career_subgroup cs
         JOIN mast_career_group cg ON cs.careergroupid = cg.careergroupid
         WHERE cs.careergroupid = $1
         ORDER BY cs.careersubgroupid DESC`,
        [careergroupid]
      );
    } else {
      // Fetch all subgroups
      result = await query(
        `SELECT cs.*, cg.career_group 
         FROM mast_career_subgroup cs
         JOIN mast_career_group cg ON cs.careergroupid = cg.careergroupid
         ORDER BY cs.careersubgroupid DESC`
      );
    }
    
    return NextResponse.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching career subgroups:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch career subgroups' },
      { status: 500 }
    );
  }
}

// POST - Create new career subgroup
export async function POST(request) {
  try {
    const { careergroupid, career_subgroup } = await request.json();
    
    if (!careergroupid || !career_subgroup) {
      return NextResponse.json(
        { success: false, error: 'Career group ID and subgroup name are required' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO mast_career_subgroup (careergroupid, career_subgroup) 
       VALUES ($1, $2) RETURNING *`,
      [careergroupid, career_subgroup]
    );

    return NextResponse.json({
      success: true,
      message: 'Career subgroup added successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating career subgroup:', error);
    
    if (error.code === '23503') {
      return NextResponse.json(
        { success: false, error: 'Invalid career group ID' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create career subgroup' },
      { status: 500 }
    );
  }
}

// DELETE - Delete career subgroup
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const careersubgroupid = searchParams.get('id');

    if (!careersubgroupid) {
      return NextResponse.json(
        { success: false, error: 'Career subgroup ID is required' },
        { status: 400 }
      );
    }

    await query(
      'DELETE FROM mast_career_subgroup WHERE careersubgroupid = $1',
      [careersubgroupid]
    );

    return NextResponse.json({
      success: true,
      message: 'Career subgroup deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting career subgroup:', error);
    
    if (error.code === '23503') {
      return NextResponse.json(
        { success: false, error: 'Cannot delete: Subgroup has questions' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to delete career subgroup' },
      { status: 500 }
    );
  }
}