// app/api/career-question/route.js
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - Fetch all career questions with their subgroups
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const careersubgroupid = searchParams.get('subgroupid');

    let result;
    if (careersubgroupid) {
      // Fetch questions for specific subgroup
      result = await query(
        `SELECT cq.*, cs.career_subgroup, cg.career_group
         FROM career_quest cq
         JOIN mast_career_subgroup cs ON cq.careersubgroupid = cs.careersubgroupid
         JOIN mast_career_group cg ON cs.careergroupid = cg.careergroupid
         WHERE cq.careersubgroupid = $1
         ORDER BY cq.careerquestid DESC`,
        [careersubgroupid]
      );
    } else {
      // Fetch all questions
      result = await query(
        `SELECT cq.*, cs.career_subgroup, cg.career_group
         FROM career_quest cq
         JOIN mast_career_subgroup cs ON cq.careersubgroupid = cs.careersubgroupid
         JOIN mast_career_group cg ON cs.careergroupid = cg.careergroupid
         ORDER BY cq.careerquestid DESC`
      );
    }
    
    return NextResponse.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching career questions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch career questions' },
      { status: 500 }
    );
  }
}

// POST - Create new career question
export async function POST(request) {
  try {
    const { 
      careersubgroupid, 
      test_question, 
      optscore1, 
      optscore2, 
      optscore3, 
      optscore4, 
      optscore5 
    } = await request.json();
    
    if (!careersubgroupid || !test_question) {
      return NextResponse.json(
        { success: false, error: 'Subgroup ID and question are required' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO career_quest 
       (careersubgroupid, test_question, optscore1, optscore2, optscore3, optscore4, optscore5) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        careersubgroupid, 
        test_question, 
        optscore1 || null, 
        optscore2 || null, 
        optscore3 || null, 
        optscore4 || null, 
        optscore5 || null
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Career question added successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating career question:', error);
    
    if (error.code === '23503') {
      return NextResponse.json(
        { success: false, error: 'Invalid career subgroup ID' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create career question' },
      { status: 500 }
    );
  }
}

// PUT - Update career question
export async function PUT(request) {
  try {
    const { 
      careerquestid,
      careersubgroupid, 
      test_question, 
      optscore1, 
      optscore2, 
      optscore3, 
      optscore4, 
      optscore5 
    } = await request.json();
    
    if (!careerquestid) {
      return NextResponse.json(
        { success: false, error: 'Question ID is required' },
        { status: 400 }
      );
    }

    const result = await query(
      `UPDATE career_quest 
       SET careersubgroupid = $1, 
           test_question = $2, 
           optscore1 = $3, 
           optscore2 = $4, 
           optscore3 = $5, 
           optscore4 = $6, 
           optscore5 = $7
       WHERE careerquestid = $8 
       RETURNING *`,
      [
        careersubgroupid, 
        test_question, 
        optscore1 || null, 
        optscore2 || null, 
        optscore3 || null, 
        optscore4 || null, 
        optscore5 || null,
        careerquestid
      ]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Question not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Career question updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating career question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update career question' },
      { status: 500 }
    );
  }
}

// DELETE - Delete career question
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const careerquestid = searchParams.get('id');

    if (!careerquestid) {
      return NextResponse.json(
        { success: false, error: 'Career question ID is required' },
        { status: 400 }
      );
    }

    await query(
      'DELETE FROM career_quest WHERE careerquestid = $1',
      [careerquestid]
    );

    return NextResponse.json({
      success: true,
      message: 'Career question deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting career question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete career question' },
      { status: 500 }
    );
  }
}