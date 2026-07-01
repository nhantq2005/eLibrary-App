const MyBuyCartReducer = (current, action) => {
    switch (action.type) {
        case 'UPDATE':
            if (!action.userId) return { totalAmount: 0, totalQuantity: 0 };
            let cart = localStorage.getItem(`cartBuy_${action.userId}`) || null;
            if (cart) {
                let totalAmount = 0;
                let totalQuantity = 0;

                Object.values(cart).forEach(item => {
                    totalAmount += item.price * item.quantity;
                    totalQuantity += item.quantity;
                });
                return { ...cart, totalAmount, totalQuantity };
            }
            return { totalAmount: 0, totalQuantity: 0 };
        case 'CLEAR':
            return { totalAmount: 0, totalQuantity: 0 };
        case 'PAID':
            return { totalAmount: 0, totalQuantity: 0 };
        default:
            return current;
    }
}

export default MyBuyCartReducer;