import createError from 'http-errors';
import User from '@models/User';
import { ERROR_MESSAGES, ERROR_CODES } from '@utils/errors';

export async function findUserById(userId) {
  const user = await User.findOne({ _id: userId }).lean().exec();
  if (!user) {
    throw createError(
      ERROR_CODES.USER_NOT_FOUND,
      ERROR_MESSAGES.USER_NOT_FOUND,
    );
  }
  return user;
}
