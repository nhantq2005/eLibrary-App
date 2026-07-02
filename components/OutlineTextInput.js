import { TextInput } from "react-native-paper";
import styles from '../styles/LoginStyles';
import { Theme } from "../styles/Theme";

const OutlineTextInput = ({ placeholder, value, onChangeText, ...props }) => {
    return (
        <TextInput
            mode="outlined"
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            style={styles.outlineTextInput}
            outlineColor={Theme.colors.outline}
            activeOutlineColor={Theme.colors.outline}
            outlineStyle={{ borderRadius: 25 }}
            
            {...props}
        />
    );
}

export default OutlineTextInput;