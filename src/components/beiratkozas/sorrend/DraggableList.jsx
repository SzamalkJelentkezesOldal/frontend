import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { useContext } from "react";
import { SorrendContext } from "../../../context/beiratkozas/SorrendContext";

const DraggableList = () => {
  const { jelentkezesek, setJelentkezesek } = useContext(SorrendContext);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = jelentkezesek.findIndex(
        (item) => item.sorrend === active.id
      );
      const newIndex = jelentkezesek.findIndex(
        (item) => item.sorrend === over.id
      );
      const ujSorrend = arrayMove(jelentkezesek, oldIndex, newIndex);
      const ujSorrendFrissitve = ujSorrend.map((item, index) => ({
        ...item,
        sorrend: index,
      }));

      console.log(ujSorrendFrissitve);

      setJelentkezesek(ujSorrendFrissitve);
    }
  };

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={jelentkezesek.map((item) => item.sorrend)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {jelentkezesek.map((item) => (
              <SortableItem
                key={item.sorrend}
                id={item.sorrend}
                szak={item.elnevezes}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
};

export default DraggableList;
