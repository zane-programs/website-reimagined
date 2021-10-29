import { Heading } from "@chakra-ui/react";

export default function Custom404() {
  return (
    <>
      <Heading>Not Found</Heading>
      <p>The requested page cannot be found.</p>
    </>
  );
}

// page title
Custom404.title = "Not Found";
