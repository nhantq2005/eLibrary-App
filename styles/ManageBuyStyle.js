import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: {
        paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#FFFFFF',
        borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
    },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#212529' },
    searchContainer: { paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#FFFFFF' },
    searchBar: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F3F5',
        borderRadius: 10, paddingHorizontal: 15, height: 44,
    },
    searchIcon: { marginRight: 10 },
    searchInput: { flex: 1, fontSize: 14, color: '#212529' },
    
    tabsContainer: {
        flexDirection: 'row', backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
    },
    tab: {
        flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent',
    },
    activeTab: { borderBottomColor: '#1976D2' },
    tabText: { fontSize: 14, color: '#6C757D', fontWeight: '500' },
    activeTabText: { color: '#1976D2', fontWeight: 'bold' },

    listContainer: { padding: 20, paddingBottom: 40 },
    card: {
        backgroundColor: '#FFFFFF', borderRadius: 12, marginBottom: 15,
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05, shadowRadius: 3, elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 15, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F8F9FA',
        backgroundColor: '#FCFCFC', borderTopLeftRadius: 12, borderTopRightRadius: 12,
    },
    reqId: { fontSize: 14, fontWeight: 'bold', color: '#495057' },
    dateText: { fontSize: 12, color: '#ADB5BD' },
    
    cardBody: { padding: 15 },
    infoRow: { fontSize: 14, color: '#212529', marginBottom: 8 },
    label: { color: '#6C757D' },
    
    priceRow: {
        flexDirection: 'row', alignItems: 'center', marginTop: 4,
        paddingTop: 8, borderTopWidth: 1, borderTopColor: '#F1F3F5',
    },
    priceText: { fontSize: 16, fontWeight: 'bold', color: '#D32F2F' },

    cardFooter: {
        flexDirection: 'row', padding: 15, paddingTop: 0, justifyContent: 'space-between'
    },
    actionBtn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        paddingVertical: 10, borderRadius: 8, flex: 0.48
    },
    rejectBtn: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#D32F2F' },
    rejectBtnText: { color: '#D32F2F', fontWeight: '600', fontSize: 14 },
    acceptBtn: { backgroundColor: '#1976D2' },
    acceptBtnText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
    
    statusBadgeCompleted: { backgroundColor: '#E8F5E9', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 4 },
    statusTextCompleted: { fontSize: 12, color: '#388E3C', fontWeight: '600' },
});