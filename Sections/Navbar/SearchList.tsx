import { ProductInfo } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = {
  filteredList: ProductInfo[];
  setSearch: (data: string) => void;
  search: string;
  isSelected: boolean;
  setIsSelected: (data: boolean) => void;
};

function SearchList({
  filteredList,
  setSearch,
  search,
  isSelected,
  setIsSelected,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  function toggleList(title: string) {
    if (ref.current) {
      ref.current.classList.toggle("hidden");
      setSearch(title);
      setIsSelected(true);
    }
  }
  useEffect(() => {
    if (ref.current && !isSelected) {
      ref.current.classList.remove("hidden");
    }
  }, [search]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        ref.current.classList.add("hidden");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return (
    <div className="absolute w-full h-[200px] overflow-y-scroll" ref={ref}>
      {filteredList.length == 0 ? (
        <div className=" px-4 py-2 bg-slate-100 w-full text-gray-700 text-xs hover:bg-gray-100 active:bg-blue-100 border border-b">
          No Match.
        </div>
      ) : (
        filteredList.map((e) => (
          <Link
            href={`/products/${e.id}`}
            className="flex gap-1 px-4 py-2 bg-slate-100 w-full text-gray-700 text-xs hover:bg-gray-100 active:bg-blue-100 cursor-pointer border border-b"
            onClick={() => toggleList(e.title)}
          >
            <Image src={e.image} alt={e.title} width={40} height={40} />{" "}
            {e.title}
          </Link>
        ))
      )}
    </div>
  );
}

export default SearchList;
