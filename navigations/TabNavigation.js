import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Home as HomeIcon, User, ShoppingCart, LibraryBig, MessageCircleMore, LayoutDashboard, BookOpen, ArrowRightLeft, ShoppingBag, ShoppingBasket } from 'lucide-react-native';

import Home from '../screens/book/Home';
import MyBook from '../screens/book/MyBook';
import Login from '../screens/user/Login';
import Register from '../screens/user/Register';
import { Theme } from '../styles/Theme';
import BaseCart from '../screens/cart/BaseCart';
import Account from '../screens/user/Account';
import ListMessage from '../screens/message/ListMessage';
import BookDetail from '../screens/book/BookDetail';
import { useContext } from 'react';
import { MyUserContext } from '../utils/MyContexts';

// Import Librarian screens
import Dashboard from '../screens/librarian/Dashboard';
import ManageBook from '../screens/librarian/ManageBook';
import ManageBorrow from '../screens/librarian/ManageBorrow';
import ManageBuy from '../screens/librarian/ManageBuy';
import { useCartTotals } from '../hook/useCartTotals';

const Tab = createBottomTabNavigator();
const TabIcon = ({ IconComponent, focused, color, size }) => {
    return (
        <View style={{
            backgroundColor: focused ? Theme.colors.primaryContainer : 'transparent',
            paddingHorizontal: 14,
            paddingVertical: 4,
            borderRadius: 20, // Bo tròn dạng viên thuốc (Pill shape)
        }}>
            <IconComponent color={focused ? "white" : color} size={size} />
        </View>
    );
};

const TabNavigation = () => {
    // const unreadCount = useContext(NotificationContext);
    const { totalQuantity } = useCartTotals();
    const [user,] = useContext(MyUserContext);
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Theme.colors.primary,
                tabBarInactiveTintColor: Theme.colors.onSurfaceVariant,
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                    marginTop: 2,
                },
                tabBarStyle: {
                    backgroundColor: Theme.colors.surface,
                    position: 'absolute',
                    // Bỏ viền dưới vì thanh này thường nằm sát đáy màn hình
                    borderRadius: 24,
                    borderTopRightRadius: 24,
                    elevation: 10,
                    shadowColor: '#000',
                    shadowOpacity: 0.08,
                    shadowRadius: 10,
                    height: 65, // Tăng nhẹ chiều cao để chứa vừa viên thuốc
                    paddingBottom: 10,
                    paddingTop: 8,
                    margin: 10,
                    borderTopWidth: 0,
                },
            }}
        >
            {user && user.role === 'ROLE_LIBRARIAN' ? (
                <>
                    <Tab.Screen
                        name="Dashboard"
                        component={Dashboard}
                        options={{
                            title: 'Tổng quan',
                            tabBarIcon: (props) => <TabIcon IconComponent={LayoutDashboard} {...props} />,
                        }}
                    />
                    <Tab.Screen
                        name="ManageBook"
                        component={ManageBook}
                        options={{
                            title: 'Sách',
                            tabBarIcon: (props) => <TabIcon IconComponent={BookOpen} {...props} />,
                        }}
                    />
                    <Tab.Screen
                        name="ManageBorrow"
                        component={ManageBorrow}
                        options={{
                            title: 'Mượn/Trả',
                            tabBarIcon: (props) => <TabIcon IconComponent={ArrowRightLeft} {...props} />,
                        }}
                    />
                    <Tab.Screen
                        name="ManageBuy"
                        component={ManageBuy}
                        options={{
                            title: 'Đơn mua',
                            tabBarIcon: (props) => <TabIcon IconComponent={ShoppingBag} {...props} />,
                        }}
                    />
                    <Tab.Screen
                        name="ListMessage"
                        component={ListMessage}
                        options={{
                            title: 'Tin nhắn',
                            tabBarIcon: (props) => <TabIcon IconComponent={MessageCircleMore} {...props} />,
                            tabBarBadge: 3, // Ví dụ: hiển thị số lượng tin nhắn chưa đọc
                        }}
                    />
                    <Tab.Screen
                        name="Profile"
                        component={Account}
                        options={{
                            title: 'Tài khoản',
                            tabBarIcon: (props) => <TabIcon IconComponent={User} {...props} />,
                        }}
                    />
                </>
            ) : (
                <>
                    <Tab.Screen
                        name="HomeMain"
                        component={Home}
                        options={{
                            title: 'Trang chủ',
                            tabBarIcon: (props) => <TabIcon IconComponent={HomeIcon} {...props} />,
                        }}
                    />

                    <Tab.Screen
                        name="Cart"
                        component={BaseCart}
                        options={{
                            title: 'Giỏ hàng',
                            tabBarIcon: (props) => <TabIcon IconComponent={ShoppingBasket} {...props} />,
                            tabBarBadge: totalQuantity,
                        }}
                    />

                    <Tab.Screen
                        name="MyBooks"
                        component={MyBook}
                        options={{
                            title: 'Sách của tôi',
                            tabBarIcon: (props) => <TabIcon IconComponent={LibraryBig} {...props} />,
                        }}
                    />

                    <Tab.Screen
                        name="Messages"
                        component={ListMessage}
                        options={{
                            title: 'Tin nhắn',
                            tabBarIcon: (props) => <TabIcon IconComponent={MessageCircleMore} {...props} />,
                            // tabBarBadge: unreadCount > 0 ? unreadCount : null,
                        }}
                    />

                    <Tab.Screen
                        name="Profile"
                        component={Account}
                        options={{
                            title: 'Tài khoản',
                            tabBarIcon: (props) => <TabIcon IconComponent={User} {...props} />,
                        }}
                    />
                </>
            )}
        </Tab.Navigator>
    );
};

export default TabNavigation;