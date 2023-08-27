import axios from 'axios';
import { generateMetadata } from '@src/app/post/[userId]/[postId]/page';
import { METAINFO } from '@utils/metaInfo';

describe('generateMetadata', () => {
  it('유효한 포스트 ID에 대한 올바른 메타데이터가 생성되어야 한다.', async () => {
    axios.mockResolvedValueOnce({
      data: {
        data: {
          title: '포스트 제목',
          content: {
            blocks: [{ type: 'text', data: { text: '포스트 본문' } }],
          },
        },
      },
    });

    const metadata = await generateMetadata({
      params: { postId: 'testPostId' },
    });

    expect(metadata).toEqual({
      title: '포스트 제목',
      description: '포스트 본문',
    });
  });

  it('에러 발생 시에는 기본 메타 데이터를 사용해야 한다.', async () => {
    axios.mockRejectedValueOnce(new Error('API Error'));

    const metadata = await generateMetadata({
      params: { postId: 'testPostId' },
    });

    expect(metadata).toEqual({
      title: METAINFO.POST_DETAIL.TITLE,
      description: METAINFO.POST_DETAIL.DESCRIPTION,
    });
  });
});
