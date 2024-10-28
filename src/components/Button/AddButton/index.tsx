import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
} from "react-native";
import styles from "./style";

import { Octicons } from "@expo/vector-icons";

interface AddButtonProps extends TouchableOpacityProps {}

const AddButton: React.FC<AddButtonProps> = ({ ...props }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttonAdd} {...props}>
        <Octicons name="plus" style = {styles.buttonText}/>
      </TouchableOpacity>
    </View>
  );
};

export default AddButton;
