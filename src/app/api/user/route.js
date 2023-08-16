import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';

//예제 코드
export async function GET(req) {
  try {
    await dbConnect();
    const users = User.find({});
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
