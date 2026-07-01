import { Text } from "react-native-paper";
import { Theme } from "../styles/Theme";

const TagItem = ({ tag, onPress }) => {
    if (!tag) {
        return null;
    }
    return (
            <Text
                variant="bodySmall"
                onPress={onPress}
                style={{
                    backgroundColor: Theme.colors.secondaryContainer,
                    color: Theme.colors.onSecondaryContainer,
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    borderRadius: Theme.rounded.sm,
                    marginTop: 8,
                    marginLeft: 6,
                    alignSelf: "flex-start",
                    borderWidth: 1,
                    borderColor: Theme.colors.outlineVariant,
                }}
            >
                {tag}
            </Text>

    );
}

export default TagItem;