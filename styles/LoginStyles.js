import { StyleSheet } from 'react-native';
import { Theme } from './Theme';

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        padding: 20,
        backgroundColor: Theme.colors.surface, // Add padding to the bottom to avoid content being cut off
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        // padding: 20,
    },
    logo: {
        // marginRight: 10,
        color: Theme.colors.primary,
        width: 64,
        height: 64,
        resizeMode: 'contain',
    },
    logoText: {
        fontSize: 25,
        fontWeight: '700',
        color: Theme.colors.primary,
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: '700',
        marginVertical: 10,
        color: Theme.colors.primary,
    },
    subtitle: {
        fontSize: 16,
        color: Theme.colors.onSurfaceVariant,
        marginBottom: 12,
    },
    outlineTextInput: {
        backgroundColor: 'transparent',
        marginBottom: 16,
    },
    button: {
        marginTop: 12,
        // height: 46,
        backgroundColor: Theme.colors.primary,
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.2,
        textTransform: 'none',
    },
    outlineButton: {
        marginTop: 12,
        borderColor: Theme.colors.outline,
    },
    outlineButtonLabel: {
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'none',
    },
    spacer: {
        height: 10,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    linkText: {
        color: Theme.colors.primary,
        fontWeight: '800',
    },
    bookItem: {
        marginHorizontal: 16,
        marginVertical: 10,
        borderRadius: 22,
    },
    bookCard: {
        borderRadius: 22,
        overflow: 'hidden',
        backgroundColor: Theme.colors.surface,
    },
    bookCover: {
        height: 220,
        backgroundColor: Theme.colors.surfaceVariant,
    },
    bookContent: {
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 16,
        gap: 8,
    },
    bookTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bookCategory: {
        fontSize: 12,
        fontWeight: '700',
        color: Theme.colors.primary,
        backgroundColor: '#EAF2FF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        overflow: 'hidden',
    },
    bookMeta: {
        fontSize: 12,
        color: Theme.colors.onSurfaceVariant,
        fontWeight: '600',
    },
    bookTitle: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '800',
        color: Theme.colors.onSurface,
    },
    bookAuthor: {
        fontSize: 13,
        fontWeight: '600',
        color: Theme.colors.primary,
    },
    bookDescription: {
        fontSize: 13,
        lineHeight: 19,
        color: Theme.colors.onSurfaceVariant,
    },
    avatarContainer: {
        alignSelf: 'center',
        marginVertical: 15,
        position: 'relative',
        shadowColor: Theme.colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    avatarBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Theme.colors.primary,
        borderRadius: 16,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Theme.colors.surface,
    }
});
