export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import pkg from "pg";
const { Pool } = pkg;
import { parse } from "csv-parse/sync";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false, // or { rejectUnauthorized: false } if needed
});

export async function GET(request) {
  try {
    console.log("GET request for career choice records");

    // First, let's verify the table exists and get column info
    const checkTable = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'career_choice'
      ORDER BY ordinal_position
    `);
    
    console.log("Table columns:", checkTable.rows);

    const result = await pool.query(
      `SELECT * FROM public.career_choice ORDER BY choiceid`
    );

    console.log(`Found ${result.rows.length} records in career_choice`);
    console.log("First record sample:", result.rows[0]);

    return NextResponse.json({
      success: true,
      records: result.rows,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  console.log("POST request received");

  try {
    const contentType = request.headers.get("content-type") || "";
    console.log("Content-Type:", contentType);

    // Check if it's multipart/form-data (file upload)
    if (contentType.includes("multipart/form-data")) {
      return await handleCSVUpload(request);
    } else {
      return await handleJSONRequest(request);
    }
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Handle CSV upload
async function handleCSVUpload(request) {
  console.log("Processing CSV upload for career choice");

  const formData = await request.formData();
  const csvFile = formData.get("csvFile");

  console.log("File:", csvFile ? csvFile.name : "none");

  if (!csvFile) {
    return NextResponse.json(
      { success: false, message: "No file provided" },
      { status: 400 }
    );
  }

  // Check file type
  if (!csvFile.name.toLowerCase().endsWith(".csv")) {
    return NextResponse.json(
      { success: false, message: "File must be a CSV file" },
      { status: 400 }
    );
  }

  try {
    // Read and parse CSV file
    const fileBuffer = await csvFile.arrayBuffer();
    const fileContent = new TextDecoder().decode(fileBuffer);

    // Parse CSV with csv-parse
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    if (!records || records.length === 0) {
      return NextResponse.json(
        { success: false, message: "CSV file is empty or invalid format" },
        { status: 400 }
      );
    }

    // Validate CSV structure - must have "career_choice" and "mast_career" columns
    const firstRecord = records[0];
    if (
      !firstRecord.hasOwnProperty("career_choice") ||
      !firstRecord.hasOwnProperty("mast_career")
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'CSV must have "career_choice" and "mast_career" columns',
        },
        { status: 400 }
      );
    }

    // Prepare data for insertion
    const careerChoices = records
      .map((record) => ({
        career_choice: record.career_choice.trim(),
        mast_career: record.mast_career.trim(),
      }))
      .filter((record) => record.career_choice && record.mast_career); // Remove empty records

    if (careerChoices.length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid career choices found in CSV" },
        { status: 400 }
      );
    }

    console.log(
      `Preparing to insert ${careerChoices.length} records into career_choice`
    );

    // Insert into database
    const client = await pool.connect();
    try {
      let insertedCount = 0;
      const errors = [];

      // Insert each record individually for better error handling
      for (const choice of careerChoices) {
        try {
          const insertQuery = `
            INSERT INTO public.career_choice (career_choice, mast_career)
            VALUES ($1, $2)
            RETURNING choiceid
          `;
          const result = await client.query(insertQuery, [
            choice.career_choice,
            choice.mast_career,
          ]);
          insertedCount++;
          console.log(
            `✓ Inserted: ${choice.career_choice} - ${choice.mast_career} (choiceid: ${result.rows[0].choiceid})`
          );
        } catch (rowError) {
          console.error(
            `✗ Error inserting "${choice.career_choice}":`,
            rowError.message
          );
          errors.push(`"${choice.career_choice}": ${rowError.message}`);
        }
      }

      return NextResponse.json({
        success: true,
        insertedCount,
        message: `Successfully imported ${insertedCount} records into career_choice`,
        errors: errors.length > 0 ? errors.slice(0, 5) : undefined,
      });
    } finally {
      client.release();
    }
  } catch (parseError) {
    console.error("CSV parse error:", parseError);
    return NextResponse.json(
      {
        success: false,
        message: `Failed to parse CSV file: ${parseError.message}`,
      },
      { status: 400 }
    );
  }
}

// Handle JSON request for single record
async function handleJSONRequest(request) {
  console.log("Processing JSON request");

  const body = await request.json();
  const { record } = body;

  console.log("JSON request - record:", record);

  if (!record) {
    return NextResponse.json(
      {
        success: false,
        error: "Record data required",
      },
      { status: 400 }
    );
  }

  if (!record.career_choice || !record.mast_career) {
    return NextResponse.json(
      {
        success: false,
        error: "career_choice and mast_career fields are required",
      },
      { status: 400 }
    );
  }

  const insertQuery = `
    INSERT INTO public.career_choice (career_choice, mast_career)
    VALUES ($1, $2)
    RETURNING *
  `;

  console.log("Insert query:", insertQuery);
  console.log("Values:", [record.career_choice, record.mast_career]);

  try {
    const result = await pool.query(insertQuery, [
      record.career_choice,
      record.mast_career,
    ]);
    console.log("Insert successful, result:", result.rows[0]);

    return NextResponse.json({
      success: true,
      message: "Record added successfully",
      record: result.rows[0],
    });
  } catch (dbError) {
    console.error("Database error in JSON request:", dbError);
    return NextResponse.json(
      {
        success: false,
        error: `Database error: ${dbError.message}`,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, record } = body;

    console.log("PUT request - id:", id, "record:", record);

    if (!id || !record) {
      return NextResponse.json(
        {
          success: false,
          error: "Record ID and record data required",
        },
        { status: 400 }
      );
    }

    if (!record.career_choice || !record.mast_career) {
      return NextResponse.json(
        {
          success: false,
          error: "career_choice and mast_career fields are required",
        },
        { status: 400 }
      );
    }

    const updateQuery = `
      UPDATE public.career_choice
      SET career_choice = $1, mast_career = $2
      WHERE choiceid = $3
      RETURNING *
    `;

    console.log("Update query:", updateQuery);
    console.log("Update values:", [
      record.career_choice,
      record.mast_career,
      id,
    ]);

    const result = await pool.query(updateQuery, [
      record.career_choice,
      record.mast_career,
      id,
    ]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Record not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Record updated successfully",
      record: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating record:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id } = body;

    console.log("DELETE request - id:", id);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Record ID required",
        },
        { status: 400 }
      );
    }

    const deleteQuery = `DELETE FROM public.career_choice WHERE choiceid = $1`;
    console.log("Delete query:", deleteQuery);

    const result = await pool.query(deleteQuery, [id]);

    if (result.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Record not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Record deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting record:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}