import { ScrollView, StyleSheet, View } from "react-native";

import { Company, CompanyCard } from "@/components/company-card";
import { SliderHeader } from "@/components/slider-header";

export function NetworkSlider() {
  return (
    <View style={styles.container}>
      <SliderHeader title="Networks" />
      <ScrollView horizontal scrollIndicatorInsets={{ left: 16, right: 16 }}>
        {networks.map((company, i) => {
          return (
            <CompanyCard
              key={`network-${company.name}`}
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
const networks: Company[] = [
  {
    name: "Netflix",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/wwemzKWzjKYJFfCeiB57q3r4Bcm.png",
    url: "/series",
  },
  {
    name: "Disney+",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/gJ8VX6JSu3ciXHuC2dDGAo2lvwM.png",
    url: "/series",
  },
  {
    name: "Prime Video",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/ifhbNuuVnlwYy5oXA5VIb2YR8AZ.png",
    url: "/series",
  },
  {
    name: "Apple TV+",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/4KAy34EHvRM25Ih8wb82AuGU7zJ.png",
    url: "/series",
  },
  {
    name: "Hulu",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/pqUTCleNUiTLAVlelGxUgWn1ELh.png",
    url: "/series",
  },
  {
    name: "HBO",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/tuomPhY2UtuPTqqFnKMVHvSb724.png",
    url: "/series",
  },
  {
    name: "Discovery+",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/1D1bS3Dyw4ScYnFWTlBOvJXC3nb.png",
    url: "/series",
  },
  {
    name: "ABC",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/ndAvF4JLsliGreX87jAc9GdjmJY.png",
    url: "/series",
  },
  {
    name: "FOX",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/1DSpHrWyOORkL9N2QHX7Adt31mQ.png",
    url: "/series",
  },
  {
    name: "Cinemax",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/6mSHSquNpfLgDdv6VnOOvC5Uz2h.png",
    url: "/series",
  },
  {
    name: "AMC",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/pmvRmATOCaDykE6JrVoeYxlFHw3.png",
    url: "/series",
  },
  {
    name: "Showtime",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/Allse9kbjiP6ExaQrnSpIhkurEi.png",
    url: "/series",
  },
  {
    name: "Starz",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/8GJjw3HHsAJYwIWKIPBPfqMxlEa.png",
    url: "/series",
  },
  {
    name: "The CW",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/ge9hzeaU7nMtQ4PjkFlc68dGAJ9.png",
    url: "/series",
  },
  {
    name: "NBC",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/o3OedEP0f9mfZr33jz2BfXOUK5.png",
    url: "/series",
  },
  {
    name: "CBS",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/nm8d7P7MJNiBLdgIzUK0gkuEA4r.png",
    url: "/series",
  },
  {
    name: "Paramount+",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/fi83B1oztoS47xxcemFdPMhIzK.png",
    url: "/series",
  },
  {
    name: "BBC One",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/mVn7xESaTNmjBUyUtGNvDQd3CT1.png",
    url: "/series",
  },
  {
    name: "Cartoon Network",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/c5OC6oVCg6QP4eqzW6XIq17CQjI.png",
    url: "/series",
  },
  {
    name: "Adult Swim",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/9AKyspxVzywuaMuZ1Bvilu8sXly.png",
    url: "/series",
  },
  {
    name: "Nickelodeon",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/ikZXxg6GnwpzqiZbRPhJGaZapqB.png",
    url: "/series",
  },
  {
    name: "Peacock",
    image:
      "https://image.tmdb.org/t/p/w780_filter(duotone,ffffff,bababa)/gIAcGTjKKr0KOHL5s4O36roJ8p7.png",
    url: "/series",
  },
];
