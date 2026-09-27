import { Avatar, AvatarFallback, AvatarImage } from "../shadcn-ui/avatar";

export type ProfileFooterUser = {
  name: string;
  email: string;
  avatarUrl?: string;
};

export const ProfileFooter = ({ user }: { user: ProfileFooterUser }) => {
  const initials = user.name.slice(0, 2).toUpperCase();
  return (
    <div className="flex flex-row gap-2 items-center ml-5">
      <Avatar>
        {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span>{user.name}</span>
        <span>{user.email}</span>
      </div>
    </div>
  );
};
