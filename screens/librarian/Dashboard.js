import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, BookOpen, BookUp, AlertTriangle, Plus, ArrowRightLeft, BookMarked, UserPlus } from 'lucide-react-native';
import { MyUserContext } from '../../utils/MyContexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApis, endpoints } from '../../utils/Apis';
import { PieChart } from 'react-native-gifted-charts';

const PIECHART_COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

// --- Sub-components ---

const StatCard = ({ icon: Icon, iconColor, bgColor, value, label }) => {
    const safeValue = typeof value === 'object' && value !== null ? (value.count || value.length || value.name || value.id || '0') : value;
    return (
        <View style={[styles.statCard, { backgroundColor: bgColor }]}>
            <View style={styles.statIconContainer}>
                <Icon size={24} color={iconColor} />
            </View>
            <Text style={styles.statValue}>{safeValue}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );
};

const ActionButton = ({ icon: Icon, iconColor, bgColor, label, onPress }) => (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
        <View style={[styles.actionIcon, { backgroundColor: bgColor }]}>
            <Icon size={24} color={iconColor} />
        </View>
        <Text style={styles.actionText}>{label}</Text>
    </TouchableOpacity>
);

const ActivityCard = ({ userName, documentTitle, borrowDate }) => {
    const safeUserName = typeof userName === 'object' && userName !== null ? userName.name || 'Người dùng' : userName;
    const safeDocTitle = typeof documentTitle === 'object' && documentTitle !== null ? documentTitle.name || documentTitle.title || 'Sách' : documentTitle;
    
    return (
        <View style={styles.activityCard}>
            <View style={styles.activityIcon}>
                <ArrowRightLeft size={20} color="#0097A7" />
            </View>
            <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{safeUserName} đã mượn sách</Text>
                <Text style={styles.activityDesc}>{safeDocTitle} - {borrowDate ? new Date(borrowDate).toLocaleString() : ''}</Text>
            </View>
        </View>
    );
};

// --- Main Component ---

