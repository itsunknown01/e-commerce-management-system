import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface UserAvatarProps {
  image?: string;
}

const UserAvatar = ({ image }: UserAvatarProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer border-gray-300 rounded-[19px] border">
          <AvatarImage src={image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        
      </PopoverContent>
    </Popover>
  );
};

export default UserAvatar;
