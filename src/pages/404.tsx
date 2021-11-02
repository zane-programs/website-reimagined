import { Box, Center, Heading, Text } from "@chakra-ui/react";

export default function Custom404() {
  return (
    <Center h="calc(100vh - 2rem)">
      <Box textAlign="center">
        <Heading pb="3">Not Found</Heading>
        <Text>The requested page could not be found.</Text>
      </Box>
    </Center>
  );
}

// page title
Custom404.title = "Not Found";
