import { useContext, useMemo } from "react"
import { MyBorrowCartContext, MyBuyCartContext } from "../utils/MyContexts"

export const useCartTotals = () => {
    const [cartBuy,] = useContext(MyBuyCartContext)
    const [cartBorrow,] = useContext(MyBorrowCartContext)

    const totals = useMemo (() => {
        let totalQuantity = 0
        let totalAmount = 0

        if (typeof cartBuy === 'object' && cartBuy !== null) {
            for (const item of Object.values(cartBuy)) {
                totalQuantity += item.quantity || 0
                totalAmount += (item.price || 0) * (item.quantity || 0)
            }
        }

        if (typeof cartBorrow === 'object' && cartBorrow !== null) {
            for (const item of Object.values(cartBorrow)) {
                totalQuantity += item.quantity || 0
            }
        }

        return { totalQuantity, totalAmount }
    }, [cartBuy, cartBorrow])

    return totals
}