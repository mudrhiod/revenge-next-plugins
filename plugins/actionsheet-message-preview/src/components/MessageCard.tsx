import { Design } from '@valenced/discord/design';
import { Image, View, type ImageSourcePropType } from 'react-native';
import { proxify } from '@valenced/utils/proxy';
import { Tokens } from '@valenced/discord/common/tokens';
import { AssetId } from '@valenced/assets/types';

import ExpandableCard from "./ExpandableCard";
import Chip from "./Chip";

const { Stack, createStyles, Text } = Design;

type AvatarUser = {
    getAvatarURL(guildId?: string | null, size?: number): string | AssetId
};

function getAvatarSource(
    user: AvatarUser,
    guildId?: string | null | undefined
): ImageSourcePropType {
    const avatar = user.getAvatarURL(guildId, 32);
    return typeof avatar === 'string' ? { uri: avatar } : avatar;
};

const useMessageCardStyles = proxify(() => 
    createStyles({
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
    })
);

export default function MessageCard({ message, header }) {
    const styles = useMessageCardStyles();
    
    const { attachments, author, content, stickerItems: stickers } = message;

    const extensions = [ "", "png", "apng", "json", "gif" ];
    const formatType = stickers[0]?.format_type;
    const type = extensions[formatType];
    const stickerUrl = `https://media.discordapp.net/stickers/${stickers[0]?.id}.${type}`;

    if (message.type === 7) return;

    return (
        <Stack spacing={8}>
            <ExpandableCard style={styles.card}>
                <View style={{display: "flex", flexDirection: "row"}}>
                    <Image
                        source={getAvatarSource(author, message.guild_id)}
                        style={{ width: 32, height: 32, borderRadius: 16 }}
                    />
                    <View style={{flex: 1, marginLeft: 12}}>
                        <Text style={styles.header}>
                            {message.nick ?? author.username}
                        </Text>
                        {content.length > 0 && (
                            <Text style={styles.message}>
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