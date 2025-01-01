import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ProductList from "@/components/CartProductList";
import { Product } from "@/Object_Types/types";
import { useCart } from "@/components/CartContext";
import { fetchProducts } from "@/services/Product_Services";
const orderDetails = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { cartItems, setQuantityinCart, emptyCart } = useCart();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productData = await fetchProducts();
        setProducts(productData);
      } catch (e) {
        console.log("Error in loading products at cart page");
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <GestureHandlerRootView className="h-full w-full bg-[#F9F9F9]">
      <PageHeader
        title="Order Details"
        showHeaderRight={false}
        bgColor="#F9F9F9"
      />
      <View className="h-full flex-col justify-between">
        <View className="h-[80%] ">
          <ProductList products={products} quantities={cartItems} setQuantities={setQuantityinCart} totalPrice={totalPrice} />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default orderDetails;
