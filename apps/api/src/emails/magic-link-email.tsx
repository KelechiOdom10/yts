import { Text } from "@react-email/components";
import { siteConfig } from "@yts/shared";
import { EmailWrapper, type EmailWrapperProps } from "./components/wrapper";
import { EmailButton } from "./components/button";

type MagicLinkEmailProps = EmailWrapperProps & {
  url: string;
};

export const MagicLinkEmail = ({ url, ...props }: MagicLinkEmailProps) => {
  return (
    <EmailWrapper {...props}>
      <Text>Welcome to {siteConfig.name}!</Text>

      <Text>Please click the magic link below to sign in to your account.</Text>

      <EmailButton href={url}>Sign in to {siteConfig.name}</EmailButton>

      <Text>or copy and paste this URL into your browser:</Text>

      <Text className="max-w-sm flex-wrap break-words font-medium leading-snug">
        {url}
      </Text>
    </EmailWrapper>
  );
};
