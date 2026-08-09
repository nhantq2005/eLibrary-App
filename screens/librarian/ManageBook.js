import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus, Filter, MoreVertical, Edit2, Trash2 } from 'lucide-react-native';
import Apis, { authApis, endpoints } from '../../utils/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManageBook = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState([]);

    const loadBooks = async () => {
        try {
            let url = endpoints['documents'];
            if (searchQuery.trim() !== '') {
                url += `?kw=${searchQuery.trim()}`;
            }
            const res = await Apis.get(url);
            setBooks(res.data);
        } catch (error) {
            console.error('Lỗi tải dữ liệu:', error);
        }
    }

    const deleteBook = async (bookId) => {
        try {
            Alert.alert(
                "Xác nhận xóa",
                "Bạn có chắc chắn muốn xóa sách này không?",
                [
                    {
                        text: "Hủy",
                        style: "cancel"
                    },
                    {
                        text: "Xóa",
                        style: "destructive",
                        onPress: async () => {
                            try {
                                const token = await AsyncStorage.getItem('token');
                                const res = await authApis(token).delete(endpoints['delete-document'](bookId));
                                if (res.status === 204) {
                                    setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
                                }
                            } catch (error) {
                                console.error('Lỗi xóa sách:', error);
                            }
                        }
                    }
                ]
            );
        } catch (error) {
            console.error('Lỗi xóa sách:', error);
        }
    }

    useEffect(() => {
        loadBooks();
    }, [searchQuery]);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Quản lý sách</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('EditBook', { isNew: true })}>
                    <Plus size={20} color="#FFFFFF" />
                    <Text style={styles.addButtonText}>Thêm mới</Text>
                </TouchableOpacity>
            </View>

            {/* Search and Filter */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Search size={20} color="#6C757D" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tìm kiếm theo tên sách, tác giả..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity style={styles.filterButton}>
                    <Filter size={20} color="#1976D2" />
                </TouchableOpacity>
            </View>

            {/* Book List */}
            <FlatList
                data={books}
                keyExtractor={(book, index) => book?.id?.toString() || index.toString()}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item: book }) => {
                    if (!book) return null;
                    const safeCategory = book.category?.name || 'Chưa phân loại';
                    const safeTitle = typeof book.title === 'object' && book.title !== null ? (book.title.title || book.title.name) : book.title;
                    const authorsStr = Array.isArray(book.authors) ? book.authors.map(a => a.name).join(', ') : 'Không rõ tác giả';
                    const priceFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.price || 0);
                    
                    return (
                        <View key={book.id} style={styles.bookCard}>
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: book.image || 'https://via.placeholder.com/90x130' }} style={styles.bookImage} />
                                {book.isPremium && (
                                    <View style={styles.premiumBadge}>
                                        <Text style={styles.premiumText}>PREMIUM</Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.bookInfo}>
                                <View style={styles.titleRow}>
                                    <Text style={styles.bookTitle} numberOfLines={2}>{safeTitle}</Text>
                                    <Text style={styles.viewCountText}>👁 {book.viewCount || 0}</Text>
                                </View>
                                <Text style={styles.bookAuthor} numberOfLines={1}>{authorsStr}</Text>
                                <View style={styles.tagsContainer}>
                                    <View style={styles.categoryBadge}>
                                        <Text style={styles.categoryText}>{safeCategory}</Text>
                                    </View>
                                    <Text style={styles.priceText}>{priceFormatted}</Text>
                                </View>
                                <View style={styles.bottomInfo}>
                                    <View style={styles.stockInfo}>
                                        <Text style={styles.stockText}>Kho: <Text style={styles.stockValue}>{book.quantity || 0}</Text></Text>
                                        <Text style={styles.stockText}>Có sẵn: <Text style={[styles.stockValue, { color: '#388E3C' }]}>{book.available !== undefined ? book.available : (book.quantity || 0)}</Text></Text>
                                    </View>
                                    <View style={styles.actionContainer}>
                                        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#E3F2FD' }]} onPress={() => navigation.navigate('EditBook', { book })}>
                                            <Edit2 size={16} color="#1976D2" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FFEBEE', marginLeft: 8 }]} onPress={() => deleteBook(book.id)}>
                                            <Trash2 size={16} color="#D32F2F" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                }}
            />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#212529',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1976D2',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        marginLeft: 4,
        fontSize: 14,
    },
    searchContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F3F5',
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 44,
        marginRight: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#212529',
    },
    filterButton: {
        width: 44,
        height: 44,
        backgroundColor: '#E3F2FD',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    bookCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 14,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },
    imageContainer: {
        position: 'relative',
    },
    bookImage: {
        width: 85,
        height: 120,
        borderRadius: 10,
        backgroundColor: '#E9ECEF',
    },
    premiumBadge: {
        position: 'absolute',
        top: 6,
        left: -4,
        backgroundColor: '#FFC107',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    premiumText: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#212529',
    },
    bookInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'space-between',
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    bookTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 4,
        lineHeight: 22,
    },
    viewCountText: {
        fontSize: 12,
        color: '#94A3B8',
        marginLeft: 8,
        marginTop: 2,
    },
    bookAuthor: {
        fontSize: 13,
        color: '#64748B',
        marginBottom: 8,
    },
    tagsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    categoryBadge: {
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    categoryText: {
        fontSize: 11,
        color: '#475569',
        fontWeight: '600',
    },
    priceText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#E11D48',
    },
    bottomInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    stockInfo: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    stockText: {
        fontSize: 12,
        color: '#64748B',
        marginRight: 10,
    },
    stockValue: {
        fontWeight: '700',
        color: '#334155',
    },
    actionContainer: {
        flexDirection: 'row',
    },
    actionButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ManageBook;