import { Image, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { Button, Text, TextInput, Avatar } from "react-native-paper";
import OutlineTextInput from "../../components/OutlineTextInput";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Eye, EyeOff, IdCardLanyard, Mail, ShieldUser, SquareAsterisk, UserRoundPen, Camera } from "lucide-react-native";
import styles from '../../styles/LoginStyles';
import Spacer from "../../components/Spacer";
import { Theme } from "../../styles/Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import Apis, { endpoints } from "../../utils/Apis";

const Register = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0]);
        }
    };

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
        {
            placeholder: "Tên đăng nhập",
            field: "username",
            icon: ShieldUser
        },
        {
            placeholder: "Mật khẩu",
            field: "password",
            icon: SquareAsterisk
        },
        {
            placeholder: "Nhập lại mật khẩu",
            field: "confirm",
            icon: SquareAsterisk
        }
    ]


    const validate = () => {
        if (avatar === null) {
            alert('Vui lòng chọn ảnh đại diện');
            return false;
        }
        for (let info of infos) {
            if (!user[info.field] || user[info.field].trim() === '') {
                alert(`Vui lòng nhập ${info.placeholder.toLowerCase()}`);
                return false;
            }
            if (info.field === 'confirm' && user['password'] !== user['confirm']) {
                alert('Mật khẩu và xác nhận mật khẩu không khớp');
                return false;
            }
        }
        return true;
    }

    const register = async () => {
        console.log('Register button pressed', user);
        if (validate()) {
            try {
                setIsLoading(true);
                let form = new FormData();
                for (let info of infos) {
                    if (info.field !== 'confirm') {
                        form.append(info.field, user[info.field]);
                    }
                    // form.append(info.field, user[info.field]);

                }
                form.append('avatar', {
                    uri: avatar.uri,
                    type: avatar.mimeType || "image/jpeg",
                    name: avatar.fileName || `avatar_${Date.now()}.jpg`
                });
                const res = await Apis.post(endpoints['register'], form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (res.status === 201) {
                    alert('Đăng ký thành công! Vui lòng đăng nhập.');
                }
                console.log('Register button pressed');
            } catch (err) {
                setErrorMsg('Đã xảy ra lỗi. Vui lòng thử lại sau.');
            } finally {
                setIsLoading(false);
            }
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} showsVerticalScrollIndicator={false}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Đăng ký</Text>
                        <Text style={styles.subtitle}>Tạo tài khoản để bắt đầu trải nghiệm.</Text>

                        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer} activeOpacity={0.8}>
                            {avatar ? (
                                <Avatar.Image size={110} source={{ uri: avatar.uri }} />
                            ) : (
                                <Avatar.Icon size={110} icon="account" style={{ backgroundColor: Theme.colors.surfaceVariant }} color={Theme.colors.onSurfaceVariant} />
                            )}
                            <View style={styles.avatarBadge}>
                                <Camera size={16} color={Theme.colors.onPrimary} />
                            </View>
                        </TouchableOpacity>

                        {infos.map((info, index) => (
                            <OutlineTextInput
                                key={index}
                                placeholder={info.placeholder}
                                value={user[info.field]}
                                onChangeText={(text) => setUser({ ...user, [info.field]: text })}
                                left={
                                    <TextInput.Icon
                                        icon={({ size, color }) => {
                                            const Icon = info.icon;
                                            return <Icon size={size} color={color} />;
                                        }}
                                    />
                                }
                                secureTextEntry={
                                    info.field === "password"
                                        ? !isShowPassword
                                        : info.field === "confirm"
                                            ? !isShowConfirmPassword
                                            : false
                                }
                                right={info.field === "password" || info.field === "confirm" ? (
                                    <TextInput.Icon
                                        icon={({ size, color }) =>
                                            (info.field === "password" ? isShowPassword : isShowConfirmPassword)
                                                ? <Eye size={size} color={color} />
                                                : <EyeOff size={size} color={color} />
                                        }
                                        onPress={() => {
                                            if (info.field === "password") {
                                                setIsShowPassword(!isShowPassword);
                                            } else {
                                                setIsShowConfirmPassword(!isShowConfirmPassword);
                                            }
                                        }}
                                    />
                                ) : null}
                            />
                        ))}
                        <Button
                            mode="contained"
                            onPress={register}
                            style={styles.button}
                            labelStyle={styles.buttonLabel}
                        >
                            Đăng ký
                        </Button>
                        <Spacer height={20} />
                        <View style={styles.footerRow}>
                            <Text>Đã có tài khoản? </Text>
                            <TouchableOpacity>
                                <Text style={styles.linkText}>Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                        <Spacer height={40} />
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
};

export default Register;