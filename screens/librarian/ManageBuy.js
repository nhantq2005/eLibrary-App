import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, CheckCircle, XCircle, ShoppingBag } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApis, endpoints } from '../../utils/Apis';
import { styles } from '../../styles/ManageBuyStyle';
import { formatPrice } from '../../utils/Utils';

const ManageBuy = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('PENDING');
    const [buy, setBuy] = useState([]);

    const updateBuyStatus = async (bookId, status) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await authApis(token).put(endpoints['update-buy-status'](bookId), status, {
                headers: { 'Content-Type': 'text/plain' }
            });
            if (res.status === 200) {
                loadBuy();
                Alert.alert('Thành công', 'Cập nhật trạng thái thành công');
            }
        } catch (error) {
            console.error('Lỗi cập nhật trạng thái sách:', error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi cập nhật trạng thái');
        }
    }

    const loadBuy = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await authApis(token).get(`${endpoints['get-buy']}?status=${activeTab}`);
            if (res.status === 200) {
                setBuy(res.data);
            }
        } catch (error) {
            console.error('Lỗi khi tải danh sách mua:', error);
        }
    };

    useEffect(() => {
        loadBuy();
    }, [activeTab]);

    const renderTabs = () => (
        <View style={styles.tabsContainer}>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'PENDING' && styles.activeTab]}
                onPress={() => setActiveTab('PENDING')}
            >
                <Text style={[styles.tabText, activeTab === 'PENDING' && styles.activeTabText]}>Chờ xử lý</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'COMPLETED' && styles.activeTab]}
                onPress={() => setActiveTab('COMPLETED')}
            >
                <Text style={[styles.tabText, activeTab === 'COMPLETED' && styles.activeTabText]}>Hoàn thành</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'CANCELLED' && styles.activeTab]}
                onPress={() => setActiveTab('CANCELLED')}
            >
                <Text style={[styles.tabText, activeTab === 'CANCELLED' && styles.activeTabText]}>Đã hủy</Text>
            </TouchableOpacity>
        </View>
    );

    const renderList = (data, type) => (
        <View>
            {data.map(item => (
                <View key={item.id} style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <ShoppingBag size={16} color="#495057" style={{ marginRight: 6 }} />
                            <Text style={styles.reqId}>Đơn: {item.id}</Text>
                        </View>
                        <Text style={styles.dateText}>{item.date}</Text>
                    </View>

                    <View style={styles.cardBody}>
                        <Text style={styles.infoRow}><Text style={styles.label}>Khách hàng: </Text>{item.name}</Text>
                        <Text style={styles.infoRow}><Text style={styles.label}>Sản phẩm: </Text>{item.documentTitle}</Text>
                        <Text style={styles.infoRow}><Text style={styles.label}>Phương thức thanh toán: </Text>{item.paymentMethod}</Text>
                        <View style={styles.priceRow}>
                            <Text style={styles.label}>Tổng tiền: </Text>
                            <Text style={styles.priceText}>{formatPrice(item.amount)}</Text>
                        </View>
                    </View>

                    {type === 'PENDING' && (
                        <View style={styles.cardFooter}>
                            <TouchableOpacity style={[styles.actionBtn, styles.rejectBtn]} onPress={() => updateBuyStatus(item.id, 'CANCELLED')}>
                                <XCircle size={16} color="#D32F2F" style={{ marginRight: 6 }} />
                                <Text style={styles.rejectBtnText}>Hủy đơn</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.actionBtn, styles.acceptBtn]} onPress={() => updateBuyStatus(item.id, 'COMPLETED')}>
                                <CheckCircle size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                                <Text style={styles.acceptBtnText}>Xác nhận & Giao</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {type === 'COMPLETED' && (
                        <View style={[styles.cardFooter, { justifyContent: 'flex-end', paddingTop: 0 }]}>
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
                {activeTab === 'PENDING' && renderList(buy, 'PENDING')}
                {activeTab === 'COMPLETED' && renderList(buy, 'COMPLETED')}
                {activeTab === 'CANCELLED' && renderList(buy, 'CANCELLED')}
            </ScrollView>
        </SafeAreaView>
    );
};



export default ManageBuy;
