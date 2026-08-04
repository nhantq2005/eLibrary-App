import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, CheckCircle, XCircle, Clock } from 'lucide-react-native';

const ManageBorrow = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('pending'); // 'pending', 'active', 'overdue'

    const borrowRequests = [
        { id: 'BR001', userName: 'Nguyễn Văn A', bookTitle: 'Lập trình Spring Boot', date: '02/07/2026', status: 'pending' },
        { id: 'BR002', userName: 'Trần Thị B', bookTitle: 'Clean Code', date: '01/07/2026', status: 'pending' },
    ];

    const activeBorrows = [
        { id: 'BR003', userName: 'Lê Văn C', bookTitle: 'Đắc Nhân Tâm', dueDate: '15/07/2026', status: 'active' },
    ];

    const overdueBorrows = [
        { id: 'BR004', userName: 'Phạm Thị D', bookTitle: 'Nhà Giả Kim', dueDate: '30/06/2026', status: 'overdue', daysOverdue: 2 },
    ];

    const renderTabs = () => (
        <View style={styles.tabsContainer}>
            <TouchableOpacity 
                style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
                onPress={() => setActiveTab('pending')}
            >
                <Text style={[styles.tabText, activeTab === 'pending' && styles.activeTabText]}>Chờ duyệt (2)</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.tab, activeTab === 'active' && styles.activeTab]}
                onPress={() => setActiveTab('active')}
            >
                <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>Đang mượn</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.tab, activeTab === 'overdue' && styles.activeTab]}
                onPress={() => setActiveTab('overdue')}
            >
                <Text style={[styles.tabText, activeTab === 'overdue' && styles.activeTabText]}>Quá hạn (1)</Text>
            </TouchableOpacity>
        </View>
    );

    const renderPendingList = () => (
        <View>
            {borrowRequests.map(item => (
                <View key={item.id} style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.reqId}>Mã: {item.id}</Text>
                        <View style={styles.statusBadgePending}>
                            <Clock size={12} color="#F57C00" style={{marginRight: 4}}/>
                            <Text style={styles.statusTextPending}>Chờ duyệt</Text>
                        </View>
                    </View>
                    <View style={styles.cardBody}>
                        <Text style={styles.infoRow}><Text style={styles.label}>Độc giả: </Text>{item.userName}</Text>
                        <Text style={styles.infoRow}><Text style={styles.label}>Sách: </Text>{item.bookTitle}</Text>
                        <Text style={styles.infoRow}><Text style={styles.label}>Ngày tạo: </Text>{item.date}</Text>
                    </View>
                    <View style={styles.cardFooter}>
                        <TouchableOpacity style={[styles.actionBtn, styles.rejectBtn]}>
                            <XCircle size={16} color="#D32F2F" style={{marginRight: 6}} />
                            <Text style={styles.rejectBtnText}>Từ chối</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionBtn, styles.acceptBtn]}>
                            <CheckCircle size={16} color="#FFFFFF" style={{marginRight: 6}} />
                            <Text style={styles.acceptBtnText}>Duyệt mượn</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    );

    const renderActiveList = () => (
        <View>
            {activeBorrows.map(item => (
                <View key={item.id} style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.reqId}>Mã: {item.id}</Text>
                        <View style={styles.statusBadgeActive}>
                            <Text style={styles.statusTextActive}>Đang mượn</Text>
                        </View>
                    </View>
                    <View style={styles.cardBody}>
                        <Text style={styles.infoRow}><Text style={styles.label}>Độc giả: </Text>{item.userName}</Text>
                        <Text style={styles.infoRow}><Text style={styles.label}>Sách: </Text>{item.bookTitle}</Text>
                        <Text style={styles.infoRow}><Text style={styles.label}>Hạn trả: </Text><Text style={styles.activeDateText}>{item.dueDate}</Text></Text>
                    </View>
                    <View style={styles.cardFooterSingle}>
                        <TouchableOpacity style={[styles.actionBtn, styles.returnBtn]}>
                            <CheckCircle size={16} color="#FFFFFF" style={{marginRight: 6}} />
                            <Text style={styles.acceptBtnText}>Xác nhận trả sách</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    );

    const renderOverdueList = () => (
        <View>
            {overdueBorrows.map(item => (
                <View key={item.id} style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.reqId}>Mã: {item.id}</Text>
                        <View style={styles.statusBadgeOverdue}>
                            <Text style={styles.statusTextOverdue}>Quá hạn {item.daysOverdue} ngày</Text>
                        </View>
                    </View>
                    <View style={styles.cardBody}>
                        <Text style={styles.infoRow}><Text style={styles.label}>Độc giả: </Text>{item.userName}</Text>
                        <Text style={styles.infoRow}><Text style={styles.label}>Sách: </Text>{item.bookTitle}</Text>
                        <Text style={styles.infoRow}><Text style={styles.label}>Hạn trả: </Text><Text style={styles.overdueDateText}>{item.dueDate}</Text></Text>
                    </View>
                    <View style={styles.cardFooterSingle}>
                         <TouchableOpacity style={[styles.actionBtn, styles.remindBtn]}>
                            <Text style={styles.remindBtnText}>Gửi nhắc nhở</Text>
                        </TouchableOpacity>
                        <View style={{width: 10}}/>
                        <TouchableOpacity style={[styles.actionBtn, styles.returnBtn, {flex: 1}]}>
                            <Text style={styles.acceptBtnText}>Xác nhận trả</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Quản lý mượn sách</Text>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Search size={20} color="#6C757D" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tìm theo tên độc giả, mã..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {renderTabs()}

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
                {activeTab === 'pending' && renderPendingList()}
                {activeTab === 'active' && renderActiveList()}
                {activeTab === 'overdue' && renderOverdueList()}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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

export default ManageBorrow;
