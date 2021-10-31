import { Box, Grid } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";

// components
import Navbar from "./Navbar";

export default function Layout({
  children,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <Grid w="100vw" h="100vh" templateRows="1fr" templateColumns="250px 1fr">
      <Navbar />
      <Box backgroundColor="gray.100" p="4" height="100vh" overflow="scroll">
          {children}
      </Box>
    </Grid>
  );
}
