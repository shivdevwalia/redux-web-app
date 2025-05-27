import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink as RouterLink } from "react-router-dom";

const Links = [
  { label: "Products", path: "/" },
  { label: "Cart", path: "/cart" },
];

const NavLink = ({ label, path }) => (
  <Box
    as={RouterLink}
    to={path}
    px={2}
    py={1}
    rounded="md"
    fontWeight="medium"
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    _activeLink={{
      fontWeight: "bold",
      color: "teal.500",
    }}
  >
    {label}
  </Box>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link.path} label={link.label} path={link.path} />
            ))}
          </HStack>
        </HStack>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.path} label={link.label} path={link.path} />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
