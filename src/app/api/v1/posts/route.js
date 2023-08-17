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

    // 에러 메시지 상수화

    // throw 객체 보다 에러 클래스? 직접 만들면(라이브러리 사용하거나 http-errors)
    if (!!userId && !mongoose.Types.ObjectId.isValid(userId)) {
      throw { message: 'userId 규격이 일치하지 않습니다', status: 401 };
    }

    if (!page || !limit) {
      throw { message: '조회에 필요한 파라미터가 부족합니다', status: 400 };
    }

    const findOption = userId ? { author: userId } : {};
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
