import { Design } from '@revenge-mod/discord/design'
import { Tokens } from "@revenge-mod/discord/common/tokens"
import { View, Text, Image } from "react-native"

import ExpandableCard from "./ExpandableCard";
import Chip from "./Chip";

const { Stack, createStyles } = Design;

const Avatar = revenge.modules.finders.filters.withProps(
    "default",
    "AvatarSizes",
    "getStatusSize",
)

const useMessageCardStyles = createStyles({
    card: {
        backgroundColor: Tokens.default.colors.CARD_SECONDARY_BG,
        borderRadius: 10,
        padding: 16,
        gap: 8,
    },
    header: {
        fontFamily: "ggsans-Semibold, NotoSans-Semibold",
        lineHeight: 18,
        variant: "text-sm/semibold",
        fontSize: 14
    },
    message: {
        fontFamily: "ggsans-Medium, NotoSans-Medium",
        lineHeight: 18,
        fontSize: 14
    },
});

export default function MessageCard({ message, header }) {
    const messageCardStyles = useMessageCardStyles();
    
    const { attachments, author, content, stickerItems: stickers } = message;

    const extensions = [ "", "png", "apng", "json", "gif" ];
    const formatType = stickers[0]?.format_type;
    const type = extensions[formatType];
    const stickerUrl = `https://media.discordapp.net/stickers/${stickers[0]?.id}.${type}`;

    if (message.type === 7) return;

    return (
        <Stack spacing={8}>
            <ExpandableCard style={messageCardStyles.card}>
                <View style={{display: "flex", flexDirection: "row"}}>
                    <Avatar user={author?.id} avatarDecoration={author?.avatarDecoration} />
                    <View style={{flex: 1, marginLeft: 12}}>
                        <Text selectable style={messageCardStyles.header}>
                            {message.nick ?? author.username}
                        </Text>
                        {content.length > 0 && (
                            <Text selectable style={messageCardStyles.message}>
                                {content}
                            </Text>
                        )}
                        {stickers.length > 0 && (
                            <View style={{ width: "100%" }}>
                                {/* TODO: add APNG and Lottie support */}
                                {(type === "png" || type === "gif") && (
                                    <Image
                                        source={{ uri: stickerUrl }}
                                        style={{ width: 160, height: 160 }}
                                        resizeMode="contain"
                                    />
                                )}
                            </View>
                        )}
                        {attachments.length > 0 && (
                            <View style={{ gap: 5, width: "100%" }}>
                                {attachments.map((attachment: any) => {
                                    const supportedExtentions = attachment.filename?.match(/\.(png|jpg|jpeg|gif|webp|mp4|mov)$/);
                                    if (!supportedExtentions) return;

                                    const isVideo = attachment.filename?.match(/\.(mp4|mov)$/);
                                    const imageUri = isVideo ? attachment.proxy_url : attachment.url;

                                    const duration = (seconds: number): string => {
                                        const mins = Math.floor(seconds / 60);
                                        const secs = Math.floor(seconds % 60);

                                        return `${mins}:${String(secs).padStart(2, '0')}`;
                                    };

                                    return (
                                        <>
                                            <Image
                                                key={attachment.id} 
                                                source={{ uri: imageUri }}
                                                style={{ aspectRatio: attachment.width / attachment.height, borderRadius: 8 }}
                                                resizeMode="contain"
                                            />
                                            {isVideo && (
                                                <Chip duration={duration(attachment.duration_secs)} />
                                            )}
                                        </>
                                    );
                                })}
                            </View>
                        )}
                    </View>
                </View>
            </ExpandableCard>
            {header}
        </Stack>
    );
};