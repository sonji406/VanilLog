import { NextResponse } from 'next/server';
import User from '@models/User';
import dbConnect from '@lib/dbConnect';

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
