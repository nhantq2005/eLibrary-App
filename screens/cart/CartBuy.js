import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Trash2, Minus, Plus } from 'lucide-react-native';

const dummyBuyData = [
    {
        id: '1',
        title: 'Sapiens: Lược Sử Loài Người',
        author: 'Yuval Noah Harari',
        image: 'https://picsum.photos/200/300?random=3',
        price: 150000,
        quantity: 1,
    },
    {
        id: '2',
        title: 'Dune - Xứ Cát',
        author: 'Frank Herbert',
        image: 'https://picsum.photos/200/300?random=4',
        price: 220000,
        quantity: 2,
    }
];

const CartBuy = () => {
    
    const renderItem = ({ item }) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(item.price);

        return (
            <View style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.itemInfo}>
                    <View>
                        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                        <Text style={styles.author} numberOfLines={1}>{item.author}</Text>
                        <Text style={styles.price}>{formattedPrice}</Text>
                    </View>
                    
                    <View style={styles.actionRow}>
                        <View style={styles.quantityControl}>
                            <TouchableOpacity style={styles.quantityBtn}>
                                <Minus size={14} color="#7f8c8d" />
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{item.quantity}</Text>
                            <TouchableOpacity style={styles.quantityBtn}>
                                <Plus size={14} color="#7f8c8d" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.deleteButton}>
                            <Trash2 size={18} color="#e74c3c" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    const totalPrice = dummyBuyData.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    const formattedTotal = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(totalPrice);

    return (
        <View style={styles.container}>
            <FlatList 
                data={dummyBuyData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
            
            <View style={styles.footer}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Tổng thanh toán:</Text>
                    <Text style={styles.summaryValue}>{formattedTotal}</Text>
                </View>
                <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.8}>
                    <Text style={styles.checkoutButtonText}>Tiến hành thanh toán</Text>
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
        width: 75,
        height: 110,
        borderRadius: 8,
        backgroundColor: '#e9ecef',
    },
    itemInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'space-between',
        minHeight: 110,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 4,
    },
    author: {
        fontSize: 13,
        color: '#7f8c8d',
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#e74c3c',
        marginBottom: 10,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f3f5',
        borderRadius: 8,
        paddingHorizontal: 4,
        paddingVertical: 2,
    },
    quantityBtn: {
        padding: 8,
    },
    quantityText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2c3e50',
        paddingHorizontal: 12,
    },
    deleteButton: {
        padding: 8,
        backgroundColor: '#fce4e4',
        borderRadius: 8,
    },
    footer: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingBottom: 90, // account for BottomTabBar
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        alignItems: 'center',
    },
    summaryText: {
        fontSize: 16,
        color: '#7f8c8d',
        fontWeight: '500',
    },
    summaryValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#e74c3c',
    },
    checkoutButton: {
        backgroundColor: '#e74c3c',
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: '#e74c3c',
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

export default CartBuy;
