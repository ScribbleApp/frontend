import type { ComponentProps, ReactNode } from "react";

interface ListProps<T> extends ComponentProps<"ul"> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  keyExtractor: (item: T) => string;
}

export function List<T>({
  items,
  renderItem,
  keyExtractor,
  ...rest
}: ListProps<T>) {
  return (
    <ul {...rest}>
      {items.map((item) => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
