import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, getCartItems, updateCart } from "../redux/actions";
import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  Image,
  Text,
  HStack,
} from "@chakra-ui/react";

function Cart() {
  const dispatch = useDispatch();

  const loadingUpdateCart = useSelector((state) => state.loadingUpdateCart);
  const loadingDeleteCart = useSelector((state) => state.loadingDeleteCart);
  const cartItems = useSelector((state) => state.cartItems);

  const decrement = (c) => {
    if (c.quantity > 1) {
      dispatch(updateCart(c.id, { quantity: c.quantity - 1 }));
    }
  };
  const increment = (c) => {
    dispatch(updateCart(c.id, { quantity: c.quantity + 1 }));
  };

  const handleDelete = (c) => {
    dispatch(deleteFromCart(c.id));
  };

  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  if (cartItems.length === 0) {
    return (
      <Center minH="60vh" p={4}>
        <Heading size="xl" textAlign="center">
          Your cart is empty.
        </Heading>
      </Center>
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
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(auto-fill, minmax(250px, 1fr))",
        }}
        gap={6}
      >
        {cartItems.map((c) => (
          <Box
            key={c.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            bg="white"
            boxShadow="sm"
            display="flex"
            flexDirection="column"
            alignItems="center"
            height="100%" // ensures all cards have same height
          >
            <Image
              src={c.image}
              alt={c.title}
              boxSize="150px"
              objectFit="contain"
              mb={4}
            />
            <Heading size="md" textAlign="center" mb={2}>
              {c.title}
            </Heading>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              ${c.price.toFixed(2)}
            </Text>
            <Text
              fontSize="sm"
              color="gray.600"
              textAlign="center"
              mb={4}
              noOfLines={3}
            >
              {c.description}
            </Text>

            <HStack spacing={3} mb={4}>
              <Button
                onClick={() => decrement(c)}
                disabled={
                  loadingUpdateCart || loadingDeleteCart || c.quantity <= 1
                }
                size="sm"
              >
                -
              </Button>
              <Text fontWeight="bold" minW="24px" textAlign="center">
                {c.quantity}
              </Text>
              <Button
                onClick={() => increment(c)}
                disabled={loadingUpdateCart || loadingDeleteCart}
                size="sm"
              >
                +
              </Button>
            </HStack>

            {/* Push Remove button to bottom */}
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => handleDelete(c)}
              isDisabled={loadingUpdateCart || loadingDeleteCart}
              mt="auto" // this pushes button to bottom of the card
              aria-label={`Remove ${c.title} from cart`}
            >
              Remove
            </Button>
          </Box>
        ))}
      </Grid>

      <Box mt={10}>
        <Text
          fontWeight="bold"
          fontSize={{ base: "lg", md: "xl" }}
          textAlign="center"
        >
          Total: ${totalCost.toFixed(2)}
        </Text>
      </Box>
    </Box>
  );
}

export default Cart;
