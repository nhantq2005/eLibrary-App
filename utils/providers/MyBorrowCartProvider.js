import { useEffect, useReducer } from "react";
import { MyBuyCartContext } from "../MyContexts";

export const MyBorrowCartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(MyCartReducer, []);

  useEffect(() => {
    const loadBorrowCart = async () => {
      try {
        const borrowCartData = await AsyncStorage.getItem(`cartBorrow_${userId}`);
        if (borrowCartData) {
          dispatch({ type: "UPDATE", payload: JSON.parse(borrowCartData) });
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadBorrowCart();
  }, []);

  useEffect(() => {
    const saveBorrowCart = async () => {
      if (cart) {
        await AsyncStorage.setItem(`cartBorrow_${userId}`, JSON.stringify(cart));
      } else {
        await AsyncStorage.removeItem(`cartBorrow_${userId}`);
      }
    };
    saveBorrowCart();
  }, [cart]);

  return(
    <MyBorrowCartContext.Provider value={[cart, dispatch]}>
      {children}
    </MyBorrowCartContext.Provider>
  ) 
}
