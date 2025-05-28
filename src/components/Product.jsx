import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getProducts, updateCart } from "../redux/actions";
import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  Alert,
  AlertIcon,
  Center,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

function Product() {
  const dispatch = useDispatch();
  // const [msg, setMsg] = useState("");

  // useEffect(() => {
  //   if (msg) {
  //     const timer = setTimeout(() => setMsg(""), 2000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [msg]);
  const toast = useToast();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.products);
  const loading = useSelector((state) => state.loadingProducts);
  const error = useSelector((state) => state.errorProducts);
  const loadingAddToCart = useSelector((state) => state.loadingAddToCart);
  const cartItems = useSelector((state) => state.cartItems);
  const errorAddToCart = useSelector((state) => state.errorAddToCart);

  const handleAddToCart = (product) => {
    const existing = cartItems.find(
      (item) => String(item.id) === String(product.id)
    );
    if (existing) {
      dispatch(updateCart(product.id, { quantity: existing.quantity + 1 }));
    } else {
      dispatch(addToCart(product));

      toast({
        title: "Added to cart!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleInfoClick = (product) => {
    setSelectedProduct(product); // save product to state
    onOpen(); // open modal
  };
  const handleClose = () => {
    onClose();
    setSelectedProduct(null);
  };
  if (loading) {
    return (
      <Center mt={12}>
        <Spinner size="xl" />
        <Text ml={4}>Loading products...</Text>
      </Center>
    );
  }

  if (error) {
    return (
      <Alert status="error" mt={12} justifyContent="center">
        <AlertIcon />
        Error: {error}
      </Alert>
    );
  }

  return (
    <Box
      maxW="7xl"
      mx="auto"
      px={6}
      py={10}
      bgGradient="linear(to-b, white, gray.100)"
      minH="100vh"
    >
      {errorAddToCart && (
        <Alert status="error" mb={6} justifyContent="center">
          <AlertIcon />
          Error adding to cart: {errorAddToCart}
        </Alert>
      )}
      {/* {msg && (
        <Alert status="success" mb={6} justifyContent="center">
          <AlertIcon></AlertIcon>
          {msg}
        </Alert>
      )} */}
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
        {products.map((p) => (
          <Box
            key={p.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="sm"
            bg="white"
            p={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            _hover={{ boxShadow: "md" }}
            height="100%" // important to make all cards equal height
          >
            <Image
              src={p.image}
              alt={p.title}
              boxSize="150px"
              objectFit="contain"
              mb={4}
            />
            <Heading size="md" textAlign="center" mb={2}>
              {p.title}
            </Heading>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              ${p.price.toFixed(2)}
            </Text>
            <Box mt="auto" width="100%">
              <Button
                leftIcon={<InfoOutlineIcon />}
                width="full"
                mb={2}
                onClick={() => handleInfoClick(p)}
              >
                Info
              </Button>

              <Button
                colorScheme="teal"
                onClick={() => handleAddToCart(p)}
                isLoading={loadingAddToCart}
                width="full"
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedProduct?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{selectedProduct?.description}</ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Product;
