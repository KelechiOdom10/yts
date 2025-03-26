import { useState } from "react";
import { toast } from "@pheralb/toast";
import { authClient } from "~/lib/auth-client";
import { Button, Card, Form, ShowMore, TextField } from "../ui";
import { SocialLoginButton } from "./social-login-button";

export const LoginForm = () => {
  const urlParams = new URLSearchParams(window?.location.search);
  const redirectURL = urlParams.get("next") || "/app";
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;

    authClient.signIn.magicLink({
      email,
      callbackURL: redirectURL,
      fetchOptions: {
        onResponse: () => {
          setIsPending(false);
        },
        onRequest: () => {
          setIsPending(true);
        },
        onSuccess: () => {
          window.location.href = `/verify?email=${email}`;
        },
        onError: ({ error }) => {
          toast.error({ text: error.message });
        },
      },
    });
  };

  return (
    <Card className="mx-auto w-full max-w-md bg-white px-4">
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
            isPending={isPending}
            value={email}
            onChange={setEmail}
          />
          <Button
            type="submit"
            className="w-full"
            shape="square"
            isPending={isPending}
          >
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
