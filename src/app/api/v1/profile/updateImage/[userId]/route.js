import dbConnect from '@lib/dbConnect';
import User from '@models/User';
import { ERRORS } from '@utils/errors';
import { sendErrorResponse } from '@utils/response';
import { getLastPartOfUrl } from '@utils/getLastPartOfUrl';
import { getSessionFromRequest } from '@utils/getSessionFromRequest';

async function PUT(request) {
  await dbConnect();

  try {
    const userId = getLastPartOfUrl(request.url);

    const session = await getSessionFromRequest(request);
    if (!session) {
      throw new Error(ERRORS.USER_NOT_LOGGED_IN.MESSAGE);
    }

    if (session.mongoId !== userId) {
      throw new Error(ERRORS.UNAUTHORIZED_USER.MESSAGE);
    }

    const bodyData = await request.text();
    const parsedData = JSON.parse(bodyData);
    const { imageUrl } = parsedData;

    await User.findByIdAndUpdate(userId, { profileImage: imageUrl }).exec();

    return NextResponse.json({
      status: 'success',
      message: '프로필 이미지가 성공적으로 업데이트되었습니다',
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
}

export { PUT };
