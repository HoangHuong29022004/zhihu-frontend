import { useState } from "react";
import { cn } from "@/lib/utils";
import { CircleX, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface ISearchBaseProps {
  placeholder: string;
  variants?: {
    wrapperClassName?: string;
    inputClassName?: string;
  };
  onGetValue: (value: string) => void;
}

const SearchBase = ({
  placeholder,
  variants = {},
  onGetValue,
}: ISearchBaseProps) => {
  const { wrapperClassName, inputClassName } = variants;
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onGetValue(value);
  };

  const handleClear = () => {
    setInputValue("");
    onGetValue("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("txtSearch");
    router.push(`?${params.toString()}`);
  };

  return (
    <div
      className={cn(
        "w-72 border border-gray-200 box-border shadow-sm flex items-center px-3 rounded-lg bg-white hover:border-gray-500 text-text-secondary",
        wrapperClassName
      )}
    >
      <Search />
      <input
        className={cn(
          "w-full h-12 px-2 outline-none min-w-[230px]",
          inputClassName
        )}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />

      {inputValue && (
        <button className="text-xs" onClick={handleClear}>
          <CircleX size={20} />
        </button>
      )}
    </div>
  );
};

export default SearchBase;
