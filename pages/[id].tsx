import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import itemData from '~/lib/minecraft';

interface PageProps {
  id: string;
}

const ListingPage: NextPage<PageProps> = ({ id }) => {
  return <p>{id}</p>;
};

export const getStaticProps: GetStaticProps<PageProps> = ({ params }) => {
  if (!params || typeof params.id !== 'string') throw new Error('welp');

  return {
    props: {
      id: params.id,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: itemData
      .map((k) => k.name)
      .map((n) => ({
        params: { id: n },
      })),

    fallback: false,
  };
};

export default ListingPage;
