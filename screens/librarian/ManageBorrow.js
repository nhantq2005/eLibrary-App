import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, CheckCircle, XCircle, Clock } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApis, endpoints } from '../../utils/Apis';
import { styles } from '../../styles/ManageBorrowStyle';
import { formatDate } from '../../utils/Utils';

const ManageBorrow = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('PENDING');
    const [borrow, setBorrow] = useState([]);


    const loadBorrow = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await authApis(token).get(`${endpoints['get-borrow']}?status=${activeTab}`);
            console.log('Response from API:', res.data); // Log the response data for debugging
            console.log('Token used for API call:', token); // Log the token for debugging
            if (res.status === 200) {
                setBorrow(res.data);
            }
        } catch (error) {
            console.error('Lỗi khi tải danh sách mượn:', error);
        }
    };

    useEffect(() => {
        loadBorrow();
    }, [activeTab]);

    const updateBorrowStatus = async (borrowId, status) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await authApis(token).put(endpoints['update-borrow-status'](borrowId), status, {
                headers: { 'Content-Type': 'text/plain' }
            });
            console.log('Response from update API:', res.data); // Log the response data for debugging
            if (res.status === 200) {
                
                loadBorrow();
                Alert.alert('Cập nhật trạng thái mượn thành công');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái mượn:', error);
            Alert.alert('Có lỗi xảy ra khi cập nhật trạng thái mượn');
        }
    };


    const renderTabs = () => (
        <View style={styles.tabsContainer}>
            <TouchableOpacity 
                style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
                onPress={() => setActiveTab('PENDING')}
            >
                <Text style={[styles.tabText, activeTab === 'PENDING' && styles.activeTabText]}>Chờ duyệt</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.tab, activeTab === 'BORROWED' && styles.activeTab]}
                onPress={() => setActiveTab('BORROWED')}
            >
                <Text style={[styles.tabText, activeTab === 'BORROWED' && styles.activeTabText]}>Đang mượn</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.tab, activeTab === 'OVERDUE' && styles.activeTab]}
                onPress={() => setActiveTab('OVERDUE')}
            >
                <Text style={[styles.tabText, activeTab === 'OVERDUE' && styles.activeTabText]}>Quá hạn</Text>
            </TouchableOpacity>
        </View>
    );

    const renderPendingList = () => (
        <View>
            {borrow.map(item => (
                <View key={item.id} style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.reqId}>Mã: {item.id}</Text>
                        <View style={styles.statusBadgePending}>
                            <Clock size={12} color="#F57C00" style={{marginRight: 4}}/>
                            <Text style={styles.statusTextPending}>Chờ duyệt</Text>
                        </View>
                    </View>
                    <View style={styles.cardBody}>
                        <Text style={styles.infoRow}><Text style={styles.label}>Độc giả: </Text>{item.name}</Text>
                        <Text style={styles.infoRow}><Text style={styles.label}>Sách: </Text>{item.documentTitle}</Text>
                        <Text style={styles.infoRow}><Text style={styles.label}>Ngày tạo: </Text>{formatDate(item.borrowedDate)}</Text>
                    </View>
                    <View style={styles.cardFooter}>
                        <TouchableOpacity style={[styles.actionBtn, styles.rejectBtn]} onPress={() => updateBorrowStatus(item.id, 'REFUSE')}>
                            <XCircle size={16} color="#D32F2F" style={{marginRight: 6}} />
                            <Text style={styles.rejectBtnText}>Từ chối</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionBtn, styles.acceptBtn]} onPress={() => updateBorrowStatus(item.id, 'BORROWED')}>
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
            {borrow.map(item => (
                <View key={item.id} style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.reqId}>Mã: {item.id}</Text>
                        <View style={styles.statusBadgeActive}>
                            <Text style={styles.statusTextActive}>Đang mượn</Text>
                        </View>
                    </View>
                    <View style={styles.cardBody}>
                        <Text style={styles.infoRow}><Text style={styles.label}>Độc giả: </Text>{item.name}</Text>
                        <Text style={styles.infoRow}><Text style={styles.label}>Sách: </Text>{item.documentTitle}</Text>
                        <Text style={styles.infoRow}><Text style={styles.label}>Hạn trả: </Text><Text style={styles.activeDateText}>{formatDate(item.returnDate)}</Text></Text>
                    </View>
                    <View style={styles.cardFooterSingle}>
                        <TouchableOpacity style={[styles.actionBtn, styles.returnBtn]} onPress={() => updateBorrowStatus(item.id, 'RETURNED')}>
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
            {borrow.map(item => (
                <View key={item.id} style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.reqId}>Mã: {item.id}</Text>
                        <View style={styles.statusBadgeOverdue}>
                            <Text style={styles.statusTextOverdue}>Quá hạn {item.daysOverdue} ngày</Text>
                        </View>
                    </View>
                    <View style={styles.cardBody}>
                        <Text style={styles.infoRow}><Text style={styles.label}>Độc giả: </Text>{item.name}</Text>
                        <Text style={styles.infoRow}><Text style={styles.label}>Sách: </Text>{item.documentTitle}</Text>
                        <Text style={styles.infoRow}><Text style={styles.label}>Hạn trả: </Text><Text style={styles.overdueDateText}>{formatDate(item.returnDate)}</Text></Text>
                    </View>
                    <View style={styles.cardFooterSingle}>
                         <TouchableOpacity style={[styles.actionBtn, styles.remindBtn]}>
                            <Text style={styles.remindBtnText}>Gửi nhắc nhở</Text>
                        </TouchableOpacity>
                        <View style={{width: 10}}/>
                        <TouchableOpacity style={[styles.actionBtn, styles.returnBtn, {flex: 1}]} onPress={() => updateBorrowStatus(item.id, 'RETURNED')}>
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
                {activeTab === 'PENDING' && renderPendingList()}
                {activeTab === 'BORROWED' && renderActiveList()}
                {activeTab === 'OVERDUE' && renderOverdueList()}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ManageBorrow;
