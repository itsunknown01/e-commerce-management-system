import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-react";
import { useDispatch } from "react-redux";
import { onOpen } from "../../redux/slices/modal";
import { cn } from "../../lib/utils";

interface StoreSwitcherProps {
  className?: string;
  items: { name: string; id: string }[];
}

export default function StoreSwitcher({
  className,
  items = [],
}: StoreSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const currentStore = items.find((item) => item.id === params.storeId);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (store: { name: string; id: string }) => {
    setOpen(false);
    navigate(`/${store.id}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={cn("relative inline-block text-left", className)}
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex justify-between items-center w-[200px] px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Store className="w-4 h-4 mr-2" />
        <span>{currentStore?.name || "No stores"}</span>
        <ChevronsUpDown className="w-4 h-4 ml-auto" />
      </button>

      {open && (
        <div className="absolute right-0 w-[200px] mt-1 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <div className="px-3 py-2">
              <input
                type="text"
                className="w-full px-2 py-1 text-sm border rounded-md"
                placeholder="Search store..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="px-3 py-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Stores
              </h3>
              <ul className="mt-2 space-y-1">
                {filteredItems.map((store) => (
                  <li key={store.id}>
                    <button
                      onClick={() => handleSelect(store)}
                      className="flex items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <Store className="w-4 h-4 mr-2" />
                      {store.name}
                      {currentStore?.id === store.id && (
                        <Check className="w-4 h-4 ml-auto" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-100"></div>

            <button
              onClick={() => {
                setOpen(false);
                dispatch(onOpen());
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Create Store
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
