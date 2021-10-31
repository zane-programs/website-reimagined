// components
import { Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Heading as="h1" pb="2">
        Hello! I&apos;m Zane.
      </Heading>
      <Text>I&apos;m a software developer and student in Los Angeles.</Text>
    </>
  );
}

// page title
Home.title = "Home";
