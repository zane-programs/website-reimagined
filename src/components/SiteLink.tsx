// components
import { Link, LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";

export default function SiteLink({
  children,
  href,
  ...props
}: React.PropsWithChildren<LinkProps>) {
  return (
    <NextLink href={href} passHref>
      <Link {...props}>{children}</Link>
    </NextLink>
  );
}
