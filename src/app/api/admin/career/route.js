import { NextResponse } from "next/server";
import pkg from "pg";
const { Pool } = pkg;
import { parse } from 'csv-parse/sync';

const pool = new Pool({
  host: '88.222.241.228',
  port: 5432,
  database: 'saubh',
  user: 'saubhtech',
  password: 'ManiKiMala1954',
  ssl: false
});

const validTables = [
  "mast_career_ability",
  "mast_career_activity",
  "mast_career_industry",
  "mast_career_interest",
  "mast_career_knowledge",
  "mast_career_outlook",
  "mast_career_pathway",
  "mast_career_preference",
  "mast_career_sector",
  "mast_career_skills",
  "mast_career_stem",
  "mast_career_technology",
  "mast_career_trait",
  "mast_career_zone",
  "careerchoice",
  "career_data",
  "career",
  "career_data_test",
];

// List of master tables that only accept "option" column
const masterTables = [
  "mast_career_ability",
  "mast_career_activity",
  "mast_career_industry",
  "mast_career_interest",
  "mast_career_knowledge",
  "mast_career_outlook",
  "mast_career_pathway",
  "mast_career_preference",
  "mast_career_sector",
  "mast_career_skills",
  "mast_career_stem",
  "mast_career_technology",
  "mast_career_trait",
  "mast_career_zone",
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tableName = searchParams.get("table");

    console.log("GET request for table:", tableName);

    if (!tableName) {
      return NextResponse.json(
        { success: false, error: "Table name required" },
        { status: 400 }
      );
    }

    if (!validTables.includes(tableName)) {
      return NextResponse.json(
        { success: false, error: "Invalid table name" },
        { status: 400 }
      );
    }

    let orderByColumn = "mastid";
    if (tableName === "career_data") {
      orderByColumn = "dataid";
    } else if (tableName === "careerchoice") {
      orderByColumn = "choiceid";
    }

    const result = await pool.query(
      `SELECT * FROM ${tableName} ORDER BY ${orderByColumn}`
    );

    console.log(`Found ${result.rows.length} records in ${tableName}`);

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

// Handle CSV upload for master tables
async function handleCSVUpload(request) {
  console.log("Processing CSV upload");
  
  const formData = await request.formData();
  const csvFile = formData.get("csvFile"); // This matches your frontend
  const tableName = formData.get("tableName");

  console.log("Table:", tableName);
  console.log("File:", csvFile ? csvFile.name : "none");

  if (!csvFile) {
    return NextResponse.json(
      { success: false, message: "No file provided" },
      { status: 400 }
    );
  }

  if (!tableName) {
    return NextResponse.json(
      { success: false, message: "Table name required" },
      { status: 400 }
    );
  }

  // Validate table name - only master tables allowed for CSV upload
  if (!masterTables.includes(tableName)) {
    return NextResponse.json(
      { 
        success: false, 
        message: "CSV upload only available for master tables" 
      },
      { status: 400 }
    );
  }

  // Check file type
  if (!csvFile.name.toLowerCase().endsWith('.csv')) {
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
      trim: true
    });

    if (!records || records.length === 0) {
      return NextResponse.json(
        { success: false, message: "CSV file is empty or invalid format" },
        { status: 400 }
      );
    }

    // Validate CSV structure - must have "option" column
    const firstRecord = records[0];
    if (!firstRecord.hasOwnProperty('option')) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'CSV must have an "option" column' 
        },
        { status: 400 }
      );
    }

    // Prepare data for insertion
    const options = records
      .map(record => ({
        option: record.option.trim()
      }))
      .filter(record => record.option); // Remove empty options

    if (options.length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid options found in CSV" },
        { status: 400 }
      );
    }

    console.log(`Preparing to insert ${options.length} records into ${tableName}`);

    // Insert into database
    const client = await pool.connect();
    
    try {
      let insertedCount = 0;
      const errors = [];

      // Insert each record individually for better error handling
      for (const option of options) {
        try {
          const insertQuery = `
            INSERT INTO ${tableName} (option) 
            VALUES ($1) 
            RETURNING mastid
          `;
          
          const result = await client.query(insertQuery, [option.option]);
          insertedCount++;
          console.log(`✓ Inserted: ${option.option} (mastid: ${result.rows[0].mastid})`);
        } catch (rowError) {
          console.error(`✗ Error inserting "${option.option}":`, rowError.message);
          errors.push(`"${option.option}": ${rowError.message}`);
        }
      }

      return NextResponse.json({
        success: true,
        insertedCount,
        message: `Successfully imported ${insertedCount} records into ${tableName}`,
        errors: errors.length > 0 ? errors.slice(0, 5) : undefined
      });

    } finally {
      client.release();
    }

  } catch (parseError) {
    console.error("CSV parse error:", parseError);
    return NextResponse.json(
      { 
        success: false, 
        message: `Failed to parse CSV file: ${parseError.message}` 
      },
      { status: 400 }
    );
  }
}

