import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ProductList from "@/components/CartProductList";
import { Product } from "@/Object_Types/types";
import { useCart } from "@/components/CartContext";
import { fetchProducts } from "@/services/Product_Services";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

const orderDetails = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { cartItems, setQuantityinCart, emptyCart } = useCart();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculateTotal = (
    products: Product[],
    quantities: { [key: string]: number }
  ) :number=> {
    return products.reduce((total, product) => {
      const quantity = quantities[product.name] || 0;
      return total + product.price * quantity;
    }, 0);
  };

  useEffect(() => {
    const total = calculateTotal(products, cartItems);
    setTotalPrice(total);
  }, [cartItems, products]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productData = await fetchProducts();
        setProducts(productData);

        const total = calculateTotal(products, cartItems);
        setTotalPrice(total);
        
      } catch (e) {
        console.log("Error in loading products at cart page");
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return <Text>Loading...</Text>;
 

  const orderNow = () => {
    emptyCart();
     Toast.show({
      
                type: 'success',
                text1: (`Order Placed Successfully`),
                text2: 'Your order will be delivered soon',
              });
   router.push("/thankyou");
  };

  return (
    <GestureHandlerRootView className="h-full w-full bg-[#F9F9F9]">
      <PageHeader
        title="Order Details"
        showHeaderRight={false}
        bgColor="#F9F9F9"
      />
      <View className="flex-1">
        <View className="h-full flex-col justify-between">
          <View className="h-[100%]">
            <ProductList
              products={products}
              quantities={cartItems}
              setQuantities={setQuantityinCart}
              totalPrice={totalPrice}
            />
          </View>
        </View>
      </View>
      <View className="bg-app_light_green_color rounded-tl-3xl rounded-tr-3xl px-7 pt-4 pb-4">
        <View className="flex-row justify-between items-center ">
          <View className="flex-row items-center">
            <Entypo name="wallet" size={32} color="#5AAE8A" />
            <View>
              <Text className="text-[#242424] text-base font-[Sora-SemiBold] ml-3">
                Cash/Wallet
              </Text>
              <Text className="text-app_best_green text-sm font-[Sora-SemiBold] ml-3">
                $ {totalPrice === 0 ? 0 : totalPrice + 1.67}
              </Text>
            </View>
          </View>
          <MaterialIcons name="keyboard-arrow-down" size={27} color="black" />
        </View>
        <TouchableOpacity
        onPress={()=>{orderNow()}}
          disabled={totalPrice === 0}
          className={`${
            totalPrice === 0 ? "bg-app_light_green_color" : "bg-app_best_green"
          } rounded-2xl items-center justify-center mt-5 py-3`}
        >
          <Text  className="text-xl text-white font-[Sora-Regular] ">Order</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

export default orderDetails;
