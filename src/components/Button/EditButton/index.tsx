import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
} from "react-native";
import styles from "./style";

import { FontAwesome } from "@expo/vector-icons";

interface AddButtonProps extends TouchableOpacityProps {}

const EditButton: React.FC<AddButtonProps> = ({ ...props }) => {
  return (
    <View>
      <TouchableOpacity style={styles.buttonEdit} {...props}>
        <FontAwesome  name="edit" style = {styles.buttonText}/>
      </TouchableOpacity>
    </View>
  );
};

export default EditButton;
