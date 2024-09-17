import { useDispatch } from "react-redux";
import { Button } from "../../components/ui/button";
import { onOpen } from "../../redux/slices/modal";
import { logout } from "../../redux/slices/auth";

const StoreIDPage = () => {
  const dispatch = useDispatch();
  return (
    <div className="h-screen flex items-center justify-center gap-x-4">
      <Button onClick={() => dispatch(onOpen())}>Create Store</Button>
      <Button onClick={() => dispatch(logout())}>Logout</Button>
    </div>
  );
};

export default StoreIDPage;
