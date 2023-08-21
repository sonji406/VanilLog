import { NextResponse } from 'next/server';
import { S3 } from '@aws-sdk/client-s3';
import createError from 'http-errors';
import { ERRORS } from '@utils/errors';
import { sendErrorResponse } from '@utils/response';

const s3Data = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const bucketName = process.env.AWS_S3_BUCKET_NAME;

function GET(request) {
  const { file: fileName, fileType } = request.query;

  return new Promise((resolve) => {
    const s3Params = {
      Bucket: bucketName,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read',
    };

    s3Data.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        throw createError(
          ERRORS.SIGNED_URL_CREATION_ERROR.STATUS_CODE,
          ERRORS.SIGNED_URL_CREATION_ERROR.MESSAGE,
        );
      }

      resolve(
        NextResponse.json({
          signedRequest: data,
          url: `https://${bucketName}.s3.amazonaws.com/${fileName}`,
        }),
      );
    });
  });
}

async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file) {
      throw new Error('요청에서 파일을 찾을 수 없습니다.');
    }

    const fileName = file.name;
    const fileStream = file.stream();
    let fileBuffer = Buffer.alloc(0);

    for await (const chunk of fileStream) {
      fileBuffer = Buffer.concat([fileBuffer, chunk]);
    }

    const fileUrl = `https://${bucketName}.s3.amazonaws.com/${fileName}`;

    return NextResponse.json({
      success: 1,
      file: {
        url: fileUrl,
        name: fileName,
        size: fileBuffer.length,
      },
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
}

export { GET, POST };
