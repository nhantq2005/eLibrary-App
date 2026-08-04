import { TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { styles } from "../styles/BookItemStyles";
import { useNavigation, useRoute } from '@react-navigation/native';

const BookCardItem = ({ book }) => {
    const nav = useNavigation();
    const route = useRoute();
    // Định dạng giá tiền chuẩn VNĐ
    const formattedPrice = book.price === 0 ? 'Miễn phí' :
    new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(book.price);

    return (
        <TouchableOpacity
            onPress={() => nav.navigate("BookDetail", { id: book.id })}
            activeOpacity={0.7}
            style={styles.container}
        >
            {/* Sử dụng mode elevated của React Native Paper */}
            <Card style={styles.card} mode="elevated">
                <Card.Cover style={styles.cover} source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Content style={styles.content}>
                    <View>
                        <Text variant="titleMedium" numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
                            {book.title}
                        </Text>
                        <Text variant="bodyMedium" numberOfLines={1} ellipsizeMode="tail" style={styles.author}>
                            {book.authors.map((author) => author.name).join(', ')}
                        </Text>
                    </View>

                    <View style={styles.priceContainer}>
                        <Text variant="labelLarge" style={styles.price}>
                            {formattedPrice}
                        </Text>
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
}

export default BookCardItem;