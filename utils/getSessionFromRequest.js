import { getServerSession } from 'next-auth/next';

export async function getSessionFromRequest(request) {
  const req = {
    headers: {
      ...request.headers,
      cookie: request.headers.get('cookie'),
    },
    method: request.method,
  };

  return await getServerSession({ req });
}
