import dbConnect from '@lib/dbConnect';
import User from '@models/User';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

/**
 * 유저 프로필 조회 API
 * @URL /api/v1/profile/:userId
 * @param request
 */
async function GET(request) {
  await dbConnect();
  const successResponse = {
    status: 'success',
  };
  const failureResponse = {
    status: 500,
  };

  try {
    const urlParts = request.url.split('/');
    const userId = urlParts[urlParts.length - 1];

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw { message: 'userId 형식이 일치하지 않습니다', status: 401 };
    }

    const userProfile = await User.findOne({ _id: userId }).exec();
    if (!userProfile) {
      throw { message: '유저 정보가 존재하지 않습니다', status: 404 };
    }

    successResponse.data = userProfile;

    return NextResponse.json(successResponse);
  } catch (error) {
    failureResponse.status = error.status || 500;
    failureResponse.message = error.message || 'Internal Server Error';
    return NextResponse.json(failureResponse);
  }
}

export { GET };
