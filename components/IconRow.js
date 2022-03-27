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
import Icon from "react-native-vector-icons/FontAwesome";

const IconRow = ({ iconName, iconText, color }) => {
  return (
    <View style={styles.row}>
      <Icon name={iconName} size={15} color={color} />
      <Text style={styles.rateText}>{iconText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 15,
  },
  rateText: {
    color: "white",
    paddingHorizontal: 5,
  },
});

export default IconRow;
