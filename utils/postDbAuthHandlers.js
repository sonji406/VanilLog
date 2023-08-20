import dbConnect from '@lib/dbConnect';
import { getSession } from 'next-auth/react';
import { validateObjectId } from '@utils/validateObjectId';
import { getLastPartOfUrl } from '@utils/getLastPartOfUrl';
import { ERRORS } from '@utils/errors';

export async function handleDBOperations() {
  await dbConnect();
}

export function extractAndValidateId(url) {
  const postId = getLastPartOfUrl(url);
  validateObjectId(postId);
  return postId;
}

export async function isLoggedInAndIsAuthor(request, postAuthorId) {
  const session = await getSession({ req: request });
  if (!session) {
    throw new Error(ERRORS.USER_NOT_LOGGED_IN.MESSAGE);
  }

  if (postAuthorId.toString() !== session.mongoId) {
    throw new Error(ERRORS.NOT_POST_AUTHOR.MESSAGE);
  }
}
