import { NextResponse } from 'next/server';

export const Get = async (request) => {
  //fetch

  return new NextResponse('It works!', { status: 200 });
};
