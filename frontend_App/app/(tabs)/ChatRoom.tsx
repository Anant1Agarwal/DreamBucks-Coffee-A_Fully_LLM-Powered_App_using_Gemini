import { StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import PageHeader from '@/components/PageHeader'
import { useCart } from '@/components/CartContext';
import { MessageInterface } from '@/Object_Types/types';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MessageList from '@/components/MessageList';
import { callChatBotAPI } from '@/services/ChatBot';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Keyboard } from 'react-native';
import { KeyboardAvoidingView, Platform } from 'react-native';

const ChatRoom = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const {addToCart, emptyCart} = useCart();
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const textRef = useRef('')
  const inputRef = useRef<TextInput>(null); 
  
    // Automatically scroll when keyboard is shown
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      });
  
      return () => {
        keyboardDidShowListener.remove();
      };
    }, []);

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
        Keyboard.dismiss(); // Close the keyboard

        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true }); // Scroll to bottom
        }, 100);

        setIsTyping(true)
        let responseMessage = await callChatBotAPI(InputMessages);
        await new Promise(resolve => setTimeout(resolve, 5000));
        // setMessages([...InputMessages, { parts: 'Hi,I am a Bot typing...', role: 'assistant' }]);
        setMessages([...InputMessages, responseMessage]);

        setIsTyping(false)
        
        if (responseMessage) {
            if (responseMessage.memory ) {
                if (responseMessage.memory.order) {
                    emptyCart()
                    responseMessage.memory.order.forEach((item: any) => {
                    addToCart(item.item, item.quantity)
                    });
                }
            }
        }
        

    } catch(err:any ) {
        // Alert.alert('Message', err.message)
    }

  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
       {/* <KeyboardAwareScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    keyboardShouldPersistTaps="handled"
    extraScrollHeight={0} // Adjust as needed
    extraHeight={0} 
  > */}
   <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : undefined}
    keyboardVerticalOffset={Platform.OS === "ios" ? 92 : 0} // Adjust offset for your layout
  >
      <PageHeader title="Service ChatBot" showHeaderRight={false} bgColor='#F9F9F9'/>
   
      <View className='flex-1 justify-between bg-neutral-100 overflow-visible'>
        <ScrollView className='flex-1' ref={scrollViewRef} contentContainerStyle={{paddingBottom: hp(1)}} onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
<MessageList messages={messages} isTyping={isTyping}/>

        </ScrollView>
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
      </KeyboardAvoidingView>
       {/* </KeyboardAwareScrollView> */}
    </GestureHandlerRootView>
  )
}

export default ChatRoom

