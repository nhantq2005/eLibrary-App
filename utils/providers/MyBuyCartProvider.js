import { useEffect, useReducer } from "react";
import { MyBuyCartContext } from "../MyContexts";

export const MyCartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(MyCartReducer, []);

  useEffect(() => {
    const loadBuyCart = async () => {
      try {
        const buyCartData = await AsyncStorage.getItem(`cartBuy_${userId}`);
        if (buyCartData) {
          dispatch({ type: "UPDATE", payload: JSON.parse(buyCartData) });
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadBuyCart();
  }, []);

  useEffect(() => {
    const saveBuyCart = async () => {
      if (cart) {
        await AsyncStorage.setItem(`cartBuy_${userId}`, JSON.stringify(cart));
      } else {
        await AsyncStorage.removeItem(`cartBuy_${userId}`);
      }
    };
    saveBuyCart();
  }, [cart]);

  return(
    <MyBuyCartContext.Provider value={[cart, dispatch]}>
      {children}
    </MyBuyCartContext.Provider>
  )
}
