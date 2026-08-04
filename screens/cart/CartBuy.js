import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { Trash2, Minus, Plus } from 'lucide-react-native';
import { MyBuyCartContext } from '../../utils/MyContexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { normalizeCart } from '../../utils/Utils';
import { useNavigation } from '@react-navigation/native';
import { authApis, endpoints } from '../../utils/Apis';

const CartBuy = () => {
    const [buy, setBuy] = useContext(MyBuyCartContext);
    const [buyCart, setBuyCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const nav = useNavigation();

    useEffect(() => {
        if (buy) {
            setBuyCart(normalizeCart(buy));
        }
        setLoading(false);
    }, [buy]);

    const buyBooks = async () => {
        console.log('Buy button pressed');
        if (buyCart.length === 0) {
            Alert.alert('Thông báo', 'Giỏ mua đang trống.');
            return;
        }

        try {
            setSubmitting(true);

            const cartData = buyCart.map(item => ({
                docId: Number(item.id),
                quantity: Number(item.quantity || 1),
            }));

            const token = await AsyncStorage.getItem('token');

            const res = await authApis(token).post(endpoints['buy'], cartData);

            // Xóa giỏ hàng trong bộ nhớ thiết bị
            // Xóa dữ liệu trên màn hình hiện tại
            setBuyCart([]);

            // Xóa dữ liệu trong context (Provider sẽ tự động cập nhật AsyncStorage)
            setBuy({ type: "PAID" });

            Alert.alert(
                'Thành công',
                'Mua sách thành công.'
            );
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.response?.data ||
                'Không thể mua sách.';

            Alert.alert('Mua sách thất bại', message);
        } finally {
            setSubmitting(false);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            // Cập nhật context (Provider sẽ tự động đồng bộ xuống AsyncStorage)
            const updatedBuyObj = { ...buy };
            delete updatedBuyObj[itemId];
            setBuy({ type: "UPDATE", payload: updatedBuyObj });

            // Cập nhật state nội bộ để re-render danh sách
            const updatedCart = buyCart.filter(item => item.id !== itemId);
            setBuyCart(updatedCart);
        } catch (error) {
            console.error('Error removing item from buy cart:', error);
        }
    }

    const renderItem = ({ item }) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(item.price);

        const changeQuantity = (bookId, newQuantity) => {
            if (newQuantity < 1) return;
            const updatedBuyObj = { ...buy };
            if (updatedBuyObj[bookId]) {
                updatedBuyObj[bookId].quantity = newQuantity;
                setBuy({ type: "UPDATE", payload: updatedBuyObj });
            }
        };

        return (
            <TouchableOpacity style={styles.cartItem} onPress={() => { nav.navigate('BookDetail', { bookId: item.id }) }} activeOpacity={0.8}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.itemInfo}>
                    <View>
                        <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
                        <Text style={styles.author} numberOfLines={1}>{item.author}</Text>
                        <Text style={styles.price}>{formattedPrice}</Text>
                    </View>

                    <View style={styles.actionRow}>
                        <View style={styles.quantityControl}>
                            <TouchableOpacity style={styles.quantityBtn} onPress={() => changeQuantity(item.id, item.quantity - 1)}>
                                <Minus size={14} color="#7f8c8d" />
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{item.quantity}</Text>
                            <TouchableOpacity style={styles.quantityBtn} onPress={() => changeQuantity(item.id, item.quantity + 1)}>
                                <Plus size={14} color="#7f8c8d" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => removeFromCart(item.id)}>
                            <Trash2 size={18} color="#e74c3c" />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    // Duplicate effect and loadBuyCart were removed

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center', marginTop: 20 }}>Đang tải...</Text>
            </View>
        );
    }

    const totalPrice = buyCart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    const formattedTotal = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(totalPrice);

    return (
        <View style={styles.container}>
            <FlatList
                data={buyCart}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
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
                    <Text style={styles.summaryText}>Tổng thanh toán:</Text>
                    <Text style={styles.summaryValue}>{formattedTotal}</Text>
                </View>
                <TouchableOpacity
                    style={[
                        styles.checkoutButton,
                        buyCart.length === 0 && styles.checkoutButtonDisabled
                    ]}
                    activeOpacity={0.8}
                    onPress={buyBooks}
                    disabled={buyCart.length === 0 || submitting}
                >
                    <Text style={styles.checkoutButtonText}>{submitting ? 'Đang xử lý...' : 'Tiến hành thanh toán'}</Text>
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
        paddingBottom: 60, // account for BottomTabBar
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

export default CartBuy;
