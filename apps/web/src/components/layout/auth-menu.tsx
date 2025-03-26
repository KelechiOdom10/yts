import { Skeleton } from "../ui";
import { authClient } from "~/lib/auth-client";
import { UserMenu } from "../layout/user-menu";
import { buttonStyles } from "../ui";

export const AuthMenu = () => {
  const { isPending, data } = authClient.useSession();
  const user = data?.user;
  const isLoggedIn = !!user;

  return (
    <div>
      {isPending ? (
        <Skeleton className="h-8 w-8 rounded-full" />
      ) : isLoggedIn ? (
        <UserMenu user={user} />
      ) : (
        <div className="flex items-center space-x-4">
          <a
            href="/login"
            className={buttonStyles({
              variant: "outline",
              size: "small",
              className: "hidden md:inline-flex",
            })}
          >
            Log in
          </a>
          <a
            href="/signup"
            className={buttonStyles({
              variant: "primary",
              size: "small",
            })}
          >
            Sign up
          </a>
        </div>
      )}
    </div>
  );
};
