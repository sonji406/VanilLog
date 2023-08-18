import mongoose from 'mongoose';
import createError from 'http-errors';
import { NextResponse } from 'next/server';

import dbConnect from '@lib/dbConnect';
import Post from '@models/Post';
import { ERROR_MESSAGES, ERROR_CODES } from '@utils/errors';
import { sendErrorResponse } from '@utils/response';
import { validateUserId } from '@utils/validateUserId';

/**
 * 포스트 목록 조회 API
 * @URL /api/v1/posts?userId=:userId&page={page_number}&limit={items_per_page}
 * @param request
 */
async function GET(request) {
  await dbConnect();
  const successResponse = {
    status: 'success',
  };

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');

    if (userId) {
      validateUserId(userId);
    }

    if (!page || !limit) {
      throw createError(
        ERROR_CODES.MISSING_PARAMETERS,
        ERROR_MESSAGES.MISSING_PARAMETERS,
      );
    }
    const findOption = userId ? { author: userId } : {};
    const posts = await Post.find(findOption, null, {
      skip: (page - 1) * limit,
      limit,
    }).exec();
    successResponse.data = posts;

    const totalPosts = await Post.countDocuments(findOption);
    successResponse.totalPosts = totalPosts;

    return NextResponse.json(successResponse);
  } catch (error) {
    return sendErrorResponse(error);
  }
}

export { GET };
