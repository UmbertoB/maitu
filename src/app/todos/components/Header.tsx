'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

import { useTodos } from '@/src/app/todos/state/provider';
import { FontColor, HexColors } from '@/src/lib/colors';
import { stopPropagationFn } from '@/src/lib/functions';
import { clickStyle } from '@/src/lib/style-consts';

export const Header = () => {
  const { selectedList } = useTodos();

  return (
    <div className={`${clickStyle} flex items-center py-2`}>
      <Link
        className="flex h-12 pl-5"
        onClick={stopPropagationFn}
        href="/lists"
      >
        <ArrowLeftIcon
          className="relative mr-3 w-6 cursor-pointer"
          color={HexColors.get(selectedList.color)}
        />
      </Link>
      <h1
        className={`cursor-default pr-5 text-2xl font-bold ${FontColor.get(
          selectedList.color,
        )}`}
      >
        {selectedList?.title}
      </h1>
    </div>
  );
};
