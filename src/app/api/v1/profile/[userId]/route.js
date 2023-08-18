import mongoose from 'mongoose';
import createError from 'http-errors';
import { NextResponse } from 'next/server';

import dbConnect from '@lib/dbConnect';
import User from '@models/User';
import { ERROR_MESSAGES, ERROR_CODES } from '@utils/errors';
import { sendErrorResponse } from '@utils/response';

function getUserIdFromUrl(url) {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 1];
}

function validateUserId(userId) {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw createError(
      ERROR_CODES.INVALID_USER_ID,
      ERROR_MESSAGES.INVALID_USER_ID,
    );
  }
}

async function findUserById(userId) {
  const user = await User.findOne({ _id: userId }).lean().exec();
  if (!user) {
    throw createError(
      ERROR_CODES.USER_NOT_FOUND,
      ERROR_MESSAGES.USER_NOT_FOUND,
    );
  }
  return user;
}

/**
 * 유저 프로필 조회 API
 * @URL /api/v1/profile/:userId
 * @param request
 */
async function GET(request) {
  await dbConnect();

  try {
    const userId = getUserIdFromUrl(request.url);
    validateUserId(userId);
    const userProfile = await findUserById(userId);

    return NextResponse.json({
      status: 'success',
      data: userProfile,
    });
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

  try {
    const userId = getUserIdFromUrl(request.url);
    validateUserId(userId);

    const bodyData = await request.text();
    const parsedData = JSON.parse(bodyData);
    const { nickname } = parsedData;

    if (!nickname) {
      throw createError(
        ERROR_CODES.MISSING_NICKNAME,
        ERROR_MESSAGES.MISSING_NICKNAME,
      );
    }

    const existingUser = await User.findOne({ nickname }).lean().exec();
    if (existingUser && String(existingUser._id) !== userId) {
      throw createError(
        ERROR_CODES.DUPLICATE_NICKNAME,
        ERROR_MESSAGES.DUPLICATE_NICKNAME,
      );
    }

    const userProfile = await findUserById(userId);

    if (userProfile.nickname === nickname) {
      throw createError(
        ERROR_CODES.SAME_NICKNAME,
        ERROR_MESSAGES.SAME_NICKNAME,
      );
    }

    await User.findByIdAndUpdate(userId, { nickname }).exec();

    return NextResponse.json({
      status: 'success',
      data: {
        message: '닉네임이 성공적으로 업데이트되었습니다',
      },
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
}

export { GET, PUT };
