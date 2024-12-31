import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Product, ProductCategory } from "../../Object_Types/types";
import { fetchProducts } from "@/services/Product_Services";
import {
  FlatList,
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import SearchArea from "@/components/SearchArea";
import Banner from "@/components/Banner";

const home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    []
  );
  const [shownProducts, setShownProducts] = useState<Product[]>([]);

  useEffect(() => {
    const uniqueCategories = Array.from(productCategories).map((category) => ({
      id: category.id,
      selected: selectedCategory === category.id,
    }));
    setProductCategories(uniqueCategories);

    if(selectedCategory === "All") {
      setShownProducts(products);
    }else{
      const filteredProducts = products.filter((product) => product.category === selectedCategory);
      setShownProducts(filteredProducts);
    }


  }, [selectedCategory]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        const categories = productsData.map((product) => product.category);
        categories.unshift("All");

        const uniqueCategories = Array.from(new Set(categories)).map(
          (category) => ({
            id: category,
            selected: selectedCategory === category,
          })
        );

        setProductCategories(uniqueCategories);
        setShownProducts(productsData);

        setProducts(productsData);
        console.log(productsData);
      } catch (error) {
        console.log("errors in loading products");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full w-full ">
        <FlatList
          horizontal={false}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginLeft: 15,
            marginRight: 15,
          }}
          numColumns={2}
          data={shownProducts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="w-[48%] m-2 bg-[white] rounded-2xl p-2 flex justify-between">
              <TouchableOpacity>
                <Image
                  className="w-full h-32 rounded-2xl"
                  source={{ uri: item.image_url }}
                />

                <Text className="text-[#242424] text-lg font-[Sora-SemiBold] ml-1 mt-2">
                  {item.name}
                </Text>
                <Text className="text-[#A2A2A2] text-sm font-[Sora-Regular] ml-1 mt-2">
                  {item.category}
                </Text>
              </TouchableOpacity>
              <View className="flex-row justify-between ml-1 mt-4 mb-2">
                <Text className="text-[#050505] text-xl font-[Sora-SemiBold] ">
                  ${item.price}
                </Text>
                <TouchableOpacity>
                  <View className="mr-2 p-2 -mt-2 bg-app_green_color rounded-xl">
                    <Feather name="plus-circle" size={20} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListHeaderComponent={() => (
            <View className="flex">
              <SearchArea />
              <Banner />
              <View className="flex items-center">
                <FlatList
                  className="mt-6 w-[90%] mb-2"
                  data={productCategories}
                  horizontal={true}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => setSelectedCategory(item.id)}
                    >
                      <Text
                        className={`text-sm mr-4 font-[Sora-Regular] p-3 rounded-lg  ${
                          item.selected ? "text-white" : "text-[#313131]"
                        } ${
                          item.selected
                            ? "bg-app_green_color"
                            : "bg-app_light_green_color"
                        }`}
                      >
                        {item.id}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default home;
