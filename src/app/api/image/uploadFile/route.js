import { NextResponse } from 'next/server';
import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

async function GET(request) {
  if (request.method !== 'GET') {
    return NextResponse.status(405);
  }

  const fileName = request.query.file;
  const fileType = request.query.fileType;
  const bucketName = process.env.AWS_S3_BUCKET_NAME;

  const s3Params = {
    Bucket: bucketName,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };

  return new Promise((resolve) => {
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        resolve(
          NextResponse.json({
            error: 'Error creating a pre-signed URL',
          }).status(500),
        );
      } else {
        resolve(
          NextResponse.json({
            signedRequest: data,
            url: `https://${bucketName}.s3.amazonaws.com/${fileName}`,
          }),
        );
      }
    });
  });
}

async function POST(request) {
  if (request.method !== 'POST') {
    return NextResponse.status(405);
  }

  try {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file) {
      throw new Error('No file found in the request');
    }

    const fileName = file.name;
    const fileType = file.type;
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    const fileStream = file.stream();
    let fileBuffer = Buffer.alloc(0);

    for await (const chunk of fileStream) {
      fileBuffer = Buffer.concat([fileBuffer, chunk]);
    }

    const s3Params = {
      Bucket: bucketName,
      Key: fileName,
      Body: fileBuffer,
      ContentType: fileType,
      ACL: 'public-read',
    };

    const data = await s3.putObject(s3Params);

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
    console.log(error);
    return NextResponse.json({
      error: 'Error uploading the image',
      statue: 500,
    });
  }
}

export { GET, POST };
