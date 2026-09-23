import { Avatar, AvatarFallback, AvatarImage } from "../shadcn-ui/avatar";

export const User = () => {
  return (
    <div className="flex flex-row gap-2 items-center ml-5">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span>Username</span>
        <span>morty@spokes.com</span>
      </div>
    </div>
  );
};

//**
// TODO: Get logged in user's data;
// in db create a folder called actions;
// use sidebar shadcn divs;
// */
