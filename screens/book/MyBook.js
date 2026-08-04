import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Apis, { endpoints } from "../../utils/Apis";
import Spacer from "../../components/Spacer";
import BookListItem from "../../components/BookListItem";
import CartBorrow from "../cart/CartBorrow";
import CartBuy from "../cart/CartBuy";
import { LibraryBig, ShoppingBasket } from "lucide-react-native";
import MyBorrowBook from "./MyBorrowBook";
import MyBuyBook from "./MyBuyBook";

const MyBook = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('borrow');
    

    const loadBooks = async () => {
        try {
            const res = await Apis.get(endpoints['documents']);
            setBooks(res.data);
        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBooks();
    }, []);

    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Sách của tôi</Text>
                <View style={styles.cartIconWrapper}>
                    <LibraryBig size={24} color="#1a1a1a" />
                </View>
            </View>

            {/* Custom Tab Bar */}
            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'borrow' && styles.activeTab]}
                    onPress={() => setActiveTab('borrow')}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.tabText, activeTab === 'borrow' && styles.activeTabText]}>Sách mượn</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'buy' && styles.activeTab]}
                    onPress={() => setActiveTab('buy')}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.tabText, activeTab === 'buy' && styles.activeTabText]}>Sách mua</Text>
                </TouchableOpacity>
            </View>

            {/* Content Component */}
            <View style={styles.content}>
                {activeTab === 'borrow' ? <MyBorrowBook /> : <MyBuyBook />}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 15,
        backgroundColor: '#ffffff',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    cartIconWrapper: {
        position: 'relative',
        padding: 5,
    },
    badge: {
        position: 'absolute',
        top: -2,
        right: -5,
        backgroundColor: '#e74c3c',
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ffffff',
    },
    badgeText: {
        color: '#ffffff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: '#e9ecef',
        borderRadius: 12,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    activeTab: {
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    tabText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#6c757d',
    },
    activeTabText: {
        color: '#2980b9', // Primary brand color
    },
    content: {
        flex: 1,
    }
});


export default MyBook;
