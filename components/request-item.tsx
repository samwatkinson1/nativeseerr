import {
  Button,
  Host,
  HStack,
  Image as SwiftImage,
  Text as SwiftText,
  VStack,
} from "@expo/ui/swift-ui";
import { frame, padding } from "@expo/ui/swift-ui/modifiers";
import { useTheme } from "@react-navigation/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format, formatDistanceToNowStrict } from "date-fns";
import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { ActionSheetIOS, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

import { StatusBadgeMini } from "@/components/status-badge-mini";
import { MediaRequestStatus, MediaStatus } from "@/const/media";
import { MediaRequest, MovieDetails, TvDetails } from "@/http/gen";
import {
  deleteMediaByMediaIdFileMutation,
  deleteRequestByRequestIdMutation,
  getRequestQueryKey,
} from "@/http/gen/@tanstack/react-query.gen";

export interface RequestItemProps {
  baseUrl: string | null;
  request: MediaRequest;
  title: MovieDetails & TvDetails;
  style?: StyleProp<ViewStyle>;
}

export function RequestItem({ baseUrl, request, title, style }: RequestItemProps) {
  const queryClient = useQueryClient();
  const { colors, fonts } = useTheme();

  const deleteRequest = useMutation({ ...deleteRequestByRequestIdMutation() });
  const deleteFile = useMutation({ ...deleteMediaByMediaIdFileMutation() });

  const { canRemove, createdAt, profileName, requestedBy, status, updatedAt } = request;
  const requestId = request.id;
  const avatar = baseUrl && requestedBy?.avatar ? `${baseUrl}${requestedBy?.avatar}` : "";
  const displayName = requestedBy?.displayName;

  const { backdropPath, posterPath, mediaInfo } = title;
  const mediaId = mediaInfo?.id;
  const mediaType = mediaInfo?.mediaType;
  const mediaStatus = mediaInfo?.status;

  const titleId = title.id;
  const titleName = mediaType === "movie" ? title.title : title.name;

  const subheadingDate = mediaType === "movie" ? title.releaseDate : title.firstAirDate;

  async function showActionSheet(): Promise<void> {
    return new Promise((resolve, reject) => {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Confirm", "Cancel"],
          destructiveButtonIndex: 0,
          title: "Are you sure?",
          message: "This action cannot be undone.",
        },
        (index) => {
          if (index !== 0) return reject();
          return resolve();
        }
      );
    });
  }

  async function handleDeleteRequest() {
    if (!requestId) return;
    try {
      await showActionSheet();
      await deleteRequest.mutateAsync({ path: { requestId: `${requestId}` } });
      void queryClient.refetchQueries({ queryKey: getRequestQueryKey() });
    } catch {
      // no-op
    }
  }

  async function handleDeleteFile() {
    if (!mediaId) return;
    try {
      await showActionSheet();
      await deleteFile.mutateAsync({ path: { mediaId: `${mediaId}` } });
      void queryClient.refetchQueries({ queryKey: getRequestQueryKey() });
    } catch {
      // no-op
    }
  }

  return (
    <View style={StyleSheet.compose({ ...styles.base }, style)}>
      <ImageBackground
        source={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${backdropPath}`}
        contentFit="cover"
        imageStyle={{ ...styles.radius }}
        style={{ ...styles.base, ...styles.card, ...styles.radius, borderColor: colors.border }}
      >
        <LinearGradient
          colors={["rgba(17, 24, 39, 0.47)", "rgba(17, 24, 39, 1)"]}
          start={[0, 0]}
          end={[1, 1.65]}
          locations={[0, 0.75]}
          style={{ ...styles.gradient, ...styles.radius }}
        />

        <Link href={mediaType === "movie" ? `/movies/${titleId}` : `/series/${titleId}`}>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Image
              source={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${posterPath}`}
              style={styles.poster}
            />

            <View>
              {subheadingDate && (
                <Text style={{ ...styles.subheading, ...fonts.medium }}>
                  {format(subheadingDate, "yyyy")}
                </Text>
              )}
              <Text numberOfLines={1} style={{ ...styles.title, ...fonts.heavy }}>
                {titleName}
              </Text>
            </View>
          </View>
        </Link>

        {/* todo: permissions */}
        <View>
          <View style={styles.line}>
            <Text style={{ color: "lightgray", ...fonts.heavy }}>Status</Text>
            {/* todo: status badge component */}
            {mediaStatus && mediaStatus !== MediaStatus.UNKNOWN && (
              <StatusBadgeMini status={mediaStatus} />
            )}
          </View>

          {createdAt && (
            <View style={styles.line}>
              <Text style={{ color: "lightgray", ...fonts.heavy }}>Requested</Text>

              <View style={styles.requestor}>
                <Text style={{ color: "white" }}>
                  {formatDistanceToNowStrict(createdAt, { addSuffix: true })} by
                </Text>
                {avatar && <Image source={avatar} style={styles.avatar} />}
                <Text numberOfLines={1} style={{ ...styles.displayName, ...fonts.bold }}>
                  {displayName}
                </Text>
              </View>
            </View>
          )}

          {updatedAt && (
            <View style={styles.line}>
              <Text style={{ color: "lightgray", ...fonts.heavy }}>Modified</Text>

              <View style={styles.requestor}>
                <Text style={{ color: "white" }}>
                  {formatDistanceToNowStrict(updatedAt, { addSuffix: true })} by
                </Text>
                {avatar && <Image source={avatar} style={styles.avatar} />}
                <Text numberOfLines={1} style={{ ...styles.displayName, ...fonts.bold }}>
                  {displayName}
                </Text>
              </View>
            </View>
          )}

          {profileName && (
            <View style={styles.line}>
              <Text style={{ color: "lightgray", ...fonts.heavy }}>Profile</Text>
              <Text style={{ color: "white" }}>{profileName}</Text>
            </View>
          )}
        </View>

        <Host matchContents>
          <VStack spacing={8}>
            {status !== MediaRequestStatus.PENDING && (
              <>
                <Button variant="glassProminent" role="destructive" onPress={handleDeleteRequest}>
                  <HStack
                    spacing={8}
                    modifiers={[frame({ maxWidth: Infinity }), padding({ all: 4 })]}
                  >
                    <SwiftImage systemName="trash.fill" size={16} />
                    <SwiftText weight="bold">Delete Request</SwiftText>
                  </HStack>
                </Button>
                {canRemove && (
                  <Button variant="glassProminent" role="destructive" onPress={handleDeleteFile}>
                    <HStack
                      spacing={8}
                      modifiers={[frame({ maxWidth: Infinity }), padding({ all: 4 })]}
                    >
                      <SwiftImage systemName="trash.fill" size={16} />
                      <SwiftText weight="bold">
                        {mediaType === "movie" ? "Remove from Radarr" : "Remove from Sonarr"}
                      </SwiftText>
                    </HStack>
                  </Button>
                )}
              </>
            )}
          </VStack>
        </Host>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { width: "100%", flex: 1 },
  card: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderStyle: "solid",
    borderWidth: 1,
    gap: 16,
  },
  gradient: { position: "absolute", inset: 0 },
  radius: { borderRadius: 12 },
  poster: { width: 48, height: 76, borderRadius: 6 },
  subheading: { color: "white", fontSize: 13, lineHeight: 18 },
  title: { color: "white", fontSize: 17, lineHeight: 22 },
  line: { flexDirection: "row", gap: 8, alignItems: "center" },
  requestor: { flexDirection: "row", gap: 4, alignItems: "center" },
  avatar: { width: 20, height: 20, borderRadius: 999 },
  displayName: { color: "darkgray", fontSize: 15, lineHeight: 20 },
});
