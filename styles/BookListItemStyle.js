import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 12,
        alignItems: 'center',
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        width: '100%',
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    imageContainer: {
        width: 85,
        height: 125,
        marginRight: 15,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
        backgroundColor: '#e9ecef', // placeholder color
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        height: 120, // Match image height for alignment
        paddingVertical: 2,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    infoContainer: {
        flex: 1,
        marginRight: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 6,
        lineHeight: 22,
    },
    author: {
        fontSize: 14,
        color: '#7f8c8d',
        fontWeight: '500',
    },
    bookmarkButton: {
        padding: 4,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2980b9', // Highlight color
    },
    freeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#27ae60', // Green for free
    },
    readButton: {
        backgroundColor: '#edf2f7',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
    },
    readButtonText: {
        color: '#2980b9',
        fontWeight: '600',
        fontSize: 13,
    }
});