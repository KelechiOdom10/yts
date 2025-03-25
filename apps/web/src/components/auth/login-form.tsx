import { Button, Card, Form, ShowMore, TextField } from "../ui";
import { SocialLoginButton } from "./social-login-button";
import { authClient } from "~/lib/auth-client";

export const LoginForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    if (!email) return;

    authClient.signIn.magicLink({
      email,
      //   callbackURL: searchParams.get("redirectURL") || "/app",
    });
  };

  return (
    <Card className="mx-auto w-full max-w-md bg-white">
      <Card.Header>
        <Card.Title className="font-header text-2xl md:text-3xl">
          Login
        </Card.Title>
        <Card.Description className="text-fg/80">
          Login to your account
        </Card.Description>
      </Card.Header>
      <Card.Content className="flex flex-col gap-6">
        <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextField
            type="email"
            isRequired
            label="Email"
            placeholder="Enter your email"
          />
          <Button type="submit" className="w-full" shape="square">
            Send magic link
          </Button>
        </Form>

        <ShowMore as="text" text="Or continue with" />

        <SocialLoginButton
          provider="google"
          label="Google"
          className="w-full"
        />
        <p className="text-center text-fg/80 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="font-semibold text-primary">
            Sign up
          </a>
        </p>
      </Card.Content>
    </Card>
  );
};
