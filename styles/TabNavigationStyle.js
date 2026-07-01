import { StyleSheet } from "react-native";

export default StyleSheet.create({
    tabBarItem: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 25,
        // backgroundColor: 'transparent', // Màu nền mặc định
    },
    tabBarItemFocused: {
        backgroundColor: '#E0E0E0', // Màu nền khi được chọn
    },
    tabBarLabel: {
        fontSize: 12,
        color: '#000', // Màu chữ mặc định
    },
    tabBarLabelFocused: {
        color: '#000', // Màu chữ khi được chọn
    },
});