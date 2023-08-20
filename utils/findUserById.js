import createError from 'http-errors';
import User from '@models/User';
import { errors } from '@utils/errors';

export async function findUserById(userId) {
  const user = await User.findOne({ _id: userId }).lean().exec();
  if (!user) {
    throw createError(
      errors.USER_NOT_FOUND.STATUS_CODE,
      errors.USER_NOT_FOUND.MESSAGE,
    );
  }
  return user;
}
