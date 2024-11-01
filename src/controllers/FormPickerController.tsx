import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../components/Input/style";
import {
  Controller,
  Control,
  FieldErrors,
  FieldValues,
  FieldPath,
} from "react-hook-form";

interface FormPickerControllerProps<T extends FieldValues> {
  control: Control<T>;
  errors?: FieldErrors<T>;
  name: FieldPath<T>;
  label?: string;
  options: { label: string; value: any}[]; // Opções para o Picker
  placeholder?: string;
}

export function FormPickerController<T extends FieldValues>({
  control,
  errors,
  name,
  label,
  options,
  placeholder = "Selecione uma opção",
}: FormPickerControllerProps<T>) {
  return (
    <View style={styles.inputContainer}>
      <Text>{label}</Text>
      {errors && errors[name] && (
        <Text style={styles.errorText}>{errors[name]?.message as string}</Text>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Picker
            selectedValue={value}
            onValueChange={onChange}
            style={styles.inputPicker}
          >
            <Picker.Item label={placeholder} value={null}/>
            {options.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        )}
      />
    </View>
  );
}

