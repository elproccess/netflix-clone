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
  SafeArea,
  SafeAreaSafeAreaView,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Carousel from "react-native-snap-carousel"; // Version can be specified in package.json
import Header from "./components/Header";
import FilmRow from "./components/FilmRow";

import HomeScreen from "./pages/HomeScreen";
import OverviewScreen from "./pages/OverviewScreen";
import YoutubePage from "./pages/youtubePage";

import { scrollInterpolator, animatedStyles } from "./animations";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="overview" component={NewsDescription} />
        <Stack.Screen
          name="youtube"
          component={YoutubePage}
          initialParams={{ title: " " }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const NewsDescription = ({ navigation, route }) => {
  console.log(route);
  return <OverviewScreen route={route} navigation={navigation} />;
};

const YoutubePlay = ({ navigation, item }) => {
  console.log(item);
  return <YoutubePage navigation={navigation} item={item} />;
};

export default App;
