import { FlatList, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Apis, { endpoints } from "../../utils/Apis";
import { useContext, useEffect, useState } from "react";
import OutlineTextInput from "../../components/OutlineTextInput";
import { Search, Space } from "lucide-react-native";
import TagItem from "../../components/TagItem";
import ChipItem from "../../components/ChipItem";
import { Text, TextInput } from "react-native-paper";
import { styles } from "../../styles/LoginStyles";
import BookCardItem from "../../components/BookCardItem";
import Spacer from "../../components/Spacer";
import BookListItem from "../../components/BookListItem";
import { MyUserContext } from "../../utils/MyContexts";

const Home = () => {
    const [user,] = useContext(MyUserContext);
    const [books, setBooks] = useState([]);
    const [latestBooks, setLatestBooks] = useState([]);
    const [trendBooks, setTrendBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [kw, setKw] = useState('');
    const [cateId, setCateId] = useState(null);

    const loadBooks = async () => {
        try {
            let url = `${endpoints['documents']}?page=1`;
            if (kw) url += `&kw=${kw}`;
            if (cateId) url += `&cateId=${cateId}`;

            const res = await Apis.get(url);
            console.log("Books fetched:", res.data);
            if (res && res.data) {
                setBooks(res.data);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadTrendBooks = async () => {
        setLoading(true);
        try {
            const res = await Apis.get(endpoints['trend-documents']);
            console.log("Trend Books fetched:", res.data);
            if (res && res.data) {
                setTrendBooks(res.data);
            }
        } catch (error) {
            console.error("Error fetching trend books:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadLatestBooks = async () => {
        setLoading(true);
        try {
            const res = await Apis.get(endpoints['latest-documents']);
            console.log("Latest Books fetched:", res.data);
            if (res && res.data) {
                setLatestBooks(res.data);
            }
        } catch (error) {
            console.error("Error fetching latest books:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadCategories = async () => {
        try {
            const res = await Apis.get(endpoints['categories']);
            console.log("Categories fetched:", res.data);
            if (res && res.data) {
                setCategories(res.data);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        loadLatestBooks();
        loadTrendBooks();
        loadCategories();
    }, []);

    useEffect(() => {
        loadBooks();
    }, [cateId]);

    useEffect(() => {
        setTimeout(() => {
            loadBooks();
        }, 300); // Thêm độ trễ 300ms trước khi gọi loadBooks để tránh gọi quá nhiều lần khi người dùng gõ

        return () => clearTimeout(); // Hủy timeout khi component unmount hoặc kw thay đổi
    }, [kw]);

    return (
        // Sử dụng edges để bỏ padding bottom của SafeArea (Tab bar đã tự xử lý)
        <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, paddingTop: 10, backgroundColor: '#FDFBF7' }}>

            {/* Bọc thanh tìm kiếm trong View để giữ padding 10px */}
            <View style={{ paddingHorizontal: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, marginTop: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/elib_logo.png')}
                            style={{ width: 44, height: 44, marginRight: 12, borderRadius: 22 }}
                        />
                        <View>
                            <Text style={{ fontSize: 14, color: '#636e72', marginBottom: 2 }}>Chào {user?.name || 'bạn'} 👋</Text>
                            <Text style={{ fontSize: 22, fontWeight: '900', color: '#1E3A5F', letterSpacing: 0.5 }}>eLibrary</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Image
                            source={{ uri: user?.avatar }}
                            style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#f1f2f6' }}
                        />
                    </TouchableOpacity>
                </View>


                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <OutlineTextInput
                        placeholder="Search books..."
                        value={kw}
                        onChangeText={(text) => setKw(text)}
                        style={{ flex: 1, height: 50 }}
                    />
                    <TouchableOpacity
                        style={{
                            marginLeft: 12,
                            backgroundColor: '#1E3A5F', // Màu xanh Navy học thuật
                            borderRadius: 14, // Bo góc vừa phải
                            width: 50,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: '#1E3A5F',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 8,
                            elevation: 4, // Đổ bóng cho Android
                        }}
                        activeOpacity={0.8}
                    >
                        <Search size={22} color="#ffffff" />
                    </TouchableOpacity>
                </View>
            </View>


            {!kw ? (
                <FlatList
                    data={books}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <BookCardItem book={item} />}
                    numColumns={2}
                    onRefresh={loadBooks}
                    refreshing={loading}
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: 10 }}
                    contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 60 }}
                    ListHeaderComponent={
                        <View style={{ marginHorizontal: -10 }}>
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, paddingHorizontal: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: '800', color: '#2d3436' }}>
                                        Sách mới nhất
                                    </Text>
                                    <TouchableOpacity>
                                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E3A5F' }}>Xem tất cả</Text>
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    data={latestBooks}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => <BookCardItem book={item} />}
                                    horizontal={true}
                                    alwaysBounceVertical={false}
                                    bounces={false}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ paddingHorizontal: 10 }}
                                />
                            </View>

                            <View style={{ marginTop: 15 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, paddingHorizontal: 10, marginTop: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: '800', color: '#2d3436' }}>
                                        Sách thịnh hành
                                    </Text>
                                </View>
                                <View style={{ paddingHorizontal: 10 }}>
                                    {trendBooks.map(item => (
                                        <BookListItem key={item.id.toString()} book={item} />
                                    ))}
                                </View>
                            </View>

                            <FlatList
                                data={categories}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <ChipItem
                                        label={item.name}
                                        onPress={() => setCateId(item.id)}
                                        isSelected={cateId === item.id}
                                    />
                                )}
                                horizontal={true}
                                alwaysBounceVertical={false}
                                bounces={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 15 }}
                            />
                        </View>
                    }
                />
            ) : (
                <View style={{ paddingHorizontal: 10 }}>
                    <Text variant="titleLarge" style={{ fontWeight: '700', marginBottom: 6 }}>
                        Search Results
                    </Text>
                    <FlatList
                        data={books}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <BookListItem book={item} />}
                        onRefresh={loadBooks}
                        numColumns={1}
                        refreshing={loading}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 80 }}
                        scrollEnabled={true}
                    />
                </View>
            )}
        </SafeAreaView>
    );
}

export default Home;