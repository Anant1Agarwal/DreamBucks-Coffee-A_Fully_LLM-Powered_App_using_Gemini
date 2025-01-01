import { StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import PageHeader from '@/components/PageHeader'
import { useCart } from '@/components/CartContext';
import { MessageInterface } from '@/Object_Types/types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MessageList from '@/components/MessageList';

const ChatRoom = () => {
  const {addToCart, emptyCart} = useCart();
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const textRef = useRef('')
  const inputRef = useRef<TextInput>(null); 
  
  useEffect(() => {
  }, [messages]);

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {

        // Add the user message to the list of messages
        let InputMessages = [...messages, { parts:message, role: 'user' }];

        setMessages(InputMessages);
        textRef.current = ''
        if(inputRef) inputRef?.current?.clear(); // Clear the input field
       
        setIsTyping(true)
        // let resposnseMessage = await callChatBotAPI(InputMessages);
        await new Promise(resolve => setTimeout(resolve, 5000));
        setMessages([...InputMessages, { parts: 'Hi,I am a Bot typing...', role: 'assistant' }]);

        setIsTyping(false)
        // setMessages(prevMessages => [...prevMessages, resposnseMessage]);
        
        // if (resposnseMessage) {
        //     if (resposnseMessage.memory ) {
        //         if (resposnseMessage.memory.order) {
        //             emptyCart()
        //             resposnseMessage.memory.order.forEach((item: any) => {
        //             addToCart(item.item, item.quantity)
        //             });
        //         }
        //     }
        // }
        

    } catch(err:any ) {
        // Alert.alert('Message', err.message)
    }

  }
  return (
    <GestureHandlerRootView>
      <PageHeader title="Service ChatBot" showHeaderRight={false} bgColor='#F9F9F9'/>
   
      <View className='flex-1 justify-between bg-neutral-100 overflow-visible'>
        <View className='flex-1'>
<MessageList messages={messages} isTyping={isTyping}/>

        </View>
        <View className='flex-row mx-3 mb-3 justify-between border p-2 bg-white border-neutral-300 rounded-3xl pl-5'>
          <TextInput ref={inputRef} placeholder='Type a message...'    style={{fontSize: hp(2)}} className='flex-1 mr-2' onChangeText={value => textRef.current = value}/>
          <TouchableOpacity 
                        onPress = {handleSendMessage}
                        className='bg-white p-2 mr-[4px] rounded-full'
                    >
                        <FontAwesome name="send" size={hp(2.7)} color="#5AAE8A" />
                    </TouchableOpacity>
        </View>
       
      </View>
    </GestureHandlerRootView>
  )
}

export default ChatRoom

