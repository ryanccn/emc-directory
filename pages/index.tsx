import type { GetStaticProps, NextPage } from 'next';
import { useEffect, useState } from 'react';

import ItemOverview from '~/components/ItemOverview';

export interface Overview {
  label: string;
  css: string;
  name: string;
  count: number;
  average: number;
}

const Index: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchedData, setFetchedData] = useState<Overview[] | null>(null);
  const [matches, setMatches] = useState<Overview[]>([]);

  useEffect(() => {
    (async () => {
      const d: Overview[] = await fetch('/api/overview').then((r) => r.json());
      setFetchedData(d);
    })();
  }, []);

  useEffect(() => {
    if (!fetchedData) return;

    setMatches(
      fetchedData.filter((k) =>
        k.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [fetchedData, searchTerm]);

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
      {fetchedData !== null ? (
        <ul className="flex flex-col space-y-4">
          {matches.map((match) => (
            <li key={match.name}>
              <ItemOverview item={match} />
            </li>
          ))}
        </ul>
      ) : (
        <p>fetching data...</p>
      )}
    </>
  );
};

export default Index;
