import axios from 'axios';
import { generateMetadata } from '@src/app/posts/[[...userId]]/page';
import { METAINFO } from '@utils/metaInfo';

describe('generateMetadata', () => {
  it('유효한 사용자 ID에 대한 올바른 메타데이터가 생성되어야 한다.', async () => {
    axios.mockResolvedValueOnce({
      data: {
        data: {
          nickname: '햄스터',
          blogPosts: ['post1', 'post2'],
        },
      },
    });

    const metadata = await generateMetadata({
      params: { userId: ['testUserId'] },
    });

    expect(metadata).toEqual({
      title: '햄스터',
      description: '햄스터님의 블로그입니다. 포스트 수 2',
    });
  });

  it('에러 발생 시에는 기본 메타 데이터를 사용해야 한다.', async () => {
    axios.mockRejectedValueOnce(new Error('API Error'));

    const metadata = await generateMetadata({
      params: { userId: ['testUserId'] },
    });

    expect(metadata).toEqual({
      title: METAINFO.BLOG_HOME.TITLE,
      description: METAINFO.BLOG_HOME.DESCRIPTION,
    });
  });
});
