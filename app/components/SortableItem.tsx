import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PropsWithChildren } from "react";
import { DotsSixVertical } from "@phosphor-icons/react";

type Props = {
  id: string;
};

const SortableItem: React.FC<PropsWithChildren<Props>> = ({ children, id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="list-none flex flex-row items-center gap-2"
    >
      <DotsSixVertical size={21} weight="bold" />
      {children}
    </li>
  );
};

export default SortableItem;
