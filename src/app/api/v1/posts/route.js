import mongoose from 'mongoose';
import createError from 'http-errors';
import { NextResponse } from 'next/server';

import dbConnect from '@lib/dbConnect';
import Post from '@models/Post';
import { ERROR_MESSAGES, ERROR_CODES } from '@utils/errors';
import { sendErrorResponse } from '@utils/response';
import { validateUserId } from '@utils/validateUserId';

function getPostIdFromUrl(url) {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 1];
}

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

/**
 * 블로그 포스트 수정 API
 * @URL /api/v1/post/:postId
 * @param request
 */
async function PUT(request) {
  await dbConnect();

  try {
    const postId = getPostIdFromUrl(request.url);

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw createError(
        ERROR_CODES.INVALID_POSTID,
        ERROR_MESSAGES.INVALID_POSTID,
      );
    }

    let parsedData;
    try {
      parsedData = JSON.parse(await request.text());
    } catch {
      throw createError(ERROR_CODES.INVALID_JSON, ERROR_MESSAGES.INVALID_JSON);
    }
    const { title, content } = parsedData;

    if (!title || !content) {
      throw createError(
        ERROR_CODES.MISSING_POST_FIELDS,
        ERROR_MESSAGES.MISSING_POST_FIELDS,
      );
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true },
    );

    if (!updatedPost) {
      throw createError(
        ERROR_CODES.POST_NOT_FOUND,
        ERROR_MESSAGES.POST_NOT_FOUND,
      );
    }

    return NextResponse.json({
      status: 'success',
      data: {
        message: '포스트가 성공적으로 업데이트되었습니다',
        post: updatedPost,
      },
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
}

export { GET, PUT };
