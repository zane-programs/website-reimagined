import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "'Epilogue', sans-serif",
    body: "'Inter', sans-serif",
  },
  components: {
    Link: {
      baseStyle: {
        color: "blue.400",
      },
    },
  },
});

export default theme;
