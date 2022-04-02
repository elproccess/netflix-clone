import "react-native-get-random-values";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, Button, ActivityIndicator, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import HeaderOverview from "../components/HeaderOverview";

const YoutubePage = ({ navigation, route }) => {
  let { user } = route.params.user;
  let a = route.params.user.firstName;
  str = a.trim();
  console.log(route.params.user.firstName + "fuck " + str);
  const [playing, setPlaying] = useState(false);
  const [ykey, setYkey] = useState("false");

  useEffect(() => {
    setYkey(route.params.user.lastName);
    console.log(ykey);
  });

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View style={styles.container}>
      <HeaderOverview navigation={navigation} />
      <WebView
        source={{
          uri: "https://www.youtube.com/embed/" + a,
        }}
      />
    </View>
  );
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
});

export default YoutubePage;
