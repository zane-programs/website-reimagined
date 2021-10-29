import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

// components
import Navbar from "./Navbar";

export default function Layout({
  children,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <>
      <Navbar />
      <Box backgroundColor="gray.100" p="3">
        {children}
      </Box>
    </>
  );
}
