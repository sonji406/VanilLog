import createError from 'http-errors';

export async function findById(schema, id, { errorCode, errorMessage }) {
  const result = await schema.findOne({ _id: id }).lean().exec();
  if (!result) {
    throw createError(errorCode, errorMessage);
  }
  return post;
}
