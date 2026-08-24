import { View, Text } from "react-native";

const styles = {
    chip: {
        backgroundColor: "BACKGROUND_SCRIM",
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
        color: "WHITE_500",
        fontSize: 12
      }
} as const;

export default function Chip({ duration }: { duration: string }) {

    return (
        <View style={styles.chip}>
            <Text style={styles.text}>{duration}</Text>
        </View>
    );
}