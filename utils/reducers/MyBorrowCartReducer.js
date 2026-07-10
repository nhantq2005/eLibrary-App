import AsyncStorage from "@react-native-async-storage/async-storage";

const MyBorrowCartReducer = (current, action) => {
    switch (action.type) {
        case 'UPDATE': 
            return action.payload; 
        case 'CLEAR':
            return {};
        default:
            return current;
    }
}
export default MyBorrowCartReducer;