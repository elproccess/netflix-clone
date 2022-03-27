import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const FilmRow = ({ props, heading, parentCallback }) => {
  const [movie, setMovie] = useState("");

  return (
    <View>
      <Text style={styles.text}>{heading}</Text>
      <ScrollView horizontal={true} style={styles.container}>
        {props.map((m, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              if (m.media_type == "movie") {
                console.log(m.media_type);
                parentCallback(m);
              } else {
              }
            }}
          >
            <Image
              style={styles.image}
              source={{
                uri: "http://image.tmdb.org/t/p/w500/" + m.poster_path,
              }}
              key={index}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },

  image: {
    width: 105,
    height: 160,
    marginTop: 15,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 10,
  },

  text: {
    paddingTop: 10,
    color: "#fff",
    fontWeight: "800",
  },
});

export default FilmRow;
