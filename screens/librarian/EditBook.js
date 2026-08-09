import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Switch, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Save, Image as ImageIcon, FileIcon } from 'lucide-react-native';
import Apis, { endpoints, authApis } from '../../utils/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { ActivityIndicator } from 'react-native-paper';

const EditBook = ({ navigation, route }) => {
    const isNew = route?.params?.isNew ?? true;
    const bookData = route?.params?.book ?? null;

    const [openCategory, setOpenCategory] = useState(false);
    const [openAuthors, setOpenAuthors] = useState(false);
    const [openTags, setOpenTags] = useState(false);
    const [fileUri, setFileUri] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [loading, setLoading] = useState(false);
    const [staticData, setStaticData] = useState({
        categories: [],
        authors: [],
        tags: []
    });
    const [book, setBook] = useState(bookData || {});

    // Helpers for dropdown state
    const handleDropdownChange = (field) => (callback) => {
        setBook(prev => {
            const currentValue = prev[field] || (field === 'categoryId' ? null : []);
            return {
                ...prev,
                [field]: typeof callback === 'function' ? callback(currentValue) : callback
            };
        });
    };
    const bookInfos = [
        {
            field: 'title',
            placeholder: 'Nhập tiêu đề tài liệu',
            icon: 'book',
        },
        {
            field: 'description',
            placeholder: 'Nhập mô tả tài liệu',
            icon: 'file-text',
        },
        {
            field: 'publishYear',
            placeholder: 'Năm xuất bản (VD: 2023)',
            icon: 'calendar',
        },
        {
            field: 'quantity',
            placeholder: 'Số lượng (VD: 10)',
            icon: 'layers',
        },
        {
            field: 'isPremium',
            placeholder: 'Premium',
            icon: 'star',
        },
        {
            field: 'price',
            placeholder: 'Giá (VD: 100.00)',
            icon: 'dollar-sign',
        },
        {
            field: 'categoryId',
            placeholder: 'Chọn thể loại...',
            icon: 'tag',
        },
        {
            field: 'authorIds',
            placeholder: 'Chọn tác giả...',
            icon: 'user',
        },
        {
            field: 'tagIds',
            placeholder: 'Chọn nhãn...',
            icon: 'hash',
        }
    ]

    const pickFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
            });
            if (!result.canceled) {
                setFileUri(result.assets[0].uri);
            } else {
                console.log('Người dùng đã hủy chọn tệp.');
            }
        } catch (err) {
            console.error('Lỗi khi chọn tệp:', err);
        }
    };

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setImageUri(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Lỗi khi chọn ảnh:', error);
        }
    };


    useEffect(() => {
        loadStaticData();
    }, []);

    const loadStaticData = async () => {
        try {
            const resCategories = await Apis.get(endpoints['categories'])
            console.log('Categories loaded:', resCategories.data);
            const resAuthors = await Apis.get(endpoints['authors'])
            console.log('Authors loaded:', resAuthors.data);
            const resTags = await Apis.get(endpoints['tags'])
            console.log('Tags loaded:', resTags.data);

            setStaticData({
                categories: resCategories.data || [],
                authors: resAuthors.data || [],
                tags: resTags.data || []
            });
        } catch (error) {
            console.error('Error fetching static data:', error);
        }
    }

    const validate = () => {
        for (const info of bookInfos) {
            if (!book[info.field]?.toString().trim()) {
                Alert.alert('Lỗi nhập liệu', `${info.placeholder} không được để trống`);
                return false;
            }
        }
        return true;
    }

    const saveBook = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('token');

            const formData = new FormData();
            formData.append('title', book.title);
            formData.append('description', book.description);
            formData.append('publishYear', parseInt(book.publishYear) || new Date().getFullYear());
            formData.append('price', parseFloat(book.price) || 0);
            formData.append('quantity', parseInt(book.quantity));
            formData.append('isPremium', book.isPremium ? 'true' : 'false');
            formData.append('categoryId', book.categoryId);
            formData.append('authorIds', book.authorIds.join(','));
            formData.append('tagIds', book.tagIds.join(','));

            if (imageUri) {
                formData.append('image', {
                    uri: imageUri,
                    name: imageUri.split('/').pop() || 'image.jpg',
                    type: 'image/jpeg'
                });
            }

            if (fileUri) {
                formData.append('file', {
                    uri: fileUri,
                    name: fileUri.split('/').pop() || 'file.pdf',
                    type: 'application/octet-stream'
                });
            }

            console.log('Saving book with FormData...');
            const res = await authApis(token).post(endpoints['add-document'], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Book saved successfully:', res.data);
            Alert.alert('Thành công', 'Sách đã được lưu thành công');
            navigation.goBack();
        } catch (error) {
            console.error('Chi tiết lỗi:', error.response?.data);
            console.error('Lỗi khi lưu sách:', error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi lưu sách');
        } finally {
            setLoading(false);
        }
    }


    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color="#212529" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{isNew ? 'Thêm sách mới' : 'Chỉnh sửa sách'}</Text>
                <View style={{ width: 24 }} />
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 }}>
                        <TouchableOpacity style={styles.imageUploadContainer} onPress={pickImage}>
                            <View style={styles.imagePlaceholder}>
                                {imageUri ? (
                                    <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%', borderRadius: 12 }} />
                                ) : (
                                    <>
                                        <ImageIcon size={40} color="#ADB5BD" />
                                        <Text style={styles.uploadText}>Tải ảnh lên</Text>
                                    </>
                                )}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.imageUploadContainer} onPress={pickFile}>
                            <View style={styles.imagePlaceholder}>
                                {fileUri ? (
                                    <>
                                        <FileIcon size={40} color="#1976D2" />
                                        <Text style={[styles.uploadText, { color: '#1976D2' }]}>Đã chọn tệp</Text>
                                    </>
                                ) : (
                                    <>
                                        <FileIcon size={40} color="#ADB5BD" />
                                        <Text style={styles.uploadText}>Tải tệp lên</Text>
                                    </>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>

                    {bookInfos.filter(info => !['categoryId', 'authorIds', 'tagIds'].includes(info.field)).map(info => (
                        <View key={info.field} style={styles.formGroup}>
                            <Text style={styles.label}>{info.placeholder} {['title', 'description'].includes(info.field) && <Text style={styles.required}>*</Text>}</Text>
                            {info.field === 'description' ? (
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder={info.placeholder}
                                    value={book[info.field] || ''}
                                    onChangeText={(text) => setBook(prev => ({ ...prev, [info.field]: text }))}
                                    multiline
                                />
                            ) : info.field === 'isPremium' ? (
                                <Switch
                                    value={book.isPremium || false}
                                    onValueChange={(value) => setBook(prev => ({ ...prev, isPremium: value }))}
                                />
                            ) : (
                                <TextInput
                                    style={styles.input}
                                    placeholder={info.placeholder}
                                    value={book[info.field]?.toString() || ''}
                                    onChangeText={(text) => setBook(prev => ({ ...prev, [info.field]: text }))}
                                    keyboardType={['publishYear', 'price', 'quantity'].includes(info.field) ? 'numeric' : 'default'}
                                />
                            )}
                        </View>
                    ))}

                    <View style={[styles.formGroup, { zIndex: openCategory ? 5000 : 3000 }]}>
                        <Text style={styles.label}>Thể loại (Category) <Text style={styles.required}>*</Text></Text>
                        <DropDownPicker
                            open={openCategory}
                            value={book.categoryId || null}
                            items={staticData.categories.map(cat => ({ label: cat.name, value: cat.id }))}
                            setOpen={setOpenCategory}
                            onOpen={() => {
                                setOpenAuthors(false);
                                setOpenTags(false);
                            }}
                            setValue={handleDropdownChange('categoryId')}
                            zIndex={3000}
                            zIndexInverse={1000}
                            placeholder="Chọn thể loại..."
                            style={styles.dropdown}
                        />
                    </View>

                    <View style={[styles.formGroup, { zIndex: openAuthors ? 5000 : 2000 }]}>
                        <Text style={styles.label}>Tác giả (Authors)</Text>
                        <DropDownPicker
                            multiple={true}
                            min={0}
                            open={openAuthors}
                            value={book.authorIds || []}
                            items={staticData.authors.map(author => ({ label: author.name, value: author.id }))}
                            setOpen={setOpenAuthors}
                            onOpen={() => {
                                setOpenCategory(false);
                                setOpenTags(false);
                            }}
                            setValue={handleDropdownChange('authorIds')}
                            zIndex={2000}
                            zIndexInverse={2000}
                            placeholder="Chọn tác giả..."
                            style={styles.dropdown}
                            mode="BADGE"
                        />
                    </View>

                    <View style={[styles.formGroup, { zIndex: openTags ? 5000 : 1000 }]}>
                        <Text style={styles.label}>Nhãn (Tags)</Text>
                        <DropDownPicker
                            multiple={true}
                            min={0}
                            open={openTags}
                            value={book.tagIds || []}
                            items={staticData.tags.map(tag => ({ label: tag.name, value: tag.id }))}
                            setOpen={setOpenTags}
                            onOpen={() => {
                                setOpenCategory(false);
                                setOpenAuthors(false);
                            }}
                            setValue={handleDropdownChange('tagIds')}
                            zIndex={1000}
                            zIndexInverse={3000}
                            placeholder="Chọn nhãn..."
                            style={styles.dropdown}
                            mode="BADGE"
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelButtonText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={saveBook} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Save size={20} color="#FFFFFF" style={styles.saveIcon} />
                    )}
                    <Text style={styles.saveButtonText}>Lưu thông tin</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    backButton: {
        padding: 5,
        marginLeft: -5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212529',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    imageUploadContainer: {
        alignItems: 'center',
        marginBottom: 25,
    },
    imagePlaceholder: {
        width: 120,
        height: 160,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DEE2E6',
        borderStyle: 'dashed',
    },
    uploadText: {
        marginTop: 8,
        color: '#6C757D',
        fontSize: 13,
        fontWeight: '500',
    },
    formGroup: {
        marginBottom: 20,
    },
    rowGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#495057',
        marginBottom: 8,
    },
    required: {
        color: '#D32F2F',
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#DEE2E6',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 15,
        color: '#212529',
    },
    dropdown: {
        backgroundColor: '#FFFFFF',
        borderColor: '#DEE2E6',
        borderRadius: 10,
    },
    textArea: {
        height: 100,
        paddingTop: 12,
    },
    bottomBar: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#F1F3F5',
        marginRight: 10,
    },
    cancelButtonText: {
        color: '#495057',
        fontWeight: '600',
        fontSize: 16,
    },
    saveButton: {
        flex: 2,
        flexDirection: 'row',
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#1976D2',
    },
    saveIcon: {
        marginRight: 8,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default EditBook;
