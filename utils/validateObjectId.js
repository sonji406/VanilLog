import mongoose from 'mongoose';
import createError from 'http-errors';
import { errors } from '@utils/errors';

export function validateObjectId(userId) {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw createError(
      errors.INVALID_USER_ID.STATUS_CODE,
      errors.INVALID_USER_ID.MESSAGE,
    );
  }
}
