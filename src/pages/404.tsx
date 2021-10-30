import { Box, Center, Heading } from "@chakra-ui/react";

export default function Custom404() {
  return (
    <Center h="100%">
      <Box textAlign="center">
        <Heading pb="3">Not Found</Heading>
        <p>The requested page could not be found.</p>
      </Box>
    </Center>
  );
}

// page title
Custom404.title = "Not Found";
