import { useState } from "react";
import { View, TouchableOpacity } from "react-native";

export default function Expandable({ children, style }: { children: any, style: any}) {

    const [ isExpanded, setIsExpanded ] = useState(false)

    return (
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
            <View style={[style, !isExpanded && { maxHeight: 71, overflow: "hidden" }]}>
                {children}
            </View>
        </TouchableOpacity>
    )
}