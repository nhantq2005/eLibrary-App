import AsyncStorage from "@react-native-async-storage/async-storage";

const MyBuyCartReducer = (current, action) => {
    switch (action.type) {
        case 'UPDATE': 
            return action.payload;
        case 'PAID':
            return {};
        case 'CLEAR':
            return {};
        default:
            return current;
    }
}

export default MyBuyCartReducer;