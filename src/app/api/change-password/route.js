import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export async function POST(req) {
  try {
    const { email, currentPassword, newPassword } = await req.json();
    
    await connectToDatabase();
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json({ message: 'ගිණුමක් සොයාගත නොහැක.' }, { status: 404 });
    }

    // දැනට තියෙන පාස්වර්ඩ් එක හරිද කියලා බලනවා
    let isMatch = false;
    if (user.password.startsWith('$2')) {
      isMatch = await bcrypt.compare(currentPassword, user.password);
    } else {
      isMatch = (user.password === currentPassword);
    }

    if (!isMatch) {
      return NextResponse.json({ message: 'ඔබ ඇතුළත් කළ දැනට ඇති මුරපදය වැරදියි!' }, { status: 400 });
    }

    // අලුත් පාස්වර්ඩ් එක Hash කරලා (ආරක්ෂිත කරලා) Database එකට දානවා
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({ message: 'මුරපදය සාර්ථකව වෙනස් කරන ලදී!' }, { status: 200 });

  } catch (error) {
    console.error("Password Change Error:", error);
    return NextResponse.json({ message: 'සේවාදායකයේ දෝෂයක් මතු විය.' }, { status: 500 });
  }
}