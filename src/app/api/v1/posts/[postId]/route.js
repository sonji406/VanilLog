import { NextResponse } from 'next/server';

import { errors } from '@utils/errors';
import { sendErrorResponse } from '@utils/response';
import { validateObjectId } from '@utils/validateObjectId';
import { findById } from '@utils/findById';
import { getLastPartOfUrl } from '@utils/getLastPartOfUrl';
import Post from '@models/Post';
import dbConnect from '@lib/dbConnect';

/**
 * 포스트 조회 API
 * @URL /api/v1/posts/:postId
 * @param request
 */
async function GET(request) {
  await dbConnect();

  try {
    const postId = getLastPartOfUrl(request.url);
    validateObjectId(postId);
    const post = await findById(Post, postId, errors.POST_NOT_FOUND);

    return NextResponse.json({
      status: 'success',
      data: post,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
}

export { GET };
