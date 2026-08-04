import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react-native';
import Apis from '../../utils/Apis';
import DropDownPicker from 'react-native-dropdown-picker';

const EditBook = ({ navigation, route }) => {
    // Determine if we are creating a new book or editing an existing one
    const isNew = route?.params?.isNew ?? false;
    const bookData = route?.params?.book ?? null;
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(bookData?.title || '');
    const [author, setAuthor] = useState(bookData?.author || '');
    const [category, setCategory] = useState(bookData?.category || '');
    const [quantity, setQuantity] = useState(bookData?.quantity?.toString() || '');
    const [description, setDescription] = useState(bookData?.description || '');

    const [staticData, setStaticData] = useState({
        categories: [],
        authors: [],
        tags: []
    });

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        publishYear: new Date().getFullYear(),
        price: 0,
        quantity: 1,
        isPremium: false,
        categoryId: '',
        authorIds: [],
        tagIds: []
    });

    const validate = () => {
        if (!title.trim()) {
            alert('Tên sách không được để trống');
            return false;
        }
        if (!author.trim()) {
            alert('Tên tác giả không được để trống');
            return false;
        }
        if (!category.trim()) {
            alert('Thể loại không được để trống');
            return false;
        }
        if (!quantity.trim() || isNaN(quantity) || parseInt(quantity) <= 0) {
            alert('Số lượng phải là một số nguyên dương');
            return false;
        }
        return true;
    }

    const loadStaticData = async () => {
        try {
            const resCategories = await Apis.get(endpoints['categories']).catch(() => ({ data: [] }));
            const resAuthors = await Apis.get(endpoints['authors']).catch(() => ({ data: [] }));
            const resTags = await Apis.get(endpoints['tags']).catch(() => ({ data: [] }));
            
            setStaticData({
                categories: resCategories.data || [],
                authors: resAuthors.data || [],
                tags: resTags.data || []
            });
        } catch (error) {
            console.error('Error fetching static data:', error);
        }
    }

    const saveBook = async () => {
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color="#212529" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{isNew ? 'Thêm sách mới' : 'Chỉnh sửa sách'}</Text>

                <View style={{ width: 24 }} />
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Image Upload Placeholder */}
                    <View style={styles.imageUploadContainer}>
                        <View style={styles.imagePlaceholder}>
                            <ImageIcon size={40} color="#ADB5BD" />
                            <Text style={styles.uploadText}>Tải ảnh lên</Text>
                        </View>
                    </View>

                    {/* Form Fields */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Tên sách <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập tên sách"
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Tác giả <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập tên tác giả"
                            value={author}
                            onChangeText={setAuthor}
                        />
                    </View>

                    <View style={styles.rowGroup}>
                        <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                            <Text style={styles.label}>Thể loại <Text style={styles.required}>*</Text></Text>
                            {/* <TextInput
                                style={styles.input}
                                placeholder="VD: CNTT"
                                value={category}
                                onChangeText={setCategory}
                            /> */}
                            <DropDownPicker
                                open={open}
                                value={category}
                                items={staticData.categories.map(cat => ({ label: cat.name, value: cat.id }))}
                                setOpen={setOpen}
                                setValue={setCategory}
                                zIndex={1000}
                                placeholder="Chọn thể loại..."
                            />
                        </View>


                        <View style={[styles.formGroup, { flex: 1 }]}>
                            <Text style={styles.label}>Số lượng <Text style={styles.required}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                placeholder="0"
                                keyboardType="numeric"
                                value={quantity}
                                onChangeText={setQuantity}
                            />
                        </View>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Mô tả</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Nhập mô tả sách..."
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>


            {/* Bottom Action */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelButtonText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton}>
                    <Save size={20} color="#FFFFFF" style={styles.saveIcon} />
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
