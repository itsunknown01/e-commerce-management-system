import { Menu } from "lucide-react";
import { useFetchStoresQuery } from "../../services/store";

import StoreSwitcher from "../feature/store-switcher";
import { Button } from "../ui/button";
import SearchBar from "./search-bar";
import UserAvatar from "../feature/user-avatar";

const Header = () => {
  const { data: stores } = useFetchStoresQuery(null);
  return (
    <div className="w-full h-[4.375rem] flex justify-between mt-2">
      <div className="flex items-center px-4 gap-x-4">
        <Button variant="outline" className="bg-gray-100">
          <Menu className="h-4 w-4" />
        </Button>
        <StoreSwitcher items={stores} />
      </div>
      <div className="flex items-center px-4 pr-6 mr-10 gap-x-4">
        {/* TODO: */}
        <SearchBar />
        <UserAvatar />
      </div>
    </div>
  );
};

export default Header;