import { Text, View } from 'react-native'
import DeliveryToggle from './DeliveryToggle'
import React from 'react'

const OrdersHeader = () => {
  return (
    <View>
        <DeliveryToggle />

        <Text
        className=" mx-7 mt-7 text-[#242424] text-lg font-[Sora-SemiBold]"
        >
        Delivery Address
        </Text>
        <Text
        className=" mx-7 mt-3 text-[#242424] text-base font-[Sora-SemiBold] mb-2"
        >
    House 95/50, Agarwal Niwas
        </Text>
        <Text
        className=" mx-7 text-[#A2A2A2] text-xs font-[Sora-SemiBold] mb-1"
        >
       Vasant Kunj, New Delhi, India
        </Text>

        {/* <View className="mx-12 border-b-1 border-gray-400 my-4 " /> */}
          <View className='w-full items-center'>
                <View className='w-[90%] border-b-2 border-[#E3E3E3] my-4'/>
            </View>
    </View>
  )
}

export default OrdersHeader
