import React from "react";
import { View, TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import styles from "./style";

interface FormButtonProps extends TouchableOpacityProps {
  label: string;
}

const FormButton: React.FC<FormButtonProps> = ({ label, ...props }) => {
  return (
    <View>
      <TouchableOpacity style={styles.buttonForm} {...props}>
        <Text style={styles.textButtonForm}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormButton;
