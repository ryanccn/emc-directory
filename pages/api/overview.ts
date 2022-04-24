import type { NextApiHandler } from 'next';
import itemList from '~/lib/minecraft';
import { getTable } from '~/lib/supabase';

const h: NextApiHandler = async (_req, res) => {
  const { data: listings } = await getTable().select('item');

  if (!listings) return res.status(404).send({ error: 'Not Found' });

  const data = itemList.map((item) => {
    const subListings = listings.filter((k) => k.item === item.name);

    const avg = subListings.reduce((p, c) => p + c.price / c.qty, 0) ?? 0;
    const cnt = subListings.length ?? 0;

    return { ...item, average: avg, count: cnt };
  });

  res.setHeader('cache-control', 's-maxage=300,stale-while-revalidate=86100');
  res.send(data);
};

export default h;
