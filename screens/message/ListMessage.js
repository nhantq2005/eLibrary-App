import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Edit } from 'lucide-react-native';

const ListMessage = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const unreadCount = conversations.reduce((acc, curr) => acc + curr.unread, 0);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Tin nhắn</Text>
                    {unreadCount > 0 && <Text style={styles.headerSubtitle}>{unreadCount} tin nhắn chưa đọc</Text>}
                </View>
                <TouchableOpacity style={styles.composeButton}>
                    <Edit size={20} color="#1976D2" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Search size={20} color="#6C757D" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tìm kiếm tin nhắn..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* List Conversations */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
                {conversations.map((chat) => (
                    <TouchableOpacity 
                        key={chat.id} 
                        style={styles.chatCard}
                        onPress={() => navigation.navigate('Message', { chat })}
                    >
                        <View style={styles.avatarContainer}>
                            <Image source={{ uri: chat.avatar }} style={styles.avatar} />
                            {chat.isOnline && <View style={styles.onlineIndicator} />}
                        </View>
                        
                        <View style={styles.chatInfo}>
                            <View style={styles.chatHeader}>
                                <Text style={[styles.chatName, chat.unread > 0 && styles.unreadText]}>{chat.name}</Text>
                                <Text style={[styles.chatTime, chat.unread > 0 && styles.unreadTime]}>{chat.time}</Text>
                            </View>
                            
                            <View style={styles.chatFooter}>
                                <Text 
                                    style={[styles.lastMessage, chat.unread > 0 && styles.unreadText]} 
                                    numberOfLines={1}
                                >
                                    {chat.lastMessage}
                                </Text>
                                {chat.unread > 0 && (
                                    <View style={styles.unreadBadge}>
                                        <Text style={styles.unreadBadgeText}>{chat.unread}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#212529',
    },
    headerSubtitle: {
        fontSize: 13,
        color: '#6C757D',
        marginTop: 2,
    },
    composeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        paddingHorizontal: 20,
        paddingBottom: 15,
        backgroundColor: '#FFFFFF',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F3F5',
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 44,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#212529',
    },
    listContainer: {
        paddingTop: 10,
        paddingBottom: 40,
    },
    chatCard: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 12,
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 15,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#E9ECEF',
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#4CAF50',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    chatInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    chatName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#212529',
    },
    chatTime: {
        fontSize: 12,
        color: '#ADB5BD',
    },
    chatFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastMessage: {
        flex: 1,
        fontSize: 14,
        color: '#6C757D',
        marginRight: 10,
    },
    unreadText: {
        fontWeight: 'bold',
        color: '#212529',
    },
    unreadTime: {
        color: '#1976D2',
        fontWeight: '600',
    },
    unreadBadge: {
        backgroundColor: '#1976D2',
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unreadBadgeText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: 'bold',
    },
});

export default ListMessage;