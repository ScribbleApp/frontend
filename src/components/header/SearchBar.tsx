import {
  type ReactNode,
  type ComponentProps,
  useState,
  ChangeEvent,
} from "react";
import cn from "classnames";

import { useDebouncedValue } from "@mantine/hooks";

import { useQuery } from "@tanstack/react-query";
import { searchPosts } from "../../api";
import { List } from "../generics/List";
import { Link, useNavigate } from "react-router-dom";

interface SearchBarProps extends ComponentProps<"form"> {
  placeholder: string;
  icon?: ReactNode;
}

export const SearchBar = ({
  placeholder,
  icon,
  className,
  ...rest
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debounced] = useDebouncedValue(searchQuery, 300);

  const { data } = useQuery({
    queryKey: ["posts", "search"],
    queryFn: async () => await searchPosts(debounced),
    enabled: debounced ? true : false,
    // cacheTime: 0,
  });

  const onChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative">
      <form
        {...rest}
        className={cn(
          "flex h-10 w-64 items-center space-x-2 rounded-full bg-neutral-100 p-2",
          className
        )}
      >
        {icon}
        <input
          type="text"
          placeholder={placeholder}
          className="w-full border-none bg-transparent text-neutral-500 outline-none focus:outline-none"
          value={searchQuery}
          onChange={onChangeQuery}
        />
      </form>
      {data && debounced && (
        <List
          items={data}
          keyExtractor={({ title }) => title}
          renderItem={({ title, id }) => (
            <Link
              to={"/posts/" + id}
              className="block w-full p-2  hover:bg-neutral-50"
              onClick={() => setSearchQuery("")}
            >
              {title}
            </Link>
          )}
          className="absolute left-0 top-12 w-full border border-neutral-500 bg-white"
        />
      )}
    </div>
  );
};
