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
export const fetchKey = async ({ vidId }) => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/" +
      vidId +
      "/videos?api_key=1a24f47a1c3360e034c8cecab79575d9&language=en-US"
  );
  const json = await res.json();
  const r = json.results;
  return json.results;
};
