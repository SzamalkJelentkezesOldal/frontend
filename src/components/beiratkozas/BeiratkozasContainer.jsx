import ArrowUpIcon from "../icons/ArrowUpIcon";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import BlockIcon from "../icons/BlockIcon";
import CheckIcon from "../icons/CheckIcon";
import EditIcon from "../icons/EditIcon";
import { useEffect } from "react";

function BeiratkozasContainer({
  children,
  onSubmit,
  title,
  first,
  isDisabled,
  isCompleted,
  handleEdit,
  editLoading,
  isOpen,
  setIsOpen,
}) {
  return (
    <>
      <h1
        className={`sticky ${isOpen ? (first ? "sm:pt-[1.5rem]" : "") : `${first ? "pt-[9.5rem] xsm:pt-[8.6rem]" : ""} min-h-[3rem]`} top-[14.5rem] py-4 px-4 drop-shadow-sm font-medium text-2xl  text-szPrimary bg-gray-50 border-b-2 ${isCompleted ? "border-teal-300" : "border-gray-300"} ${isCompleted ? (isOpen ? "!bg-teal-50" : "!bg-teal-100 text-teal-800") : isDisabled ? "!bg-disabledGray/50 text-szPrimary/60" : ""} xsm:top-[12.9rem] z-10 lg:px-10`}
      >
        <span className="flex items-center gap-4">
          {isCompleted ? (
            isOpen ? (
              <ArrowUpIcon onClick={() => setIsOpen(!isOpen)} />
            ) : (
              <CheckIcon
                fill={"white"}
                size={"30"}
                className={" rounded-full bg-teal-300"}
              />
            )
          ) : isDisabled ? (
            <BlockIcon color={"#7e7e7e"} />
          ) : isOpen ? (
            <ArrowUpIcon onClick={() => setIsOpen(!isOpen)} />
          ) : (
            <ArrowDownIcon onClick={() => setIsOpen(!isOpen)} />
          )}
          {title}
          {isCompleted ? (
            isOpen ? (
              <></>
            ) : (
              <EditIcon
                onClick={() => {
                  setIsOpen(!isOpen);
                  handleEdit();
                }}
                className={"cursor-pointer"}
                fill="#00695C"
              />
            )
          ) : (
            <></>
          )}
        </span>
      </h1>
      {isOpen ? (
        <form
          onSubmit={onSubmit}
          className={`${first ? "pt-36 xsm:pt-[7.5rem]" : ""} flex flex-col items-center p-2 bg-gray-50 `}
        >
          {editLoading ? (
            <div className="flex items-center justify-center">
              <div className="loader"></div>
            </div>
          ) : (
            children
          )}
        </form>
      ) : null}
    </>
  );
}

export default BeiratkozasContainer;
