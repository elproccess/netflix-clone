import React, { Component, useState, useEffect, useCallback } from "react";
import {
  Avatar,
  Button,
  Appbar,
  Card,
  Title,
  Toolbar,
  Paragraph,
} from "react-native-paper";

import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import Carousel from "react-native-snap-carousel"; // Version can be specified in package.json
import Header from "../components/Header";
import FilmRow from "../components/FilmRow";

import { scrollInterpolator, animatedStyles } from "../animations";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

const HomeScreen = ({ navigation }) => {
  // Declare a new state variable, which we'll call "count"
  const [movies, setMovies] = useState([]);
  const [indexiu, setIndex] = useState(0);
  const [latest, setLatest] = useState([]);
  const [rated, setRated] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const onPress = () => setCount((prevCount) => setCount(prevCount + 1));

  useEffect(() => {
    fecthMovies();
    fecthTrending();
    fecthRated();
  }, []);

  let fecthMovies = () => {
    fetch(
      "https://api.themoviedb.org/3/trending/all/day?api_key=1a24f47a1c3360e034c8cecab79575d9"
    )
      .then((response) => response.json())
      .then((json) => setMovies(json.results))
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  };

  let fecthTrending = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=1a24f47a1c3360e034c8cecab79575d9&language=en-US&page=1"
    )
      .then((response) => response.json())
      .then((json) => setLatest(json.results))
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  };

  let fecthRated = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=1a24f47a1c3360e034c8cecab79575d9&language=en-US&page=1"
    )
      .then((response) => response.json())
      .then((json) => setRated(json.results))
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <Carousel
          ref={(c) => (this.carousel = c)}
          data={rated}
          keyExtractor={({ id }, index) => index}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={(item) => handleNavigation(movies[indexiu])}
            >
              <Card>
                <Card.Cover
                  source={{
                    uri: "http://image.tmdb.org/t/p/w500/" + item.poster_path,
                  }}
                />
              </Card>
            </TouchableOpacity>
          )}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          onSnapToItem={(index) => setIndex(index)}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}
        />
        <FilmRow
          props={movies}
          heading={"Top Trending"}
          parentCallback={handleNavigation}
        />
        <FilmRow
          props={latest}
          heading={"Popular on Netflix"}
          parentCallback={handleNavigation}
        />
      </ScrollView>
    </SafeAreaView>
  );

  function handleNavigation(item) {
    navigation.navigate("overview", {
      item: item,
    });
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0A0A0B",
    paddingTop: 10,
    height: "100%",
    width: "100%",
  },

  textfds: {
    color: "#fff",
  },

  carouselContainer: {
    marginTop: 50,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "dodgerblue",
  },

  logo: {
    flex: 1,
    resizeMode: "contain",
    width: null,
  },
  itemLabel: {
    color: "white",
    fontSize: 24,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
