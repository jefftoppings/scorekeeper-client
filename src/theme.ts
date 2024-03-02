import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      dark: "#27374D",
      primary: "#526D82",
      secondary: "#9DB2BF",
      accent: "#DDE6ED",
      error: "#ff3333",
    },
  },
  fonts: {},
  components: {},
});

export default theme;
