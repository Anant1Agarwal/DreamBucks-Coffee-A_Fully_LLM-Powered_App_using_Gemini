import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native';
interface DescriptionSectionProps {
    description: string;

}

const DescriptionSection = ({description}:DescriptionSectionProps) => {

    const [expanded,setExpanded]=useState(false);
  return (
    <View>
      <Text className='text-[#242424] text-lg font-[Sora-SemiBold] ml-3'>Description</Text>
      <View className='p-2'>
<Text className='text-[#A2A2A2] text-sm font-[Sora-Regular] ml-[2px] ' numberOfLines={expanded?undefined:3}>{expanded?description :`${description.slice(0,120)}...}`}</Text>
      <TouchableOpacity onPress={()=>setExpanded(!expanded)}>
        <Text className='text-[#5AAE8A] text-xs font-[Sora-Regular]'>{expanded? "Read less" :"Read more"}</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default DescriptionSection

