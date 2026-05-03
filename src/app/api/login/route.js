import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // <-- අලුතින් එකතු කළා

// User Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    
    await connectToDatabase();

    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json(
        { message: 'මෙම ඊමේල් ලිපිනයෙන් ලියාපදිංචි වූ ගිණුමක් නොමැත.' }, 
        { status: 400 }
      );
    }

    // --- වෙනස් කළ කොටස ---
    // මුරපදය Hash කර තිබේදැයි පරීක්ෂා කර බැලීම
    let isPasswordMatch = false;

    if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
      // Password එක bcrypt මගින් Hash කර ඇත්නම්:
      isPasswordMatch = await bcrypt.compare(password, user.password);
    } else {
      // Password එක Hash කර නොමැති නම් (සාමාන්‍ය විදිහටම තියෙනවා නම්):
      isPasswordMatch = (user.password === password);
    }

    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: 'ඔබ ඇතුළත් කළ මුරපදය වැරදියි. කරුණාකර නැවත උත්සාහ කරන්න.' }, 
        { status: 400 }
      );
    }
    // -----------------------

    return NextResponse.json(
        { message: 'සාර්ථකයි', user: { name: user.name, email: user.email, alYear: user.alYear } }, 
        { status: 200 }
      );

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { message: 'සේවාදායකයේ දෝෂයක් මතු විය. නැවත උත්සාහ කරන්න.' }, 
      { status: 500 }
    );
  }
}