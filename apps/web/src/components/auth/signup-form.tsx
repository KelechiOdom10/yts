import { Button, Card, Form, ShowMore, TextField } from "../ui";
import { SocialLoginButton } from "./social-login-button";
import { authClient } from "~/lib/auth-client";

export const SignupForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;

    if (!email || !name) return;

    authClient.signIn.magicLink({
      email,
      //   callbackURL: searchParams.get("redirectURL") || "/app",
    });
  };

  return (
    <Card className="mx-auto w-full max-w-md bg-white">
      <Card.Header>
        <Card.Title className="font-header text-2xl md:text-3xl">
          Sign up
        </Card.Title>
        <Card.Description className="text-fg/80">
          Create an account to start your learning journey
        </Card.Description>
      </Card.Header>
      <Card.Content className="flex flex-col gap-6">
        <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextField
            type="text"
            isRequired
            label="Name"
            placeholder="Enter your name"
          />
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
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-primary">
            Login
          </a>
        </p>
      </Card.Content>
    </Card>
  );
};
