import { PostList } from '@src/components/PostList/PostList';
import { METAINFO } from 'constants/metaInfo';

export const metadata = {
  title: METAINFO.HOME.TITLE,
  description: METAINFO.HOME.DESCRIPTION,
};

export default function Home() {
  return (
    <>
      <PostList />
    </>
  );
}
