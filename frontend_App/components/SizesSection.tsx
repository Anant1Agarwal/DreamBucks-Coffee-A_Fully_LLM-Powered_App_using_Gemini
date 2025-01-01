import { Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react';

const SizesSection = () => {
  const [selectedSize, setSelectedSize] = useState<String>('M');
  const sizes = ['S', 'M', 'L'];

  const handleSelect = (size:String) => {
    setSelectedSize(size);
  };
  
  return (
    <View>
        <Text
            className="text-[#242424] text-lg font-[Sora-SemiBold] ml-3 mt-4"
            >Size
        </Text>

        <View className="flex-row justify-center items-center space-x-4 mt-3 mb-3">
            {sizes.map((size) => (
            <TouchableOpacity
                key={size}
                onPress={() => handleSelect(size)}
                className={`px-4 py-2 rounded-2xl w-[30%] items-center mx-[6px] ${
                selectedSize === size ? 'bg-[#DDF1E9] border-[1.5px] border-app_best_green' : 'bg-white'
                }`}
            >
                <Text className={`font-[Sora-Regular] ${selectedSize === size ? 'text-app_green_color' : 'text-black'}`}>{size}</Text>
            </TouchableOpacity>
            ))}
        </View>
    </View>
  )
}

export default SizesSection