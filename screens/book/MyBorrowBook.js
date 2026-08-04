import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyBorrowCartContext } from '../../utils/MyContexts';
import { normalizeCart } from '../../utils/Utils';
import { authApis, endpoints } from '../../utils/Apis';

const MyBorrowBook = () => {
    const [borrowBooks, setBorrowBooks] = useState();
    const [loading, setLoading] = useState(true);

    const loadBorrowedBooks = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await authApis(token).get(endpoints['get-borrow']);
            setBorrowBooks(res.data);
        } catch (error) {
            console.error('Error loading borrowed books:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBorrowedBooks();
    }, []);

    const calDuration = (book) => {
        const endDate = new Date(book.returnDate);
        const duration = Math.ceil((endDate - new Date()) / (1000 * 60 * 60 * 24));
        return duration > 0 ? `${duration} ngày` : 'Hết hạn';
    }

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.itemInfo}>
                <View>
                    <Text style={styles.title} numberOfLines={2}>{item.documentTitle}</Text>
                    <Text style={styles.author} numberOfLines={1}>{item.authorNames}</Text>
                </View>
                <View style={styles.durationBadge}>
                    <Text style={styles.durationText}>Thời hạn: {calDuration(item)}</Text>
                </View>
            </View>
            {/* <TouchableOpacity style={styles.deleteButton}>
                <Trash2 size={20} color="#e74c3c" />
            </TouchableOpacity> */}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={borrowBooks}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    listContainer: {
        padding: 20,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 12,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    image: {
        width: 65,
        height: 95,
        borderRadius: 8,
        backgroundColor: '#e9ecef',
    },
    itemInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',

    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 6,
    },
    author: {
        fontSize: 13,
        color: '#7f8c8d',
        marginBottom: 8,
    },
    durationBadge: {
        backgroundColor: '#e1f5fe',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    durationText: {
        fontSize: 11,
        color: '#0288d1',
        fontWeight: '600',
    },
    deleteButton: {
        padding: 10,
        backgroundColor: '#fce4e4',
        borderRadius: 12,
    },
    footer: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingBottom: 60, // Account for BottomTabBar
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    summaryText: {
        fontSize: 16,
        color: '#7f8c8d',
        fontWeight: '500',
    },
    summaryValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    checkoutButton: {
        backgroundColor: '#2980b9',
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: '#2980b9',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    checkoutButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MyBorrowBook;
