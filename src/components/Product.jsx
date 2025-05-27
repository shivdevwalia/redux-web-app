// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, getProducts, updateCart } from "../redux/actions";
// import { Button } from "@chakra-ui/react";
// function Product() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getProducts());
//   }, [dispatch]);

//   const products = useSelector((state) => state.products);
//   const loading = useSelector((state) => state.loadingProducts);
//   const error = useSelector((state) => state.errorProducts);
//   const loadingAddToCart = useSelector((state) => state.loadingAddToCart);
//   const cartItems = useSelector((state) => state.cartItems);
//   const errorAddToCart = useSelector((state) => state.errorAddToCart);

//   const handleAddToCart = (product) => {
//     const existing = cartItems.find(
//       (item) => String(item.id) === String(product.id)
//     );
//     if (existing) {
//       dispatch(updateCart(product.id, { quantity: existing.quantity + 1 }));
//     } else {
//       dispatch(addToCart(product));
//     }
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: 50 }}>
//         Loading products...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{ textAlign: "center", marginTop: 50, color: "red" }}>
//         Error: {error}
//       </div>
//     );
//   }
//   return (
//     <div
//       style={{
//         maxWidth: 1000,
//         margin: "auto",
//         padding: 20,
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
//         gap: 20,
//       }}
//     >
//       {errorAddToCart && (
//         <div style={{ color: "red", textAlign: "center", marginBottom: 20 }}>
//           Error adding to cart: {errorAddToCart}
//         </div>
//       )}
//       {products.map((p) => (
//         <div
//           key={p.id}
//           style={{
//             border: "1px solid #ddd",
//             borderRadius: 8,
//             padding: 16,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//             backgroundColor: "#fff",
//           }}
//         >
//           <img
//             src={p.image}
//             alt={p.title}
//             style={{
//               width: 150,
//               height: 150,
//               objectFit: "contain",
//               marginBottom: 12,
//             }}
//           />
//           <h1 style={{ fontSize: 18, textAlign: "center", marginBottom: 8 }}>
//             {p.title}
//           </h1>
//           <p style={{ fontWeight: "bold", marginBottom: 8 }}>
//             ${p.price.toFixed(2)}
//           </p>
//           <p style={{ fontSize: 14, color: "#555", textAlign: "center" }}>
//             {p.description}
//           </p>
//           <Button
//             onClick={() => handleAddToCart(p)}
//             disabled={loadingAddToCart}
//           >
//             {" "}
//             {loadingAddToCart ? "Adding..." : "Add to Cart"}
//           </Button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Product;
import React, { useEffect } from "react";
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
} from "@chakra-ui/react";

function Product() {
  const dispatch = useDispatch();

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
    }
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
            <Text fontSize="sm" color="gray.600" textAlign="center" mb={4}>
              {p.description}
            </Text>
            <Button
              colorScheme="teal"
              onClick={() => handleAddToCart(p)}
              isLoading={loadingAddToCart}
              width="full"
              mt="auto" // this pushes the button to the bottom
            >
              Add to Cart
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Product;
