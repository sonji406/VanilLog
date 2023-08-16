import dbConnect from '@lib/dbConnect';
import Post from '@models/Post';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

//GET /api/v1/posts?userId=:userId&page={page_number}&limit={items_per_page}
//테스트용 http://localhost:3000/api/v1/posts?userId=64dceeca5528cd869ba560db&page=10&limit=5

/* 성공
{
  "status": "success",
  "data": [{
	  "_id": "60ffdd8a13e44b5d1ec312e9",
	  "title": "My Blog Post",
	  "category": "programming",
	  "author": {
	    "_id": "60ffdc3a33fca84a8e05bb92",
	    "nickname": "john_doe"
		 },
	  "createdAt": "2023-08-01T12:00:00.000Z",
	  "updatedAt": "2023-08-01T12:34:56.789Z"
  },
  {....},
  ....]
}
*/

/* 실패
{
  "status": 500,
  "message": "포스트 목록을 불러올 수 없습니다."
}
*/

export const GET = async (request) => {
  await dbConnect();
  const successResponse = {
    status: 'success',
  };
  const failureResponse = {
    status: 500,
  };

  // 파라미터들 가져오기
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw { message: 'userId 규격이 일치하지 않습니다', status: 401 };
    }

    if (!userId || !page || !limit) {
      throw { message: '조회에 필요한 파라미터가 부족합니다', status: 400 };
    }

    // 유저별 포스트 목록 가져오기
    const posts = await Post.find({ author: userId }).exec();
    successResponse.data = posts;

    // 2차 페이징 포함해서 조회해 오기

    return NextResponse.json(successResponse);
  } catch (error) {
    failureResponse.status = error.status;
    failureResponse.message = error.message;
    return NextResponse.json(failureResponse);
  }
};
