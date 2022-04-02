import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";

import YoutubePlayer from "react-native-youtube-iframe";

import { fetchKey, fetchGenre } from "./services/api";

import IconRow from "../components/IconRow";
import HeaderOverview from "../components/HeaderOverview";

const OverviewScreen = ({ navigation, route }) => {
  const [employees, setEmployees] = useState([]);
  const [youtubeKey, setyoutubeKey] = useState("");
  const [playing, setPlaying] = useState(false);

  const [genress, setGenres] = useState("");
  let arr = [];
  let video = "";
  const togglrePlaying = useCallback(async () => {
    await fetch(
      "https://api.themoviedb.org/3/movie/" +
        route.params.item.id +
        "/videos?api_key=1a24f47a1c3360e034c8cecab79575d9&language=en-US"
    )
      .then((response) => response.json())
      .then((json) => setVideos(json.results))
      .catch((error) => alert(error));
    await console.log(videos);
    console.log(route.params.item.id);
  }, []);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    console.log(route.params.item.genre_ids);

    fetchData()
      .then((employeees) => {
        const emp = JSON.stringify(employeees[0].key);
        setEmployees(emp.replace(/['"]+/g, ""));
        console.log(emp + " GfbNLLcrItI");
      })
      .catch((err) => {
        console.log(err + " wtf");
      });

    fetchGenre().then((genres) => {
      const emp = JSON.stringify(genres);
      console.log(emp);
      genres.map((gen) => {
        route.params.item.genre_ids.map((g) => {
          if (gen.id == g) {
            setGenres(gen.name);
            arr.push(gen.name);
            console.log(arr);
          }
        });
      });
    });
  }, []);

  const fetchData = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        route.params.item.id +
        "/videos?api_key=1a24f47a1c3360e034c8cecab79575d9&language=en-US"
    );
    const json = await res.json();
    const r = json.results;
    return json.results;
  };

  return (
    <View style={styles.container}>
      <HeaderOverview navigation={navigation} />
      <ImageBackground
        resizeMode={"cover"}
        style={styles.img}
        source={{
          uri:
            "http://image.tmdb.org/t/p/w500/" + route.params.item.backdrop_path,
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          <Text style={styles.heading}>{route.params.item.title}</Text>
        </View>

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.5)"]}
          style={styles.img}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity>
              <Icon
                name="play"
                size={30}
                color="#D81120"
                onPress={(item) => {
                  console.log(video + " :onpress");

                  navigation.navigate("youtube", {
                    user: {
                      id: "jane",
                      firstName: employees,
                      lastName: video == null ? "h" : video,
                      age: 25,
                    },
                  });
                }}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
      <Card>
        <Card.Content style={styles.container}>
          <View style={styles.rowContainer}>
            <IconRow
              iconText={route.params.item.vote_average}
              iconName="star"
              color="#D81120"
            />
            <IconRow
              iconText={route.params.item.release_date}
              iconName="calendar"
              color="#D81120"
            />
            <IconRow
              iconText={route.params.item.media_type}
              iconName="tv"
              color="#D81120"
            />
          </View>

          {arr.map((gen, index) => (
            <View style={styles.rowContainer}>
              <TouchableOpacity
                style={styles.SubmitButtonStyle}
                activeOpacity={0.5}
                onPress={this.ButtonClickCheckFunction}
              >
                <Text style={styles.TextStyle}> {arr[0]} </Text>
              </TouchableOpacity>
            </View>
          ))}

          <Paragraph style={styles.paragraph}>
            {route.params.item.overview}
          </Paragraph>
        </Card.Content>
        <Card.Actions></Card.Actions>
      </Card>
    </View>
  );

  function handleNavigation() {}

  function print(video) {
    console.log(video.key);
  }
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingVertical: 0,
    backgroundColor: "#0A0A0B",
  },

  cover: {
    resizeMode: "contain",
  },

  img: {
    width: "100%",
    height: 300,
  },

  rowContainer: {
    alignItems: "center",
    paddingTop: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  heading: {
    color: "white",
    fontSize: 30,
  },

  paragraph: {
    color: "white",
  },

  SubmitButtonStyle: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#D81120",
    borderRadius: 10,
  },

  TextStyle: {
    color: "#fff",
    textAlign: "center",
  },
});

export default OverviewScreen;
