import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import itemData from '~/lib/minecraft';
import { getTable } from '~/lib/supabase';
import type { definitions } from '~/lib/supabase.types';

interface PageProps {
  itemData: { name: string; label: string };
  listings: definitions['listings'][];
}

const ListingPage: NextPage<PageProps> = ({ itemData, listings }) => {
  return (
    <>
      <h1 className="title mb-1">Listings for {itemData.label}</h1>
      <h2 className="mb-12 text-xl font-semibold">
        {listings.length} {listings.length === 1 ? 'listing' : 'listings'}{' '}
        available!
      </h2>
      <table className="listings-table">
        <thead>
          <tr>
            <th>Server</th>
            <th>Res</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Average price</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <tr key={listing.id}>
              <td>{listing.server}</td>
              <td>{listing.res}</td>
              <td>{listing.price}r</td>
              <td>{listing.qty}</td>
              <td>{(listing.price / listing.qty).toFixed(2)}r</td>
              <td className="flex space-x-1">
                <button
                  className="rounded-sm bg-orange-500 px-2 py-1 text-sm font-semibold text-white hover:bg-orange-400"
                  onClick={() => {
                    navigator.clipboard.writeText(`/v ${listing.res}`);
                  }}
                >
                  Copy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  if (!params || typeof params.item !== 'string') throw new Error('welp');

  const itemData = await import('~/lib/minecraft')
    .then((mod) => mod.default)
    .then((data) => data.filter((k) => k.name === params.item))
    .then((filtered) => filtered[0]);

  let { data: listings, error } = await getTable()
    .select('*')
    .eq('item', params.item);

  if (error) throw error;
  if (!listings) throw new Error('whoops');

  listings = listings.sort((a, b) => a.price / a.qty - b.price / b.qty);

  return {
    props: {
      itemData,
      listings,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: itemData
      .map((k) => k.name)
      .map((n) => ({
        params: { item: n },
      })),

    fallback: false,
  };
};

export default ListingPage;
