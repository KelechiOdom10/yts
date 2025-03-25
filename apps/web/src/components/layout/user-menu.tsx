import type { User } from "better-auth";
import { toast } from "@pheralb/toast";
import { authClient } from "~/lib/auth-client";
import { Avatar, Menu } from "../ui";

interface UserMenuProps {
  user: User | null;
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
          toast.success({ text: "Signed out" });
        },
      },
    });
  };

  return (
    <Menu>
      <Menu.Trigger aria-label="User menu">
        <Avatar
          src={user?.image || null}
          initials={user?.name?.charAt(0) || "U"}
          alt={user?.name || "User profile"}
          shape="circle"
        />
      </Menu.Trigger>
      <Menu.Content placement="bottom">
        <Menu.Item href="/app/dashboard">Dashboard</Menu.Item>
        <Menu.Item href="/app/profile">Profile</Menu.Item>
        <Menu.Separator />
        <Menu.Item isDanger={true} onAction={handleSignOut}>
          Sign out
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
};
