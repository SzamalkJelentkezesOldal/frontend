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
import { useContext, useEffect, useState } from "react";
import { SorrendContext } from "../../../context/beiratkozas/SorrendContext";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { AuthContext } from "../../../context/AuthContext";

const DraggableList = () => {
  const { jelentkezesek, setJelentkezesek, sorrendLoading, dataFetched } =
    useContext(SorrendContext);

  const { user } = useContext(AuthContext);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setInitialLoading(false);
    }, 1500);

    if (jelentkezesek?.length > 0) {
      setInitialLoading(false);
    }

    return () => clearTimeout(timeoutId);
  }, [jelentkezesek]);

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) return;

    try {
      const oldIndex = jelentkezesek.findIndex(
        (item) => item.szak_id === active.id
      );
      const newIndex = jelentkezesek.findIndex(
        (item) => item.szak_id === over.id
      );

      if (oldIndex === -1 || newIndex === -1) {
        return;
      }

      const ujSorrend = arrayMove(jelentkezesek, oldIndex, newIndex);
      const ujSorrendFrissitve = ujSorrend.map((item, index) => ({
        ...item,
        sorrend: index,
      }));

      setJelentkezesek(ujSorrendFrissitve);
    } catch (error) {
      // Error handling
    }
  };

  const renderContent = () => {
    if (initialLoading || sorrendLoading) {
      return (
        <div className="w-full flex justify-center py-10">
          <div className="loader"></div>
        </div>
      );
    }

    if (!jelentkezesek || jelentkezesek.length === 0) {
      return (
        <div className="text-center py-10 text-gray-500">
          Nincsenek jelentkezések
        </div>
      );
    }

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
          {jelentkezesek.map((item, index) => (
            <SortableItem
              key={item.szak_id}
              id={item.szak_id}
              szak={item.elnevezes}
              portfolio={item.portfolio}
              index={index}
            />
          ))}
        </SortableContext>
      </DndContext>
    );
  };

  return (
    <div className="space-y-2 bg-white border-[1.3px] flex flex-col gap-2 p-4 rounded-[6.5px] shadow-md w-full text-xl text-inputGray">
      {renderContent()}
    </div>
  );
};

export default DraggableList;
