import {
  DndContext,
  PointerSensor,
  TouchSensor,
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
  const { jelentkezesek, setJelentkezesek, sorrendLoading } =
    useContext(SorrendContext);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
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
          {sorrendLoading ? (
            <div className="w-full flex justify-center">
              <div className="loader"></div>
            </div>
          ) : (
            jelentkezesek.map((item, index) => (
              <SortableItem
                key={item.szak_id}
                id={item.szak_id}
                szak={item.elnevezes}
                portfolio={item.portfolio}
                index={index}
              />
            ))
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default DraggableList;
