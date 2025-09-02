# SchoolCred - School Management System

A school management system built with Next.js, React Hook Form, MySQL, and Tailwind CSS.

## Features

- **Add School Page**: Form to input and store school data with validation
- **Show Schools Page**: Display schools in an ecommerce-style grid layout
- **Responsive Design**: Works on both mobile and desktop devices
- **Image Upload**: Store school images in the `schoolImages` folder
- **Form Validation**: Comprehensive validation using Yup and React Hook Form

## Database Schema

The `schools` table contains the following fields:
- `id` - int AUTO_INCREMENT (Primary Key)
- `name` - text (School name)
- `address` - text (Complete address)
- `city` - text (City)
- `state` - text (State)
- `contact` - varchar(15) (Contact number)
- `image` - text (Image file path)
- `email_id` - varchar(255) (Email address)
- `created_at` - timestamp (Auto-generated)

## Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

## Installation

1. **Clone and install dependencies:**
   ```bash
   cd schoolcred
   npm install
   ```

2. **Set up MySQL database:**
   - Create a MySQL database named `schoolcred`
   - Update the `.env.local` file with your database credentials

3. **Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=schoolcred
   DB_PORT=3306
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── addSchool/          # Add school form page
│   ├── showSchools/        # Display schools page
│   ├── api/
│   │   └── schools/        # API endpoints for schools
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── lib/
│   └── db.ts              # Database configuration
public/
└── schoolImages/           # School image uploads
```

## API Endpoints

- `GET /api/schools` - Fetch all schools
- `POST /api/schools` - Add a new school

## Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Yup validation
- **Database**: MySQL with mysql2
- **File Upload**: Multer for image handling

## Features

### Add School Page (`/addSchool`)
- Responsive form with all required fields
- Real-time validation
- Image upload with preview
- Success/error messaging
- Form reset functionality

### Show Schools Page (`/showSchools`)
- Ecommerce-style grid layout
- Responsive design for all devices
- Image display with fallback icons
- School information cards
- Navigation between pages

## Responsive Design

The application is fully responsive and works seamlessly on:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop computers (1024px+)

## Validation Rules

- **School Name**: Required
- **Address**: Required
- **City**: Required
- **State**: Required
- **Contact**: Required, 10 digits only
- **Email**: Required, valid email format
- **Image**: Optional, max 5MB, image files only

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
