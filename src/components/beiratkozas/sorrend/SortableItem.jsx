import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, szak, portfolio, index }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-gray-100 p-2 rounded-lg shadow szak__sorrend"
    >
      {index + 1}. {portfolio ? "E |" : "N | "} {szak}
    </div>
  );
};

export default SortableItem;
