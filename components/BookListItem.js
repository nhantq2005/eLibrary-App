import { Image, TouchableOpacity, View } from "react-native"
import { Text } from "react-native-paper"
import styles from "../styles/BookListItemStyle"
import { Bookmark } from "lucide-react-native"
import { useNavigation } from '@react-navigation/native'

const BookListItem = ({ book }) => {

    const nav = useNavigation();
    
    const formattedPrice = book.price === 0 ? 'Miễn phí' :
    new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(book.price);

    return (
        <TouchableOpacity onPress={() => nav.navigate('BookDetail', { id: book.id })} activeOpacity={0.7}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: book.image }} style={styles.image} />
                </View>
                
                <View style={styles.contentContainer}>
                    <View style={styles.headerContainer}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
                            <Text style={styles.author} numberOfLines={1}>
                                {book.authors.map((author) => author.name).join(', ')}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.bookmarkButton} onPress={() => console.log("Bookmark pressed")}>
                            <Bookmark size={22} color="#7b96cc" />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.footerContainer}>
                        {book.price ? (
                            <Text style={styles.price}>{formattedPrice}</Text>
                        ) : (
                            <Text style={styles.freeText}>{formattedPrice}</Text>
                        )}
                        <View style={styles.readButton}>
                            <Text style={styles.readButtonText}>Chi tiết</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default BookListItem
