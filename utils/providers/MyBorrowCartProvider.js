import { useContext, useEffect, useReducer } from "react";
import { MyBorrowCartContext, MyUserContext } from "../MyContexts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyBorrowCartReducer from "../reducers/MyBorrowCartReducer";

export const MyBorrowCartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(MyBorrowCartReducer, {}); 
  const [user] = useContext(MyUserContext);
  const userId = user?.id;

  useEffect(() => {
    const loadBorrowCart = async () => {
      if (!userId) return;
      try {
        const borrowCartData = await AsyncStorage.getItem(`cart_borrow`);
        if (borrowCartData) {
          // Parse data và đẩy payload cho reducer
          dispatch({ type: "UPDATE", payload: JSON.parse(borrowCartData) });
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadBorrowCart();
  }, [userId]);

  useEffect(() => {
    const saveBorrowCart = async () => {
      if (!userId) return;
      // Lưu toàn bộ object giỏ hàng vào storage
      if (cart && Object.keys(cart).length > 0) {
        await AsyncStorage.setItem(`cart_borrow`, JSON.stringify(cart));
      } else {
        await AsyncStorage.removeItem(`cart_borrow`);
      }
    };
    saveBorrowCart();
  }, [cart, userId]);

  return(
    <MyBorrowCartContext.Provider value={[cart, dispatch]}>
      {children}
    </MyBorrowCartContext.Provider>
  ) 
}
