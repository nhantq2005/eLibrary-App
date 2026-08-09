export const normalizeCart = (cartData) => {
    if (!cartData || typeof cartData !== 'object' || Array.isArray(cartData)) {
        return [];
    }
    
    return Object.values(cartData);
};

export const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString('vi-VN') : '';
};

export const formatPrice = (price) => {
    if (typeof price !== 'number') {
        return '';
    }
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};