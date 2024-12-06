import { HiOutlineXCircle } from "react-icons/hi2";

type AlertProps = {
  message: string;
};

const DangerAlert = ({ message }: AlertProps) => {
  return (
    <div className="rounded-md bg-red-50 p-4 my-2">
      <div className="flex">
        <div className="shrink-0">
          <HiOutlineXCircle
            aria-hidden="true"
            className="size-5 text-red-400"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{message}</h3>
        </div>
      </div>
    </div>
  );
};

export default DangerAlert;
