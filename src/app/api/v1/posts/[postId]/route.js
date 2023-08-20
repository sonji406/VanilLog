import { NextResponse } from 'next/server';

import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

import { ERRORS } from '@utils/errors';
import { sendErrorResponse } from '@utils/response';
import { findById } from '@utils/findById';
import {
  handleDBOperations,
  extractAndValidateId,
  isLoggedInAndIsAuthor,
} from '@utils/postDbAuthHandlers';
import Post from '@models/Post';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

/**
 * 블로그 포스트 조회 API
 * @URL /api/v1/posts/:postId
 * @param request
 */
async function GET(request) {
  await handleDBOperations();

  try {
    const postId = extractAndValidateId(request.url);
    const post = await findById(Post, postId, ERRORS.POST_NOT_FOUND);

    return NextResponse.json({
      status: 'success',
      data: post,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
}

/**
 * 블로그 포스트 삭제 API
 * @URL /api/v1/posts/:postId
 * @param request
 */

async function DELETE(request) {
  await handleDBOperations();

  try {
    const postId = extractAndValidateId(request.url);

    const post = await findById(Post, postId, ERRORS.POST_NOT_FOUND);
    await isLoggedInAndIsAuthor(request, post.author);

    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      throw new Error(ERRORS.POST_NOT_FOUND.MESSAGE);
    }

    return NextResponse.json({
      status: 'success',
      data: {
        message: '포스트가 성공적으로 삭제되었습니다',
        post: deletedPost,
      },
    });
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
  await handleDBOperations();

  let parsedData;
  try {
    parsedData = JSON.parse(await request.text());
  } catch {
    return sendErrorResponse(ERRORS.INVALID_JSON.MESSAGE);
  }

  try {
    const postId = extractAndValidateId(request.url);

    const post = await findById(Post, postId, ERRORS.POST_NOT_FOUND);
    await isLoggedInAndIsAuthor(request, post.author);

    let { title, content } = parsedData;
    title = DOMPurify.sanitize(title);

    if (!content || !content.blocks || !Array.isArray(content.blocks)) {
      throw new Error(ERRORS.MISSING_POST_FIELDS.MESSAGE);
    }

    content.blocks = content.blocks.map((block) => {
      if (block.type === 'paragraph') {
        block.data.text = DOMPurify.sanitize(block.data.text);
      } else if (block.type === 'image') {
        block.data.caption = DOMPurify.sanitize(block.data.caption);
      }
      return block;
    });

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true },
    );

    if (!updatedPost) {
      throw new Error(ERRORS.POST_NOT_FOUND.MESSAGE);
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

export { GET, DELETE, PUT };
