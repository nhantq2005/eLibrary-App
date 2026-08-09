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
        overflow: 'hidden'
    },
    cardHeader: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 15, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F8F9FA',
    },
    reqId: { fontSize: 13, fontWeight: 'bold', color: '#495057' },
    
    statusBadgePending: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF3E0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
    statusTextPending: { fontSize: 11, color: '#F57C00', fontWeight: '600' },
    
    statusBadgeActive: { backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
    statusTextActive: { fontSize: 11, color: '#388E3C', fontWeight: '600' },

    statusBadgeOverdue: { backgroundColor: '#FFEBEE', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
    statusTextOverdue: { fontSize: 11, color: '#D32F2F', fontWeight: '600' },

    cardBody: { padding: 15 },
    infoRow: { fontSize: 14, color: '#212529', marginBottom: 6 },
    label: { color: '#6C757D' },
    activeDateText: { color: '#388E3C', fontWeight: '600' },
    overdueDateText: { color: '#D32F2F', fontWeight: '600' },

    cardFooter: {
        flexDirection: 'row', padding: 15, paddingTop: 0, justifyContent: 'space-between'
    },
    cardFooterSingle: {
         flexDirection: 'row', padding: 15, paddingTop: 0,
    },
    actionBtn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        paddingVertical: 10, borderRadius: 8, flex: 0.48
    },
    rejectBtn: { backgroundColor: '#FFEBEE' },
    rejectBtnText: { color: '#D32F2F', fontWeight: '600', fontSize: 14 },
    acceptBtn: { backgroundColor: '#1976D2' },
    acceptBtnText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
    returnBtn: { backgroundColor: '#388E3C', flex: 1 },
    remindBtn: { backgroundColor: '#FFF3E0', flex: 1 },
    remindBtnText: { color: '#F57C00', fontWeight: '600', fontSize: 14 },
});