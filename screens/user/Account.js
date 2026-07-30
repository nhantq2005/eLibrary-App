import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, CreditCard, HelpCircle, LogOut, ChevronRight, BookOpen, Bookmark } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyBorrowCartContext, MyBuyCartContext, MyUserContext } from '../../utils/MyContexts';
import { useNavigation } from "@react-navigation/native";

const Account = () => {
    const menuItems = [
        { id: 1, title: 'Thông tin cá nhân', icon: User, color: '#1E3A5F' },
        { id: 2, title: 'Thanh toán & Ví', icon: CreditCard, color: '#1E3A5F' },
        { id: 3, title: 'Cài đặt chung', icon: Settings, color: '#1E3A5F' },
        { id: 4, title: 'Trợ giúp & Hỗ trợ', icon: HelpCircle, color: '#1E3A5F' },
    ];
    const [user, dispatch] = useContext(MyUserContext);
    const [,cartDispatch] = useContext(MyBorrowCartContext);
    const [, buyCartDispatch] = useContext(MyBuyCartContext);
    const nav = useNavigation();

    const logout = async () => {
        await AsyncStorage.clear();
        dispatch({
            "type": "logout",
            "payload": null
        })
        cartDispatch({
            "type": "CLEAR",
            "payload": {}
        })
        buyCartDispatch({
            "type": "CLEAR",
            "payload": []
        })
        // nav.reset({
        //     index: 0,
        //     routes: [{ name: 'Login' }],
        // });
    };

    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Header Profile */}
                <View style={styles.header}>
                    <Image 
                        source={{ uri: user.avatar || 'https://via.placeholder.com/150' }} 
                        style={styles.avatar} 
                    />
                    <Text style={styles.name}>{user.name || 'Nguyễn Văn A'}</Text>
                    <Text style={styles.email}>{user.email || 'nguyenvana@elibrary.com'}</Text>
                    
                    <TouchableOpacity style={styles.editButton} activeOpacity={0.7} onPress={() => { nav.navigate('EditInfo') }}>
                        <Text style={styles.editButtonText}>Chỉnh sửa hồ sơ</Text>
                    </TouchableOpacity>
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <BookOpen size={24} color="#B8860B" />
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>Đang đọc</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.statBox}>
                        <Bookmark size={24} color="#1E3A5F" />
                        <Text style={styles.statNumber}>45</Text>
                        <Text style={styles.statLabel}>Đã lưu</Text>
                    </View>
                </View>

                {/* Menu */}
                <View style={styles.menuContainer}>
                    <Text style={styles.sectionTitle}>Tài khoản</Text>
                    <View style={styles.menuCard}>
                        {menuItems.map((item, index) => (
                            <TouchableOpacity 
                                key={item.id} 
                                style={[styles.menuItem, index === menuItems.length - 1 && { borderBottomWidth: 0 }]}
                                activeOpacity={0.6}
                            >
                                <View style={styles.menuItemLeft}>
                                    <View style={styles.iconContainer}>
                                        <item.icon size={20} color={item.color} />
                                    </View>
                                    <Text style={styles.menuItemText}>{item.title}</Text>
                                </View>
                                <ChevronRight size={20} color="#D1D5DB" />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Logout */}
                <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7} onPress={logout}>
                    <LogOut size={20} color="#B3261E" />
                    <Text style={styles.logoutText}>Đăng xuất</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFBF7',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 30,
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        marginBottom: 20,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 3,
        borderColor: '#F3F0E9',
        marginBottom: 12,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1E3A5F',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#5A6570',
        marginBottom: 16,
    },
    editButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: '#F3F0E9',
        borderRadius: 20,
    },
    editButtonText: {
        color: '#1E3A5F',
        fontWeight: '600',
        fontSize: 14,
    },
    statsContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statBox: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2C3338',
        marginTop: 8,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 13,
        color: '#5A6570',
    },
    divider: {
        width: 1,
        backgroundColor: '#F3F0E9',
        marginHorizontal: 15,
    },
    menuContainer: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2C3338',
        marginBottom: 12,
        marginLeft: 4,
    },
    menuCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 6,
        elevation: 2,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F0E9',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F3F0E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    menuItemText: {
        fontSize: 16,
        color: '#2C3338',
        fontWeight: '500',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#F9DEDC',
        borderRadius: 16,
    },
    logoutText: {
        color: '#B3261E',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
    },
});

export default Account;
