"use client";

import { ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn-ui/avatar";
import { SidebarFooter } from "../shadcn-ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcn-ui/dropdown-menu";
import { Button } from "../shadcn-ui/button";
import { Fragment } from "react";

export type ProfileFooterUser = {
  name: string;
  email: string;
  avatarUrl?: string;
};

export type UserProfileItemType = {
  label: string;
  href: string;
};

export type UserProfileGroup = {
  title: string;
  items: UserProfileItemType[];
};

export const ProfileFooter = ({
  user,
  userProfileItems,
}: {
  user: ProfileFooterUser;
  userProfileItems: UserProfileGroup[];
}) => {
  return (
    <SidebarFooter>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" className="h-auto w-full p-2">
              <UserProfile user={user} />
            </Button>
          }
        />
        <UserProfileDropdownContent
          userProfileItems={userProfileItems}
        />
      </DropdownMenu>
    </SidebarFooter>
  );
};

const UserProfile = ({ user }: { user: ProfileFooterUser }) => {
  const initials = user.name.slice(0, 2).toUpperCase();

  return (
    <div className="flex w-full items-center gap-2">
      <Avatar>
        {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start">
        <span>{user.name}</span>
        <span>{user.email}</span>
      </div>
      <ChevronsUpDown className="ml-auto" />
    </div>
  );
};

const UserProfileDropdownContent = ({
  userProfileItems,
}: {
  userProfileItems: UserProfileGroup[];
}) => {
  return (
    <DropdownMenuContent side="top">
      {userProfileItems.map((group, index) => (
        <Fragment key={group.title}>
          {index > 0 && <DropdownMenuSeparator />}
          <DropdownMenuGroup>
            <DropdownMenuLabel>{group.title}</DropdownMenuLabel>
            {group.items.map((item) => (
              <DropdownMenuItem key={item.href} render={<a href={item.href} />}>
                {item.label}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem>
              <Button>Sign out</Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </Fragment>
      ))}
    </DropdownMenuContent>
  );
};
