import { NextRequest, NextResponse } from 'next/server';
import { createConnection } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    console.log('Received POST request to /api/schools');
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const contact = formData.get('contact') as string;
    const email_id = formData.get('email_id') as string;
    const imageFile = formData.get('image') as File;
    const imageUrl = formData.get('imageUrl') as string;
    
    console.log('Form data received:', { name, address, city, state, contact, email_id });
    console.log('Image file:', imageFile ? { name: imageFile.name, size: imageFile.size, type: imageFile.type } : 'No image');
    console.log('Image URL:', imageUrl || 'No image URL');
    
    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id) {
      console.log('Validation failed: missing required fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    let imagePath = '';
    
    // Handle image upload
    if (imageFile && imageFile.size > 0) {
      try {
        console.log('Processing image upload...');
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Create schoolImages directory if it doesn't exist
        const uploadDir = join(process.cwd(), 'public', 'schoolImages');
        console.log('Upload directory:', uploadDir);
        await mkdir(uploadDir, { recursive: true });
        
        // Generate unique filename
        const timestamp = Date.now();
        const fileName = `${timestamp}_${imageFile.name}`;
        const filePath = join(uploadDir, fileName);
        
        console.log('Saving file to:', filePath);
        // Save file
        await writeFile(filePath, buffer);
        imagePath = `/schoolImages/${fileName}`;
        console.log('Image saved successfully:', imagePath);
      } catch (imageError) {
        console.error('Error processing image:', imageError);
        return NextResponse.json(
          { error: 'Failed to process image upload' },
          { status: 500 }
        );
      }
    } else if (imageUrl && imageUrl.trim()) {
      console.log('Using provided image URL:', imageUrl);
      imagePath = imageUrl.trim();
    } else {
      console.log('No image file or URL provided');
    }
    
    // Insert into database
    console.log('Inserting into database...');
    const connection = await createConnection();
    
    const [result] = await connection.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, imagePath, email_id]
    );
    
    await connection.end();
    console.log('Database insertion successful');
    return NextResponse.json(
      { message: 'School added successfully', id: (result as { insertId: number }).insertId },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error adding school:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const connection = await createConnection();
    
    const [rows] = await connection.execute(
      'SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY created_at DESC'
    );
    
    await connection.end();
    
    return NextResponse.json(rows);
    
  } catch (error) {
    console.error('Error fetching schools:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
