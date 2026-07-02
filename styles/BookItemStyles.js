// import { Dimensions, StyleSheet } from "react-native";

// const screenWidth = Dimensions.get('window').width;
// const cardWidth = (screenWidth - 30) / 2;

// export const styles = StyleSheet.create({
//     container: {
//         padding: 6,
//     },
//     card: {
//         padding: 8,
//         margin: 6,
//         borderRadius: 12,
//         elevation: 3,
//         width: cardWidth,
//         minHeight: 300,
//         backgroundColor: '#fff',
//     },
//     cover: {
//         height: 140,
//         borderRadius: 8,
//     },
//     content: {
//         marginTop: 8,
//         alignItems: 'flex-start',
//     },
//     title: {
//         fontWeight: '600',
//         textAlign: 'left',
//     },
//     author: {
//         color: '#666',
//         marginTop: 6,
//     },
//     price: {
//         marginTop: 6,
//         fontWeight: '700',
//         color: '#1a73e8'
//     }
// });

import { Dimensions, StyleSheet, Platform } from "react-native";

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 40) / 2;

export const styles = StyleSheet.create({
    container: {
        padding: 6,
    },
    card: {
        width: cardWidth,
        height: 290,
        borderRadius: 16,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 5,
        marginVertical: 6,
        overflow: 'hidden',
    },
    cover: {
        height: 170, 
        backgroundColor: '#f3f4f6',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    content: {
        paddingHorizontal: 12,
        paddingTop: 10,
        paddingBottom: 12,
        height: 120, // 290 (card) - 170 (cover) = 120
        justifyContent: 'space-between',
    },
    title: {
        fontWeight: 'bold',
        color: '#2C3338', 
        lineHeight: 22,
        fontSize: 15,
        marginBottom: 2,
    },
    author: {
        color: '#5A6570',
        fontSize: 12,
        fontStyle: 'italic',
    },
    priceContainer: {
        marginTop: 'auto',
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#F3F0E9',
    },
    price: {
        fontWeight: 'bold',
        color: '#1E3A5F',
        fontSize: 15,
    }
});