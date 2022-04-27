import clsx from 'clsx';
import Link from 'next/link';
import type { Overview } from '~/pages/index';

const ItemOverview = ({ item }: { item: Overview }) => {
  return (
    <Link href={`/${item.name}`}>
      <a className="flex flex-col rounded bg-zinc-100 p-4 transition-[background-color,_box-shadow] hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700">
        <h2 className="mb-2 flex space-x-2 text-xl font-semibold">
          <i className={clsx('icon-minecraft', item.css)}></i>
          <span>{item.label}</span>
        </h2>
        <p className="text-base font-medium">{item.count} listings</p>
        <p className="text-base font-medium">Average price: {item.average}r</p>
      </a>
    </Link>
  );
};

export default ItemOverview;
