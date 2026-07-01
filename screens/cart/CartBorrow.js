import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Trash2 } from 'lucide-react-native';

const dummyBorrowData = [
    {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        image: 'https://picsum.photos/200/300?random=1',
        duration: '14 ngày',
    },
    {
        id: '2',
        title: 'Nhà Giả Kim',
        author: 'Paulo Coelho',
        image: 'https://picsum.photos/200/300?random=2',
        duration: '7 ngày',
    }
];

const CartBorrow = () => {
    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.itemInfo}>
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.author} numberOfLines={1}>{item.author}</Text>
                <View style={styles.durationBadge}>
                    <Text style={styles.durationText}>Thời hạn: 14 ngày</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.deleteButton}>
                <Trash2 size={20} color="#e74c3c" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList 
                data={dummyBorrowData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
            
            <View style={styles.footer}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Tổng số sách:</Text>
                    <Text style={styles.summaryValue}>{dummyBorrowData.length} cuốn</Text>
                </View>
                <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.8}>
                    <Text style={styles.checkoutButtonText}>Xác nhận mượn sách</Text>
                </TouchableOpacity>
            </View>
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
        paddingBottom: 90, // Account for BottomTabBar
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

export default CartBorrow;
