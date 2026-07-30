import { ArrowLeft, IdCardLanyard, Mail, UserRoundPen } from "lucide-react-native";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const EditInfo = () => {
    const infos = [
        {
            placeholder: "Họ tên",
            field: "name",
            icon: UserRoundPen
        },
        {   
            placeholder: "Email",
            field: "email",
            icon: Mail
        },
        {
            placeholder: "Chuyên ngành",
            field: "major",
            icon: IdCardLanyard
        },
    ]

    const [user, setUser] = useState({})
    const nav = useNavigation();

    const validate = () => {
        for (let info of infos) {
            if (!user[info.field] || user[info.field].trim() === '') {
                Alert.alert("Lỗi", `Vui lòng nhập ${info.placeholder.toLowerCase()}`);
                return false;
            }
        }
        return true;
    }

    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }} onPress={() => nav.goBack()}>
                    <ArrowLeft size={24} color="#1E3A5F" />
                    <Text style={{ fontSize: 16, color: '#1E3A5F', marginLeft: 8 }}>Quay lại</Text>
                </TouchableOpacity>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>Chỉnh Sửa Thông Tin</Text>
                        <Text style={styles.headerSubtitle}>Cập nhật thông tin cá nhân của bạn</Text>
                    </View>

                    <View style={styles.formContainer}>
                        {infos.map((info, index) => (
                            <View key={index} style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>{info.placeholder}</Text>
                                <View style={styles.inputGroup}>
                                    <View style={styles.iconContainer}>
                                        <info.icon size={20} color="#1E3A5F" />
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={`Nhập ${info.placeholder.toLowerCase()}`}
                                        placeholderTextColor="#9CA3AF"
                                        value={user[info.field]}
                                        onChangeText={(text) => setUser({ ...user, [info.field]: text })}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={styles.saveButton}
                        activeOpacity={0.8}
                        onPress={() => {
                            if (validate()) {
                                Alert.alert('Thành công', 'Thông tin đã được cập nhật thành công!');
                            }
                        }}
                    >
                        <Text style={styles.saveButtonText}>Lưu Thay Đổi</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FDFBF7',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 20,
    },
    headerContainer: {
        marginBottom: 32,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1E3A5F',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 15,
        color: '#5A6570',
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 6,
        elevation: 2,
        marginBottom: 30,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2C3338',
        marginBottom: 8,
        marginLeft: 4,
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#F3F0E9',
        borderRadius: 12,
        overflow: 'hidden',
    },
    iconContainer: {
        padding: 12,
        backgroundColor: '#F3F0E9',
        borderRightWidth: 1,
        borderRightColor: '#F3F0E9',
    },
    input: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#2C3338',
    },
    saveButton: {
        backgroundColor: '#1E3A5F',
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: '#1E3A5F',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EditInfo;