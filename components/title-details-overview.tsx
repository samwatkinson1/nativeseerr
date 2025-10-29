import { LegendList } from "@legendapp/list";
import { useTheme } from "@react-navigation/core";
import { intlFormat } from "date-fns";
import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import { FC } from "react";
import { PlatformColor, Pressable, StyleSheet, Text, View } from "react-native";

import { StatusBadgeMini } from "@/components/status-badge-mini";
import { Tag } from "@/components/tag";
import { TitleDetailsProps } from "@/components/title-details";
import { sortCrewPriority } from "@/utils/sort-crew-priority";

export interface TitleDetailsOverviewProps extends TitleDetailsProps {}

export const TitleDetailsOverview: FC<TitleDetailsOverviewProps> = ({ title }) => {
  const { colors, dark, fonts } = useTheme();

  const crew = sortCrewPriority(title.credits?.crew).slice(0, 6);

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <Text style={{ ...styles.title, ...styles.tagline }}>{title.tagline}</Text>

      <View style={{ gap: 8 }}>
        <Text style={{ ...styles.title, ...fonts.heavy, color: colors.text }}>Overview</Text>
        <Text style={{ ...styles.body, ...fonts.regular, color: colors.text }}>
          {title.overview}
        </Text>
      </View>

      {crew.length > 0 && (
        <View>
          <LegendList
            data={crew}
            extraData={{ dark }}
            numColumns={2}
            keyExtractor={(item) => `${item.creditId}`}
            renderItem={({ item }) => (
              <View style={{ paddingBottom: 24 }}>
                <Text style={{ ...styles.body, ...fonts.heavy, color: colors.text }}>
                  {item.job}
                </Text>
                <Text style={{ ...styles.body, ...fonts.regular, color: colors.text }}>
                  {item.name}
                </Text>
              </View>
            )}
          />

          {/* todo: crew sheet */}
          <Link href="/" style={{ ...styles.callout, ...fonts.regular, color: colors.primary }}>
            View full crew
          </Link>
        </View>
      )}

      {/* todo: keywords link */}
      {title.keywords && title.keywords.length > 0 && (
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {title.keywords.map((keyword) => (
            <Link key={`${keyword.id}-${keyword.name}`} href="/" asChild>
              <Tag>{keyword.name}</Tag>
            </Link>
          ))}
        </View>
      )}

      {title.seasons && title.seasons.length > 0 && (
        <View style={{ gap: 8 }}>
          <Text style={{ ...styles.title, ...fonts.heavy, color: colors.text, paddingBottom: 8 }}>
            Seasons
          </Text>

          {title.seasons
            .slice()
            .reverse()
            .filter(
              (season) =>
                // todo
                // settings.currentSettings.enableSpecialEpisodes ||
                season.seasonNumber !== 0 && season.episodeCount! > 0
            )
            .map((season) => {
              // todo
              const request = (title.mediaInfo?.requests ?? [])
                .filter((r) => !!r.seasons.find((s) => s.seasonNumber === season.seasonNumber))
                .sort(
                  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                )[0];
              return (
                <Pressable
                  key={season.id}
                  style={{
                    ...styles.seasonItem,
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  }}
                  // todo: present episode sheet
                  onPress={() => console.log(season.id)}
                >
                  <View style={{ gap: 4, flexDirection: "row", alignItems: "baseline" }}>
                    <Text style={{ ...styles.body, ...fonts.medium, color: colors.text }}>
                      Season {season.seasonNumber}
                    </Text>
                    <Tag hideIcon style={{ backgroundColor: colors.background }}>
                      {season.episodeCount} episodes
                    </Tag>
                  </View>

                  <View style={{ gap: 4, flexDirection: "row", alignItems: "center" }}>
                    {request?.status && <StatusBadgeMini status={request.status} />}
                    <SymbolView
                      name="chevron.right"
                      style={{ width: 16, height: 16 }}
                      tintColor={colors.text}
                    />
                  </View>
                </Pressable>
              );
            })}
        </View>
      )}

      {/* todo: media facts */}
      <View>
        <View style={{ borderBottomWidth: 1, borderColor: colors.border }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              paddingVertical: 8,
            }}
          >
            <Text style={{ ...styles.body, ...fonts.bold, color: colors.text }}>Status</Text>
            <Text
              style={{ ...styles.body, ...fonts.regular, color: PlatformColor("secondaryLabel") }}
            >
              {title.status}
            </Text>
          </View>
        </View>

        {title.firstAirDate && (
          <View style={{ borderBottomWidth: 1, borderColor: colors.border }}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                paddingVertical: 8,
              }}
            >
              <Text style={{ ...styles.body, ...fonts.bold, color: colors.text }}>
                First Air Date
              </Text>
              <Text
                style={{ ...styles.body, ...fonts.regular, color: PlatformColor("secondaryLabel") }}
              >
                {intlFormat(title.firstAirDate, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* todo: sliders */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingBottom: 16, gap: 16 },
  title: { fontSize: 22, lineHeight: 28 },
  body: { fontSize: 17, lineHeight: 22 },
  callout: { fontSize: 16, lineHeight: 21, textAlign: "right" },
  tagline: { fontStyle: "italic", color: PlatformColor("secondaryLabel") },
  seasonItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