const Dashboard = ({ navigation }) => {
    const [user] = useContext(MyUserContext);
    
    // States grouped into a single object for cleaner management
    const [stats, setStats] = useState({
        documents: 1240, // Default fallback
        users: 850,      // Default fallback
        borrowing: [],
        overdueCount: 0,
        categories: []
    });

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const api = authApis(token);
                
                // Use Promise.all to fetch all APIs concurrently
                const [
                    borrowingRes,
                    overdueRes,
                    categoryRes,
                    usersRes,
                    documentsRes
                ] = await Promise.all([
                    api.get(endpoints['borrowing-stats']).catch(() => ({ data: [] })),
                    api.get(endpoints['overdue-stats']).catch(() => ({ data: [] })),
                    api.get(endpoints['category-stats']).catch(() => ({ data: [] })),
                    api.get(endpoints['count-users']).catch(() => ({ data: 850 })),
                    api.get(endpoints['count-documents']).catch(() => ({ data: 1240 }))
                ]);

                setStats({
                    borrowing: borrowingRes.data || [],
                    overdueCount: overdueRes.data?.length || 0,
                    categories: categoryRes.data || [],
                    users: usersRes.data || 850,
                    documents: documentsRes.data || 1240
                });
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        loadDashboardData();
    }, []);

    const renderLegendComponent = () => (
        <View style={styles.legendContainer}>
            {stats.categories.map((item, index) => (
                <View key={index.toString()} style={styles.legendItem}>
                    <View style={[styles.colorBox, { backgroundColor: PIECHART_COLORS[index % PIECHART_COLORS.length] }]} />
                    <Text style={styles.legendText}>{typeof item[1] === 'object' ? item[1].name : item[1]}</Text>
                </View>
            ))}
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Xin chào,</Text>
                    <Text style={styles.userName}>{typeof user?.name === 'object' ? user.name.name : (user?.name || 'Thủ thư')}</Text>
                </View>
                <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>
                        {typeof user?.name === 'object' 
                            ? (user.name.name ? user.name.name.charAt(0) : 'T') 
                            : (user?.name ? user.name.charAt(0) : 'T')}
                    </Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                <Text style={styles.sectionTitle}>Tổng quan</Text>
                <View style={styles.statsGrid}>
                    <StatCard 
                        icon={BookOpen} iconColor="#1976D2" bgColor="#E3F2FD"
                        value={stats.documents} label="Sách trong kho" 
                    />
                    <StatCard 
                        icon={Users} iconColor="#388E3C" bgColor="#E8F5E9"
                        value={stats.users} label="Độc giả" 
                    />
                    <StatCard 
                        icon={BookUp} iconColor="#F57C00" bgColor="#FFF3E0"
                        value={stats.borrowing.length} label="Đang cho mượn" 
                    />
                    <StatCard 
                        icon={AlertTriangle} iconColor="#D32F2F" bgColor="#FFEBEE"
                        value={stats.overdueCount} label="Quá hạn" 
                    />
                </View>

                <Text style={styles.sectionTitle}>Thao tác nhanh</Text>
                <View style={styles.actionsContainer}>
                    <ActionButton 
                        icon={Plus} iconColor="#7B1FA2" bgColor="#F3E5F5" label="Thêm sách"
                    />
                    <ActionButton 
                        icon={ArrowRightLeft} iconColor="#0097A7" bgColor="#E0F7FA" label="Mượn/Trả"
                    />
                    <ActionButton 
                        icon={UserPlus} iconColor="#3F51B5" bgColor="#E8EAF6" label="Thêm độc giả"
                    />
                    <ActionButton 
                        icon={BookMarked} iconColor="#FFA000" bgColor="#FFF8E1" label="Báo cáo"
                    />
                </View>

            

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 20, paddingVertical: 15, 
        borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
    },
    greeting: { fontSize: 14, color: '#6C757D' },
    userName: { fontSize: 20, fontWeight: 'bold', color: '#212529', marginTop: 2 },
    avatarPlaceholder: {
        width: 44, height: 44, borderRadius: 22, backgroundColor: '#1E3A5F',
        justifyContent: 'center', alignItems: 'center',
    },
    avatarText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
    scrollContent: { padding: 20, paddingBottom: 40 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#212529', marginBottom: 15, marginTop: 5 },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 25 },
    statCard: {
        width: '48%', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 15, marginBottom: 15,
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2,
    },
    statIconContainer: {
        width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.5)',
        justifyContent: 'center', alignItems: 'center', marginBottom: 10,
    },
    statValue: { fontSize: 22, fontWeight: 'bold', color: '#212529', marginBottom: 4 },
    statLabel: { fontSize: 13, color: '#6C757D', fontWeight: '500' },
    actionsContainer: {
        flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFFFFF',
        borderRadius: 16, padding: 20, marginBottom: 25,
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2,
    },
    actionButton: { alignItems: 'center', width: '23%' },
    actionIcon: {
        width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 8,
    },
    actionText: { fontSize: 12, color: '#495057', textAlign: 'center', fontWeight: '500' },
    recentSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    seeAllText: { color: '#1976D2', fontSize: 14, fontWeight: '600' },
    activityCard: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
        borderRadius: 12, padding: 15, marginBottom: 10,
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 3, elevation: 1,
    },
    activityIcon: {
        width: 40, height: 40, borderRadius: 20, backgroundColor: '#F8F9FA',
        justifyContent: 'center', alignItems: 'center', marginRight: 15,
    },
    activityInfo: { flex: 1 },
    activityTitle: { fontSize: 15, fontWeight: '600', color: '#212529', marginBottom: 4 },
    activityDesc: { fontSize: 13, color: '#6C757D' },
    
    // PIE CHART
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 30, color: '#333' },
    legendContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20, paddingHorizontal: 20 },
    legendItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginBottom: 10 },
    colorBox: { width: 12, height: 12, borderRadius: 6, marginRight: 6 },
    legendText: { fontSize: 14, color: '#555' },
});

export default Dashboard;