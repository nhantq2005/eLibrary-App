import { useContext, useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyBuyCartContext, MyUserContext } from "../MyContexts";
import MyBuyCartReducer from "../reducers/MyBuyCartReducer";

export const MyBuyCartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(MyBuyCartReducer, []);
  const [user] = useContext(MyUserContext);
  const userId = user?.id;

  useEffect(() => {
    const loadBuyCart = async () => {
      if (!userId) return;
      try {
        const buyCartData = await AsyncStorage.getItem(`cart_buy`);
        if (buyCartData) {
          // Parse data và đẩy payload cho reducer
          dispatch({ type: "UPDATE", payload: JSON.parse(buyCartData) });
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadBuyCart();
  }, [userId]);

  useEffect(() => {
    const saveBuyCart = async () => {
      if (!userId) return;
      // Lưu toàn bộ object giỏ hàng vào storage
      if (cart && Object.keys(cart).length > 0) {
        await AsyncStorage.setItem(`cart_buy`, JSON.stringify(cart));
      } else {
        await AsyncStorage.removeItem(`cart_buy`);
      }
    };
    saveBuyCart();
  }, [cart, userId]);

  return(
    <MyBuyCartContext.Provider value={[cart, dispatch]}>
      {children}
    </MyBuyCartContext.Provider>
  )
}
