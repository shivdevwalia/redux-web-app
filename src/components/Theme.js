import { extendTheme } from "@chakra-ui/react";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";
const Theme = extendTheme({
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },
});

export default Theme;
