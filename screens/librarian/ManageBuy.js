import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, CheckCircle, XCircle, ShoppingBag } from 'lucide-react-native';

const ManageBuy = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('pending'); // 'pending', 'completed', 'cancelled'

    const buyRequests = [
        { id: 'OD001', userName: 'Hoàng Văn E', bookTitle: 'React Native thực chiến', quantity: 1, price: '250.000đ', date: '02/07/2026', status: 'pending' },
        { id: 'OD002', userName: 'Lý Tiểu Long', bookTitle: 'Design Patterns', quantity: 2, price: '600.000đ', date: '01/07/2026', status: 'pending' },
    ];

    const completedOrders = [
        { id: 'OD003', userName: 'Trương Vô Kỵ', bookTitle: 'Kiến trúc phần mềm', quantity: 1, price: '350.000đ', date: '25/06/2026', status: 'completed' },
    ];

    const renderTabs = () => (
        <View style={styles.tabsContainer}>
            <TouchableOpacity 
                style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
                onPress={() => setActiveTab('pending')}
            >
                <Text style={[styles.tabText, activeTab === 'pending' && styles.activeTabText]}>Chờ xử lý (2)</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
                onPress={() => setActiveTab('completed')}
            >
                <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>Hoàn thành</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.tab, activeTab === 'cancelled' && styles.activeTab]}
                onPress={() => setActiveTab('cancelled')}
            >
                <Text style={[styles.tabText, activeTab === 'cancelled' && styles.activeTabText]}>Đã hủy</Text>
            </TouchableOpacity>
        </View>
    );

    const renderList = (data, type) => (
        <View>
            {data.map(item => (
                <View key={item.id} style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <ShoppingBag size={16} color="#495057" style={{marginRight: 6}} />
                            <Text style={styles.reqId}>Đơn: {item.id}</Text>
                        </View>
                        <Text style={styles.dateText}>{item.date}</Text>
                    </View>
                    
                    <View style={styles.cardBody}>
                        <Text style={styles.infoRow}><Text style={styles.label}>Khách hàng: </Text>{item.userName}</Text>
                        <Text style={styles.infoRow}><Text style={styles.label}>Sản phẩm: </Text>{item.bookTitle} (x{item.quantity})</Text>
                        <View style={styles.priceRow}>
                            <Text style={styles.label}>Tổng tiền: </Text>
                            <Text style={styles.priceText}>{item.price}</Text>
                        </View>
                    </View>
                    
                    {type === 'pending' && (
                        <View style={styles.cardFooter}>
                            <TouchableOpacity style={[styles.actionBtn, styles.rejectBtn]}>
                                <XCircle size={16} color="#D32F2F" style={{marginRight: 6}} />
                                <Text style={styles.rejectBtnText}>Hủy đơn</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.actionBtn, styles.acceptBtn]}>
                                <CheckCircle size={16} color="#FFFFFF" style={{marginRight: 6}} />
                                <Text style={styles.acceptBtnText}>Xác nhận & Giao</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    
                    {type === 'completed' && ( 
                         <View style={[styles.cardFooter, {justifyContent: 'flex-end', paddingTop: 0}]}>
                            <View style={styles.statusBadgeCompleted}>
                                <Text style={styles.statusTextCompleted}>Đã hoàn thành</Text>
                            </View>
                         </View>
                    )}
                </View>
            ))}
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Quản lý đơn mua sách</Text>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Search size={20} color="#6C757D" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tìm theo tên khách, mã đơn..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {renderTabs()}

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
                {activeTab === 'pending' && renderList(buyRequests, 'pending')}
                {activeTab === 'completed' && renderList(completedOrders, 'completed')}
                {activeTab === 'cancelled' && renderList([], 'cancelled')}
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

export default ManageBuy;
