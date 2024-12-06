import { ChangeEventHandler } from "react";

type InputProps = {
  htmlfor: string;
  label: string;
  id: string;
  name: string;
  type: string;
  autocomplete?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const Input = ({
  htmlfor,
  label,
  id,
  name,
  type,
  autocomplete,
  onChange,
}: InputProps) => {
  return (
    <div>
      <label
        htmlFor={htmlfor}
        className="block text-sm/6 font-medium text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          required
          autoComplete={autocomplete}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Input;
