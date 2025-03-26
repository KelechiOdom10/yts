import { useState } from "react";
import { toast } from "@pheralb/toast";
import { authClient } from "~/lib/auth-client";
import { Button, Card, Form, ShowMore, TextField } from "../ui";
import { SocialLoginButton } from "./social-login-button";

export const SignupForm = () => {
  const urlParams = new URLSearchParams(window?.location.search);
  const redirectURL = urlParams.get("next") || "/app";
  const [isPending, setIsPending] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !name) return;

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
            value={name}
            onChange={setName}
          />
          <TextField
            type="email"
            isRequired
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={setEmail}
            isPending={isPending}
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
          redirectURL={redirectURL}
        />
        <p className="text-center text-fg/80 text-sm">
          Already have an account?{" "}
          <a
            href={`/login?next=${redirectURL}`}
            className="font-semibold text-primary"
          >
            Login
          </a>
        </p>
      </Card.Content>
    </Card>
  );
};
