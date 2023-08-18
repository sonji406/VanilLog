import mongoose from 'mongoose';
import createError from 'http-errors';
import { ERROR_MESSAGES, ERROR_CODES } from '@utils/errors';

export function validateUserId(userId) {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw createError(
      ERROR_CODES.INVALID_USER_ID,
      ERROR_MESSAGES.INVALID_USER_ID,
    );
  }
}
