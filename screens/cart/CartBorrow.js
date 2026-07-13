import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyBorrowCartContext } from '../../utils/MyContexts';
import { normalizeCart } from '../../utils/Utils';
import { authApis, endpoints } from '../../utils/Apis';

const CartBorrow = () => {
    const [borrow, setBorrow] = useContext(MyBorrowCartContext);
    const [borrowCart, setBorrowCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (borrow) {
            setBorrowCart(normalizeCart(borrow));
        }
        setLoading(false);
    }, [borrow]);

    const borrowBooks = async () => {
        if (borrowCart.length === 0) {
            Alert.alert('Thông báo', 'Giỏ mượn đang trống.');
            return;
        }

        try {
            setSubmitting(true);

            const cartData = borrowCart.map(item => ({
                docId: Number(item.id),
                quantity: Number(item.quantity || 1),
            }));

            const token = await AsyncStorage.getItem('token');

            await authApis(token).post(endpoints['borrow'], cartData);

            // Xóa giỏ hàng trong bộ nhớ thiết bị
            // Xóa dữ liệu trên màn hình hiện tại
            setBorrowCart([]);

            // Xóa dữ liệu trong context (Provider sẽ tự động cập nhật AsyncStorage)
            setBorrow({ type: "CLEAR" });

            Alert.alert(
                'Thành công',
                'Mượn sách thành công.'
            );
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.response?.data ||
                'Không thể mượn sách.';

            Alert.alert('Mượn sách thất bại', message);
        } finally {
            setSubmitting(false);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            // Cập nhật context (Provider sẽ tự động đồng bộ xuống AsyncStorage)
            const updatedBorrowObj = { ...borrow };
            delete updatedBorrowObj[itemId];
            setBorrow({ type: "UPDATE", payload: updatedBorrowObj });

            // Cập nhật state nội bộ để re-render danh sách
            const updatedCart = borrowCart.filter(item => item.id !== itemId);
            setBorrowCart(updatedCart);
        } catch (error) {
            console.error('Error removing item from borrow cart:', error);
        }
    }

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.itemInfo}>
                <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.author} numberOfLines={1}>{item.author}</Text>
                <View style={styles.durationBadge}>
                    <Text style={styles.durationText}>Thời hạn: 14 ngày</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => removeFromCart(item.id)}>
                <Trash2 size={20} color="#e74c3c" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
    data={borrowCart}
    keyExtractor={item => item.id.toString()}
    renderItem={renderItem}
    ListEmptyComponent={
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
                Giỏ mượn đang trống
            </Text>
            <Text style={styles.emptyDescription}>
                Hãy thêm sách vào giỏ để thực hiện mượn.
            </Text>
        </View>
    }
/>
            <View style={styles.footer}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Tổng số sách:</Text>
                    <Text style={styles.summaryValue}>{borrowCart.length} cuốn</Text>
                </View>
                <TouchableOpacity
    style={[
        styles.checkoutButton,
        borrowCart.length === 0 && styles.checkoutButtonDisabled
    ]}
    disabled={borrowCart.length === 0 || submitting}
    onPress={borrowBooks}
>
    <Text style={styles.checkoutButtonText}>
        {submitting ? 'Đang xử lý...' : 'Xác nhận mượn sách'}
    </Text>
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
    checkoutButtonDisabled: {
        opacity: 0.5,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    emptyDescription: {
        marginTop: 8,
        fontSize: 14,
        color: '#7f8c8d',
    },
});

export default CartBorrow;
