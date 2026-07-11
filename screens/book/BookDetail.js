import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, Animated, Easing, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star, BookOpen, ShoppingCart, Heart, Languages, BookOpenCheck, BookPlus, ShoppingBasket } from 'lucide-react-native';
const { width } = Dimensions.get('window');
import { useNavigation, useRoute } from '@react-navigation/native';
import Apis, { endpoints } from '../../utils/Apis';
import { MyBorrowCartContext, MyBuyCartContext, MyUserContext } from '../../utils/MyContexts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookDetail = () => {
    const [user,] = useContext(MyUserContext);
    const [borrowCart, borrowDispatch] = useContext(MyBorrowCartContext);
    const [buyCart, buyDispatch] = useContext(MyBuyCartContext);
    const [isFavorite, setIsFavorite] = useState(false);
    const [flyingCart, setFlyingCart] = useState(null);
    const [book, setBook] = useState(null);
    const route = useRoute();
    const id = route?.params?.id;
    const nav = useNavigation();
    const basketIconRef = useRef(null);
    const borrowButtonRef = useRef(null);
    const buyButtonRef = useRef(null);
    const flightAnim = useRef(new Animated.Value(0)).current;
    const flightTimerRef = useRef(null);

    const animateCartToBasket = (sourceRef, iconName = 'ShoppingBasket') => {
        if (!sourceRef?.current || !basketIconRef.current) {
            return;
        }

        sourceRef.current.measureInWindow((startX, startY, startWidth, startHeight) => {
            basketIconRef.current.measureInWindow((endX, endY, endWidth, endHeight) => {
                const fromX = startX + startWidth / 2 - 16;
                const fromY = startY + startHeight / 2 - 16;
                const toX = endX + endWidth / 2 - 16;
                const toY = endY + endHeight / 2 - 16;

                if (flightTimerRef.current) {
                    clearTimeout(flightTimerRef.current);
                }

                setFlyingCart({ iconName, fromX, fromY, toX, toY });
                flightAnim.setValue(0);

                Animated.timing(flightAnim, {
                    toValue: 1,
                    duration: 650,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }).start(() => {
                    setFlyingCart(null);
                });

                flightTimerRef.current = setTimeout(() => {
                    setFlyingCart(null);
                }, 800);
            });
        });
    };

    const loadBook = async (bookId) => {
        try {
            const res = await Apis.get(endpoints['document-detail'](bookId));
            setBook(res.data);
        } catch (error) {
            console.error("Failed to load book details:", error);
        }
    };

    const addBorrowCart = async (book) => {
        let currentCart = { ...borrowCart };

        if (!(book.id in currentCart)) {
            currentCart[book.id] = {
                'id': book.id,
                'name': book.title,
                'author': book.authors?.map(a => a.name).join(', ') || 'Đang cập nhật',
                'image': book.image,
                'price': book.price,
                'quantity': 1
            }
        }

        borrowDispatch({
            type: "UPDATE",
            payload: currentCart
        });
        animateCartToBasket(borrowButtonRef, 'ShoppingBasket');
        console.log("Updated Borrow Cart:", currentCart);
    }

    const addBuyCart = async (book) => {
        let currentCart = { ...buyCart };

        if (book.id in currentCart) {
            currentCart[book.id]['quantity']++;
        } else {
            currentCart[book.id] = {
                'id': book.id,
                'name': book.title,
                'author': book.authors?.map(a => a.name).join(', ') || 'Đang cập nhật',
                'image': book.image,
                'price': book.price,
                'quantity': 1
            }
        }
        
        buyDispatch({
            type: "UPDATE",
            payload: currentCart
        });
        animateCartToBasket(buyButtonRef, 'ShoppingBasket');
        console.log("Updated Buy Cart:", currentCart);
    }

    useEffect(() => {
        return () => {
            if (flightTimerRef.current) {
                clearTimeout(flightTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (id) {
            loadBook(id);
        }
    }, [id]);

    if (!book) {
        return (
            <SafeAreaView style={styles.container} edges={['top']}>
                <Text style={{ textAlign: 'center', marginTop: 20 }}>Đang tải...</Text>
            </SafeAreaView>
        );
    }

    const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(book.price);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton} onPress={() => nav.goBack()}>
                    <ArrowLeft size={24} color="#2C3338" />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => setIsFavorite(!isFavorite)}>
                        <Heart size={24} color={isFavorite ? "#B3261E" : "#2C3338"} fill={isFavorite ? "#B3261E" : "transparent"} />
                    </TouchableOpacity>
                    <TouchableOpacity ref={basketIconRef} style={styles.iconButton} onPress={() => addBorrowCart(book)}>
                        <ShoppingBasket size={24} color="#1E3A5F" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.coverContainer}>
                    <Image source={{ uri: book.image }} style={styles.coverImage} />
                </View>

                <View style={styles.titleSection}>
                    <Text style={styles.title}>{book.title}</Text>
                    <Text style={styles.author}>{book.authors?.map(a => a.name).join(', ') || 'Đang cập nhật'}</Text>
                    <Text style={styles.price}>{formattedPrice}</Text>
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Star size={22} color="#B8860B" fill="#B8860B" />
                        <Text style={styles.statValue}>{book.viewCount || 0}</Text>
                        <Text style={styles.statLabel}>Lượt xem</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.statItem}>
                        <BookOpen size={22} color="#1E3A5F" />
                        <Text style={styles.statValue}>{book.quantity || 0}</Text>
                        <Text style={styles.statLabel}>Có sẵn</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.statItem}>
                        <BookOpenCheck size={22} color="#1E3A5F" />
                        <Text style={styles.statValue}>{book.publishYear}</Text>
                        <Text style={styles.statLabel}>Năm XB</Text>
                    </View>
                </View>

                {/* Description */}
                <View style={styles.descSection}>
                    <Text style={styles.sectionTitle}>Giới thiệu nội dung</Text>
                    <Text style={styles.descriptionText}>{book.description}</Text>
                </View>
            </ScrollView>

            {/* Bottom Action Bar */}
            <View style={styles.bottomBar}>
                <TouchableOpacity ref={borrowButtonRef} style={styles.cartButton} onPress={() => addBorrowCart(book)}>
                    <BookPlus size={24} color="#1E3A5F" />
                </TouchableOpacity>
                <TouchableOpacity ref={buyButtonRef} style={styles.buyButton} onPress={() => addBuyCart(book)}>
                    <ShoppingCart size={24} color="#ffffff" style={{ marginRight: 8 }} />
                    <Text style={styles.buyButtonText}>Mua sách ngay</Text>
                </TouchableOpacity>
            </View>

            {flyingCart ? (
                <Animated.View
                    pointerEvents="none"
                    style={[
                        styles.flyingCart,
                        {
                            left: flyingCart.fromX,
                            top: flyingCart.fromY,
                            opacity: flightAnim.interpolate({
                                inputRange: [0, 0.7, 1],
                                outputRange: [1, 1, 0],
                            }),
                            transform: [
                                {
                                    translateX: flightAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, flyingCart.toX - flyingCart.fromX],
                                    }),
                                },
                                {
                                    translateY: flightAnim.interpolate({
                                        inputRange: [0, 0.5, 1],
                                        outputRange: [0, -110, flyingCart.toY - flyingCart.fromY],
                                    }),
                                },
                                {
                                    scale: flightAnim.interpolate({
                                        inputRange: [0, 0.8, 1],
                                        outputRange: [1, 1.08, 0.45],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <View style={styles.flyingCartBubble}>
                        <ShoppingBasket size={18} color="#FFFFFF" />
                    </View>
                </Animated.View>
            ) : null}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFBF7',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    scrollContent: {
        paddingBottom: 120, // Để chừa chỗ cho Bottom Bar
    },
    coverContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 24,
    },
    coverImage: {
        width: width * 0.52,
        height: width * 0.75,
        borderRadius: 16,
        backgroundColor: '#F3F0E9',
    },
    titleSection: {
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: '900',
        color: '#1E3A5F',
        textAlign: 'center',
        marginBottom: 8,
        lineHeight: 34,
    },
    author: {
        fontSize: 16,
        color: '#5A6570',
        fontStyle: 'italic',
        marginBottom: 12,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#B8860B', // Vàng đồng nổi bật
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 24,
        borderRadius: 16,
        paddingVertical: 18,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 1,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#2C3338',
        marginTop: 6,
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 12,
        color: '#5A6570',
    },
    divider: {
        width: 1,
        backgroundColor: '#F3F0E9',
    },
    descSection: {
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E3A5F',
        marginBottom: 12,
    },
    descriptionText: {
        fontSize: 15,
        color: '#5A6570',
        lineHeight: 24,
        textAlign: 'justify',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 32, // Padding cho tai thỏ dưới của iPhone
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 10,
    },
    cartButton: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: '#F3F0E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    buyButton: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#1E3A5F',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#1E3A5F',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    buyButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    flyingCart: {
        position: 'absolute',
        zIndex: 999,
        elevation: 20,
    },
    flyingCartBubble: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#1E3A5F',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 6,
        elevation: 6,
    },
});

export default BookDetail;
