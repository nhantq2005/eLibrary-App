export const normalizeCart = (cartData) => {
    if (!cartData || typeof cartData !== 'object' || Array.isArray(cartData)) {
        return [];
    }
    
    return Object.values(cartData);
};