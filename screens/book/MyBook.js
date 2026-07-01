import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Apis, { endpoints } from "../../utils/Apis";
import Spacer from "../../components/Spacer";
import BookListItem from "../../components/BookListItem";

const MyBook = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    

    const loadBooks = async () => {
        try {
            // Giả sử bạn có một API để lấy danh sách sách của người dùng
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View style={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#f1f2f6' }}> 
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2d3436' }}>
                    Sách của tôi
                </Text>
                <Text style={{ fontSize: 14, color: '#636e72', marginTop: 4 }}>
                    Quản lý danh sách các sách bạn đã lưu và đang đọc
                </Text>
            </View>
            
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, color: '#b2bec3' }}>Đang tải dữ liệu...</Text>
                </View>
            ) : (
                <FlatList
                    data={books}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <BookListItem book={item} />
                    )}
                    contentContainerStyle={{ padding: 16, paddingBottom: 30 }}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={{ alignItems: 'center', marginTop: 40 }}>
                            <Text style={{ fontSize: 16, color: '#b2bec3', fontStyle: 'italic' }}>Không có sách nào.</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    )
}

export default MyBook;
