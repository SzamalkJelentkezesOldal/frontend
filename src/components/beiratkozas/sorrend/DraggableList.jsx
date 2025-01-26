import {
  DndContext,
  PointerSensor,
  TouchSensor,
  closestCenter,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { useContext } from "react";
import { SorrendContext } from "../../../context/beiratkozas/SorrendContext";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";

const DraggableList = () => {
  const { jelentkezesek, setJelentkezesek } = useContext(SorrendContext);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      // Szak_id alapján keresd az elemeket
      const oldIndex = jelentkezesek.findIndex(
        (item) => item.szak_id === active.id
      );
      const newIndex = jelentkezesek.findIndex(
        (item) => item.szak_id === over.id
      );
      const ujSorrend = arrayMove(jelentkezesek, oldIndex, newIndex);
      const ujSorrendFrissitve = ujSorrend.map((item, index) => ({
        ...item,
        sorrend: index,
      }));

      setJelentkezesek(ujSorrendFrissitve);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
    >
      <SortableContext
        items={jelentkezesek.map((item) => item.szak_id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2 bg-white border-[1.3px] flex flex-col gap-2 p-4 rounded-[6.5px] shadow-md w-full text-xl text-inputGray">
          {jelentkezesek.map((item) => (
            <SortableItem
              key={item.szak_id}
              id={item.szak_id}
              szak={item.elnevezes}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default DraggableList;
