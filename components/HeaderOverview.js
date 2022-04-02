import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

const HeaderOverview = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon
          name="arrow-left"
          size={30}
          color="#D81120"
          style={styles.icon}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </TouchableOpacity>

      <Image source={require("../netflix.png")} style={styles.image}></Image>

      <TouchableOpacity style={styles.icon}>
        <Icon name="search" size={30} color="#D81120" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    alignItems: "center",
    paddingTop: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
  },

  image: {
    width: 175,
    height: 50,
  },

  icon: {
    alignContent: "space-between",
    padding: 20,
    color: "#D81120",
  },
});

export default HeaderOverview;
