import type { GetStaticProps, NextPage } from 'next';

import itemList from '~/lib/minecraft';
import { getTable } from '~/lib/supabase';
import { useEffect, useState } from 'react';

import ItemOverview from '~/components/ItemOverview';

export interface Overview {
  label: string;
  css: string;
  name: string;
  count: number;
  average: number;
}

interface Props {
  data: Overview[];
}

const Index: NextPage<Props> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // const [fetchedData, setFetchedData] = useState<Overview[] | null>(null);
  const [matches, setMatches] = useState<Overview[]>([]);

  // useEffect(() => {
  //   (async () => {
  //     const d: Overview[] = await fetch('/api/overview').then((r) => r.json());
  //     setFetchedData(d);
  //   })();
  // }, []);

  useEffect(() => {
    setMatches(
      data.filter((k) =>
        k.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  return (
    <>
      <h1 className="title mb-1">The EMC Directory</h1>
      <h2 className="mb-12 text-xl font-semibold">
        The one-stop shop to explore the best deals on EMC!
      </h2>
      <form
        className="mb-10"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Beacon"
          className="w-full rounded bg-zinc-100 px-4 py-2 dark:bg-zinc-800"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </form>

      <ul className="flex flex-col space-y-4">
        {matches.map((match) => (
          <li key={match.name}>
            <ItemOverview item={match} />
          </li>
        ))}
      </ul>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { data: listings, error } = await getTable().select('item,price,qty');

  if (!listings) throw error;

  const data = itemList.map((item) => {
    const subListings = listings.filter((k) => k.item === item.name);

    const avg =
      subListings.length !== 0
        ? subListings
            .map((listing) => {
              if (!listing.qty) return 0;
              return listing.price / listing.qty;
            })
            .reduce((p, c) => p + c, 0) / subListings.length
        : 0;

    const cnt = subListings.length ?? 0;

    return { ...item, average: avg, count: cnt };
  });

  return { props: { data } };
};

export default Index;
