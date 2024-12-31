import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Product } from "../../Object_Types/types";
import { fetchProducts } from "@/services/Product_Services";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();

        setProducts(productsData);
        console.log(productsData)
      } catch (error) {
        console.log("errors in loading products");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);
 


  if(loading) {return <Text>Loading...</Text>}

  return (
    <GestureHandlerRootView>
    <SafeAreaView>
      <Text>home</Text>
      </SafeAreaView>
      </GestureHandlerRootView>
  );
};

export default home;


