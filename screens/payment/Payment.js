import { useEffect, useState } from "react";
import { FlatList, View } from "react-native"
import { Text } from "react-native-paper";

const Payment = () => {
    const [paymntHistory, setPaymentHistory] = useState([]);
    const loadPaymentHistory = async () => {
        try {
        }catch (error) {
        }
    }

    useEffect(() => {
        loadPaymentHistory();
    }, []);

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>
            Lịch sử thanh toán
        </Text>
        <FlatList>

        </FlatList>
    </View>
  )
}

export default Payment;