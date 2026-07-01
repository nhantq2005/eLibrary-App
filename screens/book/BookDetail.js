import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star, BookOpen, ShoppingCart, Heart, Languages, BookOpenCheck } from 'lucide-react-native';

const { width } = Dimensions.get('window');
import { useNavigation, useRoute } from '@react-navigation/native';
import Apis, { endpoints } from '../../utils/Apis';

const BookDetail = () => {
    // In a real app, book data would come from route.params or an API
    const [isFavorite, setIsFavorite] = useState(false);
    const [book, setBook] = useState(null);
    const route = useRoute();
    const id = route?.params?.id;
    const nav = useNavigation();

    const loadBook = async (bookId) => {
        try {
            const res = await Apis.get(endpoints['document-detail'](bookId));
            setBook(res.data);
        } catch (error) {
            console.error("Failed to load book details:", error);
        }   
    };

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
                <TouchableOpacity style={styles.iconButton} onPress={() => setIsFavorite(!isFavorite)}>
                    <Heart size={24} color={isFavorite ? "#B3261E" : "#2C3338"} fill={isFavorite ? "#B3261E" : "transparent"} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Book Cover Area */}
                <View style={styles.coverContainer}>
                    <Image source={{ uri: book.image }} style={styles.coverImage} />
                </View>

                {/* Title & Author */}
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
                <TouchableOpacity style={styles.cartButton}>
                    <ShoppingCart size={24} color="#1E3A5F" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.buyButtonText}>Mua sách ngay</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFBF7', // Màu nền thư viện
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
});

export default BookDetail;