// Handle JSON request for single record
async function handleJSONRequest(request) {
  console.log("Processing JSON request");
  const body = await request.json();
  const { tableName, record } = body;

  console.log("JSON request - tableName:", tableName);
  console.log("JSON request - record:", record);

  if (!tableName || !record) {
    return NextResponse.json(
      {
        success: false,
        error: "Table name and record data required",
      },
      { status: 400 }
    );
  }

  if (!validTables.includes(tableName)) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid table name",
      },
      { status: 400 }
    );
  }

  // For master tables, ensure we only have "option" column
  if (masterTables.includes(tableName)) {
    if (Object.keys(record).length !== 1 || !record.hasOwnProperty('option')) {
      return NextResponse.json(
        {
          success: false,
          error: "For master tables, only 'option' field is allowed",
        },
        { status: 400 }
      );
    }
  }

  const columns = Object.keys(record);
  const values = Object.values(record);
  const placeholders = columns.map((_, i) => `$${i + 1}`).join(", ");

  const insertQuery = `
    INSERT INTO ${tableName} (${columns.join(", ")})
    VALUES (${placeholders})
    RETURNING *
  `;

  console.log("Insert query:", insertQuery);
  console.log("Values:", values);

  try {
    const result = await pool.query(insertQuery, values);
    console.log("Insert successful, result:", result.rows[0]);

    return NextResponse.json({
      success: true,
      message: "Record added successfully",
      record: result.rows[0],
    });
  } catch (dbError) {
    console.error("Database error in JSON request:", dbError);
    return NextResponse.json({
      success: false,
      error: `Database error: ${dbError.message}`,
    }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { tableName, id, record } = body;

    console.log("PUT request - table:", tableName, "id:", id, "record:", record);

    if (!tableName || !id || !record) {
      return NextResponse.json(
        {
          success: false,
          error: "Table name, record ID, and record data required",
        },
        { status: 400 }
      );
    }

    if (!validTables.includes(tableName)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid table name",
        },
        { status: 400 }
      );
    }

    // For master tables, ensure we only have "option" column
    if (masterTables.includes(tableName)) {
      if (Object.keys(record).length !== 1 || !record.hasOwnProperty('option')) {
        return NextResponse.json(
          {
            success: false,
            error: "For master tables, only 'option' field can be updated",
          },
          { status: 400 }
        );
      }
    }

    let idColumnName = "mastid";
    if (tableName === "career_data") {
      idColumnName = "dataid";
    } else if (tableName === "careerchoice") {
      idColumnName = "choiceid";
    }

    // Filter out updated_at if it exists in record
    const filteredRecord = { ...record };
    delete filteredRecord.updated_at;
    delete filteredRecord.created_at;

    const updates = [];
    const values = [];
    let paramCount = 1;

    Object.entries(filteredRecord).forEach(([key, value]) => {
      updates.push(`${key} = $${paramCount}`);
      values.push(value);
      paramCount++;
    });

    // Don't include updated_at in the update if table doesn't have it
    // For master tables that don't have updated_at column
    if (!masterTables.includes(tableName) || tableName === "career_data" || tableName === "careerchoice") {
      // Check if table has updated_at column
      try {
        const checkColumn = await pool.query(
          `SELECT column_name FROM information_schema.columns 
           WHERE table_name = $1 AND column_name = 'updated_at'`,
          [tableName]
        );
        
        if (checkColumn.rows.length > 0) {
          updates.push(`updated_at = NOW()`);
        }
      } catch (checkError) {
        console.log("Could not check for updated_at column:", checkError.message);
      }
    }

    values.push(id);
    const updateQuery = `
      UPDATE ${tableName} 
      SET ${updates.join(", ")} 
      WHERE ${idColumnName} = $${paramCount}
      RETURNING *
    `;

    console.log("Update query:", updateQuery);
    console.log("Update values:", values);

    try {
      const result = await pool.query(updateQuery, values);
      return NextResponse.json({
        success: true,
        message: "Record updated successfully",
        record: result.rows[0],
      });
    } catch (dbError) {
      console.error("Database error in UPDATE:", dbError);
      
      // If error is about updated_at, try without it
      if (dbError.message.includes('updated_at')) {
        console.log("Retrying update without updated_at...");
        
        // Remove updated_at from updates
        const simpleUpdates = [];
        const simpleValues = [];
        let simpleParam = 1;
        
        Object.entries(filteredRecord).forEach(([key, value]) => {
          simpleUpdates.push(`${key} = $${simpleParam}`);
          simpleValues.push(value);
          simpleParam++;
        });
        
        simpleValues.push(id);
        const simpleUpdateQuery = `
          UPDATE ${tableName} 
          SET ${simpleUpdates.join(", ")} 
          WHERE ${idColumnName} = $${simpleParam}
          RETURNING *
        `;
        
        console.log("Simple update query:", simpleUpdateQuery);
        
        const simpleResult = await pool.query(simpleUpdateQuery, simpleValues);
        return NextResponse.json({
          success: true,
          message: "Record updated successfully",
          record: simpleResult.rows[0],
        });
      }
      
      throw dbError;
    }
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
    const { tableName, id } = body;

    console.log("DELETE request - table:", tableName, "id:", id);

    if (!tableName || !id) {
      return NextResponse.json(
        {
          success: false,
          error: "Table name and record ID required",
        },
        { status: 400 }
      );
    }

    if (!validTables.includes(tableName)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid table name",
        },
        { status: 400 }
      );
    }

    let idColumnName = "mastid";
    if (tableName === "career_data") {
      idColumnName = "dataid";
    } else if (tableName === "careerchoice") {
      idColumnName = "choiceid";
    }

    const deleteQuery = `DELETE FROM ${tableName} WHERE ${idColumnName} = $1`;
    console.log("Delete query:", deleteQuery);
    
    await pool.query(deleteQuery, [id]);

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