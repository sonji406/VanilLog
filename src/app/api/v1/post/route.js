import createError from 'http-errors';
import { NextResponse } from 'next/server';

import dbConnect from '@lib/dbConnect';
import Post from '@models/Post';
import User from '@models/User';
import { ERRORS } from 'constants/errors';
import { sendErrorResponse } from '@utils/response';
import { validateObjectId } from '@utils/validateObjectId';

/**
 * 포스트 생성 API
 * @URL /api/v1/post
 * @param request
 */
async function POST(request) {
  await dbConnect();

  try {
    const { title, content, author } = await request.json();

    if (!title || !content || !author) {
      throw createError(
        ERRORS.MISSING_PARAMETERS.STATUS_CODE,
        ERRORS.MISSING_PARAMETERS.MESSAGE,
      );
    }

    validateObjectId(author);

    const post = await Post.create({
      title,
      author,
      content,
    });

    await User.findByIdAndUpdate(author, {
      $push: { blogPosts: post._id },
    });

    return NextResponse.json({ status: 200, data: post });
  } catch (error) {
    return sendErrorResponse(error);
  }
}

export { POST };
