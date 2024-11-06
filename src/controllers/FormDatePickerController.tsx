import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Platform } from "react-native";
import DatePicker from "react-native-date-picker";
import {
  Controller,
  Control,
  FieldErrors,
  FieldValues,
  FieldPath,
} from "react-hook-form";
import styles from "../components/Input/style";

interface FormDatePickerControllerProps<T extends FieldValues> {
  control: Control<T>;
  errors?: FieldErrors<T>;
  name: FieldPath<T>;
  label?: string;
  date: "";
}

export function FormDatePickerController<T extends FieldValues>({
  control,
  errors,
  name,
  label,
}: FormDatePickerControllerProps<T>) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <View style={styles.inputContainer}>
      {label && <Text>{label}</Text>}
      {errors && errors[name] && (
        <Text style={styles.errorText}>{errors[name]?.message as string}</Text>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <>
            <Button title="Selecionar Data" onPress={() => setOpen(true)} />
            <DatePicker
              modal
              open={open}
              date={date}
              onConfirm={(date) => {
                setOpen(false);
                setDate(date);
                onChange(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
              mode="date"
              title="Escolha uma Data"
              confirmText="Confirmar"
              cancelText="Cancelar"
            />
            {Platform.OS === "ios" && (
              <Text>{value ? value.toDateString() : "Nenhuma data selecionada"}</Text>
            )}
          </>
        )}
      />
    </View>
  );
}
