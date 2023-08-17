import dbConnect from '@lib/dbConnect';
import Post from '@models/Post';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

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
  const failureResponse = {
    status: 500,
  };

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');

    if (!!userId && !mongoose.Types.ObjectId.isValid(userId)) {
      throw { message: 'userId 규격이 일치하지 않습니다', status: 401 };
    }

    if (!page || !limit) {
      throw { message: '조회에 필요한 파라미터가 부족합니다', status: 400 };
    }

    const findOption = userId ? { author: userId } : {};
    // 작성자별 포스트 목록 가져오기(페이지네이션 적용)
    const posts = await Post.find(findOption, null, {
      skip: (page - 1) * limit,
      limit,
    }).exec();
    successResponse.data = posts;

    return NextResponse.json(successResponse);
  } catch (error) {
    failureResponse.status = error.status;
    failureResponse.message = error.message;
    return NextResponse.json(failureResponse);
  }
}

export { GET };
