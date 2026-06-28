import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../../styles/LoginStyles';
import Spacer from "../../components/Spacer";
import { Theme } from "../../styles/Theme";
import OutlineTextInput from "../../components/OutlineTextInput";
import Apis, { endpoints } from "../../utils/Apis";



const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const isValidate = () => {
        if (username.trim() === '') {
            alert('Vui lòng nhập tên đăng nhập');
            return false;
        }
        if (password.trim() === '') {
            alert('Vui lòng nhập mật khẩu');
            return false;
        }
        return true;
    };

    const login = async () => {
        console.log('Login button pressed');
        if (isValidate()) {
            try {
                setIsLoading(true);
                let res = await Apis.post(endpoints['login'], 
                    { username: username, password: password }
                );
                console.log(res.data);
            } catch (err) {
                if(err.response && err.response.status === 401) {
                    setError('Tên đăng nhập hoặc mật khẩu không đúng');
                }else {
                    setError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} showsVerticalScrollIndicator={false}>
                    <View style={[styles.content, { flex: 0 }]}>
                        <View style={styles.logoRow}>
                            <Image
                                source={require('../../assets/elib_logo.png')}
                                style={styles.logo}
                            />
                            <Text style={styles.logoText}>eLibrary</Text>
                        </View>
                        <Text style={styles.title}>Đăng nhập</Text>
                        <Text style={styles.subtitle}>Trở lại với không gian đọc tĩnh lặng của bạn.</Text>
                        <OutlineTextInput
                            placeholder="Tên đăng nhập"
                            value={username}
                            onChangeText={setUsername}
                        />
                        <OutlineTextInput
                            placeholder="Mật khẩu"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!isShowPassword}
                            right={
                                <TextInput.Icon
                                    icon={isShowPassword ? "eye" : "eye-off"}
                                    onPress={() => setIsShowPassword(!isShowPassword)}
                                />
                            }
                        />
                        <TouchableOpacity onPress={() => console.log('Pressed')}>
                            <Text style={{ textAlign: 'right', color: Theme.colors.primary, marginBottom: 12 }}>
                                Quên mật khẩu?
                            </Text>
                        </TouchableOpacity>
                        <Button
                            mode="contained"
                            onPress={login}
                            style={styles.button}
                            labelStyle={styles.buttonLabel}
                            loading={isLoading} 
                        >
                            Đăng nhập
                        </Button>
                        <Spacer height={20} />
                        <Text style={{ textAlign: 'center', color: Theme.colors.onSurfaceVariant }}>Hoặc</Text>
                        <Spacer height={20} />
                        <TouchableOpacity onPress={() => console.log('Pressed')}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: Theme.colors.outline,
                                borderRadius: 25,
                                paddingVertical: 10,
                            }}
                        >
                            <Image
                                source={require('../../assets/google.png')}
                                style={{ width: 20, height: 20, marginRight: 8 }}
                            />
                            <Text style={styles.outlineButtonLabel}>Đăng nhập với Google</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.footerRow}>
                        <Text>Bạn chưa có tài khoản? </Text>
                        <TouchableOpacity onPress={() => console.log('Pressed')}>
                            <Text style={styles.linkText}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Login;