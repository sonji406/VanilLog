import mongoose from 'mongoose';
import createError from 'http-errors';
import { NextResponse } from 'next/server';

import dbConnect from '@lib/dbConnect';
import User from '@models/User';
import { sendErrorResponse } from '@utils/response';
import { validateObjectId } from '@utils/validateObjectId';
import { findUserById } from '@utils/findUserById';
import { ERRORS } from '@utils/errors';

function getUserIdFromUrl(url) {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 1];
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
    validateObjectId(userId);
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
    validateObjectId(userId);

    const bodyData = await request.text();
    const parsedData = JSON.parse(bodyData);
    const { nickname } = parsedData;

    if (!nickname) {
      throw createError(
        ERRORS.MISSING_NICKNAME.STATUS_CODE,
        ERRORS.MISSING_NICKNAME.MESSAGE,
      );
    }

    const existingUser = await User.findOne({ nickname }).lean().exec();
    if (existingUser && String(existingUser._id) !== userId) {
      throw createError(
        ERRORS.DUPLICATE_NICKNAME.STATUS_CODE,
        ERRORS.DUPLICATE_NICKNAME.MESSAGE,
      );
    }

    const userProfile = await findUserById(userId);

    if (userProfile.nickname === nickname) {
      throw createError(
        ERRORS.SAME_NICKNAME.STATUS_CODE,
        ERRORS.SAME_NICKNAME.MESSAGE,
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
