import dbConnect from '@lib/dbConnect';
import User from '@models/User';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import createError from 'http-errors';
import { ERROR_MESSAGES, ERROR_CODES } from '@utils/errors';
import { sendErrorResponse } from '@utils/response';

/**
 * 유저 프로필 조회 API
 * @URL /api/v1/profile/:userId
 * @param request
 */
function getUserIdFromUrl(url) {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 1];
}

async function GET(request) {
  await dbConnect();
  const successResponse = {
    status: 'success',
  };

  try {
    const userId = getUserIdFromUrl(request.url);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw createError(
        ERROR_CODES.INVALID_USER_ID,
        ERROR_MESSAGES.INVALID_USER_ID,
      );
    }

    const userProfile = await User.findOne({ _id: userId }).exec();
    if (!userProfile) {
      throw createError(
        ERROR_CODES.USER_NOT_FOUND,
        ERROR_MESSAGES.USER_NOT_FOUND,
      );
    }

    successResponse.data = userProfile;

    return NextResponse.json(successResponse);
  } catch (error) {
    return sendErrorResponse(error);
  }
}

/**
 * 유저 프로필 수정 API
 * @URL /api/v1/profile/:userId
 * @param request
 */
async function PUT(request) {
  await dbConnect();

  const successResponse = {
    status: 'success',
  };

  try {
    const userId = getUserIdFromUrl(request.url);

    const bodyData = await request.text();
    const parsedData = JSON.parse(bodyData);
    const { nickname } = parsedData;

    if (!nickname) {
      throw createError(
        ERROR_CODES.MISSING_NICKNAME,
        ERROR_MESSAGES.MISSING_NICKNAME,
      );
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw createError(
        ERROR_CODES.INVALID_USER_ID,
        ERROR_MESSAGES.INVALID_USER_ID,
      );
    }

    const existingUser = await User.findOne({ nickname: nickname }).exec();
    if (existingUser && String(existingUser._id) !== userId) {
      throw createError(
        ERROR_CODES.DUPLICATE_NICKNAME,
        ERROR_MESSAGES.DUPLICATE_NICKNAME,
      );
    }

    const userProfile = await User.findOne({ _id: userId }).exec();

    if (!userProfile) {
      throw createError(
        ERROR_CODES.USER_NOT_FOUND,
        ERROR_MESSAGES.USER_NOT_FOUND,
      );
    }

    if (userProfile.nickname === nickname) {
      throw createError(
        ERROR_CODES.SAME_NICKNAME,
        ERROR_MESSAGES.SAME_NICKNAME,
      );
    }

    userProfile.nickname = nickname;
    await userProfile.save();

    successResponse.data = {
      message: '닉네임이 성공적으로 업데이트되었습니다',
    };

    return NextResponse.json(successResponse);
  } catch (error) {
    return sendErrorResponse(error);
  }
}

export { GET, PUT };
