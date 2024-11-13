import React from "react";
import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import styles from "./style";

import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface EditButtonProps extends TouchableOpacityProps {
  id: string;
  path: string;
}

const EditButton: React.FC<EditButtonProps> = ({ id, path, ...props }) => {

  const router = useRouter();
  
  const handlePress = () => {
    console.log(`Navegando para: ${path}/${id}/edit`);
    router.push(`${path}/${id}/edit`);
  };

  return (
    <View>
      <TouchableOpacity style={styles.buttonEdit} onPress={handlePress} {...props}>
        <FontAwesome  name="edit" style = {styles.buttonText}/>
      </TouchableOpacity>
    </View>
  );
};

export default EditButton;
