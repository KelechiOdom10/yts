import { buttonStyles, Card } from "../ui";
import { Gmail } from "./providers/gmail";
import { Outlook } from "./providers/outlook";

const providers = [
  {
    id: "gmail",
    icon: Gmail,
    label: "Gmail",
    getUrl: () =>
      `https://mail.google.com/mail/u/0/#search/from:${encodeURIComponent("no-reply@yts.com")}`,
  },
  {
    id: "outlook",
    icon: Outlook,
    label: "Outlook",
    getUrl: () =>
      `https://outlook.live.com/mail/0/inbox?search=from%3A${encodeURIComponent("no-reply@yts.com")}`,
  },
];

export const VerifyEmail = () => {
  const urlParams = new URLSearchParams(window?.location.search);
  const email = urlParams.get("email");

  return (
    <Card className="mx-auto w-full max-w-md bg-white">
      <Card.Header>
        <Card.Title className="font-header text-2xl md:text-3xl">
          Check your inbox
        </Card.Title>
        <Card.Description className="text-fg/80">
          We&apos;ve sent you a magic link to{" "}
          <span className="font-medium text-fg">{email}</span>. Please click the
          link to confirm your address.
        </Card.Description>
      </Card.Header>
      <Card.Content className="flex flex-col gap-6">
        <div className="flex gap-4">
          {providers.map(({ id, icon: Icon, label, getUrl }) => (
            <a
              key={id}
              href={getUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ variant: "outline" })}
            >
              <Icon className="size-6" />
              <span className="font-medium text-sm">{label}</span>
            </a>
          ))}
        </div>
        <p className="text-muted-fg text-sm">
          No email in your inbox?{" "}
          <span className="font-medium">Check your spam folder</span> or{" "}
          <a href="/login" className="font-medium text-primary hover:underline">
            try a different email address
          </a>
          .
        </p>
      </Card.Content>
    </Card>
  );
};
