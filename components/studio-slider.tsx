import { ScrollView, StyleSheet, View } from "react-native";

import { Company, CompanyCard } from "@/components/company-card";
import { SliderHeader } from "@/components/slider-header";

export function StudioSlider() {
  return (
    <View style={styles.container}>
      <SliderHeader title="Studios" />
      <ScrollView horizontal scrollIndicatorInsets={{ left: 16, right: 16 }}>
        {studios.map((company, i) => {
          return (
            <CompanyCard
              key={`studio-${company.name}`}
              company={company}
              style={i === 0 ? styles.cardFirst : styles.card}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  card: { marginRight: 16 },
  cardFirst: { marginHorizontal: 16 },
});

// todo: correct href
const studios: Company[] = [
  {
    name: "Disney",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/wdrCwmRnLFJhEoH8GSfymY85KHT.png",
    url: "/movies",
  },
  {
    name: "20th Century Studios",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/h0rjX5vjW5r8yEnUBStFarjcLT4.png",
    url: "/movies",
  },
  {
    name: "Sony Pictures",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/GagSvqWlyPdkFHMfQ3pNq6ix9P.png",
    url: "/movies",
  },
  {
    name: "Warner Bros. Pictures",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/ky0xOc5OrhzkZ1N6KyUxacfQsCk.png",
    url: "/movies",
  },
  {
    name: "Universal",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/8lvHyhjr8oUKOOy2dKXoALWKdp0.png",
    url: "/movies",
  },
  {
    name: "Paramount",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/fycMZt242LVjagMByZOLUGbCvv3.png",
    url: "/movies",
  },
  {
    name: "Pixar",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/1TjvGVDMYsj6JBxOAkUHpPEwLf7.png",
    url: "/movies",
  },
  {
    name: "Dreamworks",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/kP7t6RwGz2AvvTkvnI1uteEwHet.png",
    url: "/movies",
  },
  {
    name: "Marvel Studios",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/hUzeosd33nzE5MCNsZxCGEKTXaQ.png",
    url: "/movies",
  },
  {
    name: "DC",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/2Tc1P3Ac8M479naPp1kYT3izLS5.png",
    url: "/movies",
  },
  {
    name: "A24",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/1ZXsGaFPgrgS6ZZGS37AqD5uU12.png",
    url: "/movies",
  },
];
