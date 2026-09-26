import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';

const TuteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  pdfUrl: { type: String, required: true },
  category: { type: String, required: true }, 
  alYear: { type: String, required: true }, 
  isVisible: { type: Boolean, default: true }, // පෙනෙනවද නැද්ද යන්න
  date: { type: Date, default: Date.now }
});

const Tute = mongoose.models.Tute || mongoose.model('Tute', TuteSchema);

export async function POST(req) {
  try {
    const { title, pdfUrl, category, alYear } = await req.json();
    await connectToDatabase();
    const newTute = new Tute({ title, pdfUrl, category, alYear });
    await newTute.save();
    return NextResponse.json({ message: 'නිබන්ධනය සාර්ථකව එක් කළා!' }, { status: 200 });
  } catch (error) { return NextResponse.json({ message: 'දෝෂයකි.' }, { status: 500 }); }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get('year') || 'All';
    const isAdmin = searchParams.get('admin');
    await connectToDatabase();
    
    let query = (year === 'All') ? {} : { $or: [{ alYear: year }, { alYear: 'All' }] };
    if (isAdmin !== 'true') { query.isVisible = { $ne: false }; }

    const tutes = await Tute.find(query).sort({ date: -1 });
    return NextResponse.json({ tutes }, { status: 200 });
  } catch (error) { return NextResponse.json({ message: 'දෝෂයකි.' }, { status: 500 }); }
}

export async function PATCH(req) { // Hide/Show සඳහා
  try {
    const { id, isVisible } = await req.json();
    await connectToDatabase();
    await Tute.findByIdAndUpdate(id, { isVisible });
    return NextResponse.json({ message: 'යාවත්කාලීන විය.' });
  } catch (error) { return NextResponse.json({ message: 'දෝෂයකි.' }, { status: 500 }); }
}

export async function DELETE(req) { // Erase සඳහා
  try {
    const { id } = await req.json();
    await connectToDatabase();
    await Tute.findByIdAndDelete(id);
    return NextResponse.json({ message: 'සාර්ථකව මකා දැමුවා.' });
  } catch (error) { return NextResponse.json({ message: 'දෝෂයකි.' }, { status: 500 }); }
}

// --- නිබන්ධනයක් යාවත්කාලීන කිරීම (Edit Tute) ---
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, title, pdfUrl, category, alYear } = body;

    // මෙහි Tute model එක ලබාගැනීම (ඔයාගේ ෆයිල් එකේ උඩින් තියෙන විදිහට මේක වැඩ කරයි)
    const mongoose = require('mongoose');
    const Tute = mongoose.models.Tute || mongoose.model('Tute');

    const updatedTute = await Tute.findByIdAndUpdate(
      id, 
      { title, pdfUrl, category, alYear }, 
      { new: true }
    );

    if (!updatedTute) {
      return NextResponse.json({ message: "නිබන්ධනය සොයාගැනීමට නොහැක." }, { status: 404 });
    }

    return NextResponse.json({ message: "නිබන්ධනය සාර්ථකව යාවත්කාලීන විය." }, { status: 200 });

  } catch (error) {
    console.error("Tute Update Error:", error);
    return NextResponse.json({ message: "දෝෂයක් මතු විය." }, { status: 500 });
  }
}