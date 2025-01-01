import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
interface DetailsHeaderProps {
    image_url: string;
    name: string;
    rating: number;
    type: string;   
}


const DetailsHeader = ({image_url,name,rating,type}: DetailsHeaderProps) => {
  return (
  <>
  <Image 
  source={{uri:image_url}} className='w-full h-[14rem] rounded-2xl mt-3'/>
  <View>
    <Text className='text-[#242424] text-2xl ml-3 mt-4 font-[Sora-SemiBold]'>{name}</Text>
    <View className='flex-row w-full justify-between '>
        <Text className='text-[#A2A2A2] text-sm font-[Sora-Regular] ml-3 mt-1 mb-5'>{type}</Text>
        <View className='flex-row mt-2 '>
            <View className='bg-[#F5F5F5] p-2 rounded-xl mr-2'>
                <MaterialIcons name="delivery-dining" size={27} color="#5AAE8A" />
            </View>
            {/* <View className='bg-[#F5F5F5] p-2 rounded-xl mr-2'>
            <Feather name="coffee" size={27} color="#5AAE8A" />
            </View> */}
            <View className='bg-[#F5F5F5] p-2 rounded-xl mr-2'>
            <FontAwesome name="coffee" size={27} color="#5AAE8A" />
            </View>
          
            <View className='bg-[#F5F5F5] p-2 rounded-xl mr-2'>
            <MaterialCommunityIcons name="food-variant" size={27} color="#5AAE8A" />
            </View>
          
        </View>
        
    </View>
    <View className='flex-row pl-2 mt-[2px] '>
    <AntDesign name="star" size={23} color="#FBBE21" />
<Text className='pl-2 text-xl  font-[Sora-SemiBold] text-[#A2A2A2]'>{rating}</Text>
    </View>
    <View className='w-full items-center'>
        <View className='w-[90%] border-b-2 border-[#E3E3E3] my-4'/>
    </View>
  </View>
  </>
  )
}

export default DetailsHeader

