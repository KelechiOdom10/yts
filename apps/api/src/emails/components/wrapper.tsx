import {
  Body,
  Container,
  type ContainerProps,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Tailwind,
  Text,
} from "@react-email/components";
import { siteConfig } from "@yts/shared";

export type EmailWrapperProps = ContainerProps & {
  to: string;
  subject: string;
  signature?: boolean;
};

export const EmailWrapper = ({
  to,
  subject,
  signature,
  children,
  ...props
}: EmailWrapperProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-background font-sans">
          <Container className="mx-auto w-full max-w-[580px] px-10" {...props}>
            <Link href={siteConfig.url} className="mt-6 mb-2 inline-block">
              <Img
                src={`${siteConfig.url}/logo.svg`}
                alt={`${siteConfig.name} Logo`}
                width="572"
                height="91"
                className="h-6 w-auto"
              />
            </Link>

            <Heading as="h2">{subject}</Heading>

            {children}

            {signature && (
              <Text>
                Best,
                <br />
                {siteConfig.name}
              </Text>
            )}

            <Hr />

            <Text className="text-gray-500 text-xs/normal">
              This email was intended for{" "}
              <span className="text-black">{to}</span>. If you were not
              expecting this email, you can ignore it. If you are concerned
              about your accounts safety, please reply to this email to get in
              touch with us.
            </Text>

            <Text className="text-gray-500 text-xs/normal">
              Any questions? Please feel free to reach us at {siteConfig.email}.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
