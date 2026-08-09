import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MoreVertical, Phone, Send, Image as ImageIcon, Paperclip } from 'lucide-react-native';

const Message = ({ navigation, route }) => {
    const chat = route?.params?.chat || { name: 'Người dùng', isOnline: true };
    const [messageText, setMessageText] = useState('');

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color="#212529" />
                </TouchableOpacity>
                
                <View style={styles.headerUserInfo}>
                    <View style={styles.avatarContainer}>
                         <Image source={{ uri: chat.avatar }} style={styles.headerAvatar} />
                         {chat.isOnline && <View style={styles.onlineIndicator} />}
                    </View>
                    <View>
                        <Text style={styles.headerName}>{chat.name}</Text>
                        <Text style={styles.headerStatus}>{chat.isOnline ? 'Đang hoạt động' : 'Hoạt động 5 phút trước'}</Text>
                    </View>
                </View>

                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Phone size={20} color="#1976D2" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <MoreVertical size={20} color="#495057" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Chat Area */}
            <KeyboardAvoidingView 
                style={styles.chatArea} 
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    contentContainerStyle={styles.messageList}
                >
                    <Text style={styles.dateSeparator}>Hôm nay</Text>

                    {messages.map((msg) => (
                        <View key={msg.id} style={[styles.messageWrapper, msg.isMe ? styles.messageWrapperMe : styles.messageWrapperOther]}>
                            {!msg.isMe && (
                                <Image source={{ uri: chat.avatar || 'https://via.placeholder.com/40' }} style={styles.messageAvatar} />
                            )}
                            <View style={[styles.messageBubble, msg.isMe ? styles.messageBubbleMe : styles.messageBubbleOther]}>
                                <Text style={[styles.messageText, msg.isMe ? styles.messageTextMe : styles.messageTextOther]}>
                                    {msg.text}
                                </Text>
                                <Text style={[styles.messageTime, msg.isMe ? styles.messageTimeMe : styles.messageTimeOther]}>
                                    {msg.time}
                                </Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* Input Area */}
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.attachButton}>
                        <Paperclip size={20} color="#6C757D" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.attachButton}>
                        <ImageIcon size={20} color="#6C757D" />
                    </TouchableOpacity>
                    
                    <View style={styles.textInputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Nhắn tin..."
                            value={messageText}
                            onChangeText={setMessageText}
                            multiline
                            maxLength={500}
                        />
                    </View>
                    
                    {messageText.trim().length > 0 ? (
                        <TouchableOpacity style={styles.sendButton}>
                            <Send size={18} color="#FFFFFF" style={{marginLeft: 2}}/>
                        </TouchableOpacity>
                    ) : (
                        <View style={[styles.sendButton, {backgroundColor: '#E9ECEF'}]}>
                            <Send size={18} color="#ADB5BD" style={{marginLeft: 2}}/>
                        </View>
                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    backButton: {
        padding: 5,
        marginRight: 5,
    },
    headerUserInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 10,
    },
    headerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E9ECEF',
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#4CAF50',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    headerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212529',
    },
    headerStatus: {
        fontSize: 12,
        color: '#6C757D',
    },
    headerActions: {
        flexDirection: 'row',
    },
    iconButton: {
        padding: 8,
        marginLeft: 5,
    },
    chatArea: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    messageList: {
        padding: 15,
        paddingBottom: 20,
    },
    dateSeparator: {
        textAlign: 'center',
        fontSize: 12,
        color: '#ADB5BD',
        marginVertical: 15,
        fontWeight: '500',
    },
    messageWrapper: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'flex-end',
    },
    messageWrapperMe: {
        justifyContent: 'flex-end',
    },
    messageWrapperOther: {
        justifyContent: 'flex-start',
    },
    messageAvatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        marginRight: 8,
    },
    messageBubble: {
        maxWidth: '75%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
    },
    messageBubbleMe: {
        backgroundColor: '#1976D2',
        borderBottomRightRadius: 4,
    },
    messageBubbleOther: {
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: '#F1F3F5',
    },
    messageText: {
        fontSize: 15,
        lineHeight: 22,
    },
    messageTextMe: {
        color: '#FFFFFF',
    },
    messageTextOther: {
        color: '#212529',
    },
    messageTime: {
        fontSize: 11,
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    messageTimeMe: {
        color: 'rgba(255,255,255,0.7)',
    },
    messageTimeOther: {
        color: '#ADB5BD',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    attachButton: {
        padding: 10,
    },
    textInputWrapper: {
        flex: 1,
        backgroundColor: '#F1F3F5',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginHorizontal: 5,
        minHeight: 40,
        maxHeight: 100,
        justifyContent: 'center',
    },
    textInput: {
        fontSize: 15,
        color: '#212529',
        paddingTop: 0,
        paddingBottom: 0,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1976D2',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2,
    },
});

export default Message;
