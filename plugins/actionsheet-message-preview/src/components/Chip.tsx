import { Design } from "@valenced/discord/design";
import { Tokens } from "@valenced/discord/common/tokens";
import { proxify } from "@valenced/utils/proxy";
import { View, Text } from "react-native";

const { createStyles } = Design;

const useChipStyles = proxify(() => 
    createStyles({
        chip: {
            backgroundColor: Tokens.default.colors.BACKGROUND_SCRIM,
            borderRadius: 4,
            paddingHorizontal: 8,
            paddingVertical: 2,
            position: "absolute",
            right: 6,
            bottom: 6
        },
        text: {
            fontFamily: "ggsans-Bold, NotoSans-Bold",
            includeFontPadding: false,
            color: Tokens.default.colors.WHITE,
            fontSize: 12
        }
    })
);

export default function Chip({ duration }: { duration: string }) {
    const styles = useChipStyles();

    return (
        <View style={styles.chip}>
            <Text style={styles.text}>{duration}</Text>
        </View>
    );
}