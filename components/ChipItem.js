import { Chip } from "react-native-paper";
import { Theme } from "../styles/Theme";

const ChipItem = ({ label, isSelected = false, selected, onPress }) => {
    if (!label) {
        return null;
    }

    const chipSelected = typeof selected === "boolean" ? selected : isSelected;
    const chipColor = chipSelected ? Theme.colors.primary : Theme.colors.surfaceContainerLow;
    const textColor = chipSelected ? Theme.colors.onPrimary : Theme.colors.onSurfaceVariant;

    return (
        <Chip
            style={{
                backgroundColor: chipColor,
                margin: 6,
                paddingHorizontal: 3,
                borderRadius: Theme.rounded.full,
                borderWidth: 1,
                borderColor: chipSelected ? Theme.colors.primary : Theme.colors.outlineVariant,
                alignSelf: 'flex-start',
            }}
            textStyle={{ color: textColor }}
            onPress={onPress}
        >
            {label}
        </Chip>
    );
}

export default ChipItem;