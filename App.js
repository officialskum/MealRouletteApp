import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";

const mealRouletteURL =
  "https://playground.devskills.co/api/rest/meal-roulette-app/meals/limit/4/offset/4";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(mealRouletteURL)
      .then((response) => response.json()) //hämta och hantera JSON
      .then((json) => {
        setData(json.meal_roulette_app_meals_aggregate.nodes);
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View style={{ borderBottomWidth: 1, marginBottom: 12 }}></View>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={{ paddingBottom: 10 }}>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: `${item.picture}`,
                  }}
                />
                <Text style={styles.mealText}>
                  {item.id}. {item.title}
                </Text>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 48,
  },
  mealText: {
    fontSize: 26,
    fontWeight: "200",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    marginBottom: 18,
    fontWeight: "200",
    color: "green",
  },
  tinyLogo: {
    width: 150,
    height: 150,
  },
});

export default App;
