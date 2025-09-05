// components/SelectSearchBase.tsx
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { NoDataBase } from "../no-data";

interface Item {
  id: string;
  value: string;
}

interface SelectSearchBaseProps {
  data: Item[];
  onSelect: (selectedItems: Item[]) => void;
  className?: string;
  placeholder?: string;
  defaultValue?: Item[];
  isUpdateAction?: boolean;
}

const SelectSearchBase = ({
  data,
  onSelect,
  className,
  placeholder,
  defaultValue = [],
  isUpdateAction = false,
}: SelectSearchBaseProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<Item[]>(defaultValue);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Update selectedItems when defaultValue changes
  useEffect(() => {
    if (
      defaultValue.length !== selectedItems.length ||
      !defaultValue.every((item, index) => item.id === selectedItems[index]?.id)
    ) {
      setSelectedItems(defaultValue);
    }
  }, [isUpdateAction && defaultValue]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectItem = (item: Item) => {
    const isSelected = selectedItems.some(
      (selected) => selected.id === item.id
    );
    let newSelectedItems: Item[];

    if (isSelected) {
      // Remove item if it's already selected
      newSelectedItems = selectedItems.filter(
        (selected) => selected.id !== item.id
      );
    } else {
      // Add item if it's not selected
      newSelectedItems = [...selectedItems, item];
    }

    setSelectedItems(newSelectedItems);
    onSelect(newSelectedItems);
  };

  const handleRemoveItem = (item: Item) => {
    const newSelectedItems = selectedItems.filter(
      (selected) => selected.id !== item.id
    );
    setSelectedItems(newSelectedItems);
    onSelect(newSelectedItems);
  };

  const handleClearAll = () => {
    setSelectedItems([]);
    onSelect([]);
  };

  const filteredItems = data.filter((item) =>
    item.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={cn("relative w-[380]", className)}>
      {/* Ô search và các item đã chọn */}
      <div
        className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-lg cursor-text"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {/* Các item đã chọn */}
        {selectedItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center bg-primary text-white px-3 py-1 rounded-full gap-2"
          >
            <span>{item.value}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
                handleRemoveItem(item);
              }}
              className="text-text-secondary size-5 leading-5 rounded-full bg-white "
            >
              &times;
            </button>
          </div>
        ))}

        {/* Ô search */}
        <input
          type="text"
          placeholder={
            selectedItems.length > 0 ? "Nhập từ khóa..." : placeholder
          }
          value={searchTerm}
          onChange={handleSearch}
          className="flex-1 p-1 border-none outline-none text-primary"
        />

        {/* Nút xóa tất cả */}
        {selectedItems.length > 0 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
              handleClearAll();
            }}
            className="text-gray-500 hover:text-gray-700 size-6 rounded-full bg-slate-100"
          >
            &times;
          </button>
        )}
      </div>

      {/* Dropdown danh sách các item */}
      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto border border-gray-300 rounded-md bg-white shadow-lg">
          <ul className="space-y-1 p-2">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => {
                const isChecked = selectedItems.some(
                  (selected) => selected.id === item.id
                );
                return (
                  <li
                    key={index}
                    onClick={() => handleSelectItem(item)}
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleSelectItem(item)}
                      className="mr-2 size-4"
                    />
                    <span>{item.value}</span>
                  </li>
                );
              })
            ) : (
              <NoDataBase title="Ossp! Chưa có kỹ năng này!" className="py-8" />
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectSearchBase;
