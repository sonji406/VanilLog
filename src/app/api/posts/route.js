import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import dbConnect from '@lib/dbConnect';
import Post from '@models/Post';

async function POST(request, response) {
  await dbConnect();

  const successResponse = {
    status: 200,
  };

  const failureResponse = {
    status: 500,
  };

  try {
    const { title, content, author } = await request.json();

    if (!title || !content || !author) {
      throw { message: '값이 누락되었습니다.', status: 400 };
    }

    const _id = new mongoose.Types.ObjectId();

    const post = await Post.create({
      _id,
      title,
      author: author,
      content,
    });

    successResponse.data = post;

    return NextResponse.json(successResponse);
  } catch (error) {
    failureResponse.status = error.status;
    failureResponse.message = error.message;
    return NextResponse.json(failureResponse);
  }
}

export { POST };
