import ArrowUpIcon from "../icons/ArrowUpIcon";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import BlockIcon from "../icons/BlockIcon";

function BeiratkozasContainer({
  children,
  onSubmit,
  title,
  first,
  isOpen,
  isDisabled,
}) {
  return (
    <>
      <h1
        className={`sticky ${isOpen ? "" : `${first ? "pt-[9rem]" : ""} min-h-[3rem]`} top-[14.5rem] py-4 px-4 drop-shadow-sm font-medium text-2xl text-szPrimary bg-gray-50 border-b-2 border-gray-300 ${isDisabled ? "!bg-disabledGray/50 text-szPrimary/60" : ""}`}
      >
        <span className="flex items-center gap-4">
          {isDisabled ? (
            <BlockIcon color={"#7e7e7e"} />
          ) : isOpen ? (
            <ArrowUpIcon />
          ) : (
            <ArrowDownIcon />
          )}
          {title}
        </span>
      </h1>
      {isOpen ? (
        <form
          onSubmit={onSubmit}
          className={`${first ? "pt-36" : ""} min-w-[380px] flex flex-col aling-center p-2 bg-gray-50 `}
        >
          {children}
        </form>
      ) : null}
    </>
  );
}

export default BeiratkozasContainer;
