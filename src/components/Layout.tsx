// components
import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";

// config
import config from "../config";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <Box>
      <Navbar />
      <Box backgroundColor="gray.100" p="4" ml={config.navbarWidth}>
        {children}
      </Box>
    </Box>
  );
}
