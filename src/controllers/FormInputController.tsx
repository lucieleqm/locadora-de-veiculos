import React from "react";
import { View, TextInput, TextInputProps, Text } from "react-native";
import styles from '../components/Input/style';
import {
  Controller,
  Control,
  FieldErrors,
  FieldValues,
  FieldPath,
} from "react-hook-form";
import { TextInputMask, TextInputMaskTypeProp } from "react-native-masked-text";

interface FormInputControllerProps<T extends FieldValues>
  extends TextInputProps {
  control: Control<T>;
  errors?: FieldErrors<T>;
  name: FieldPath<T>;
  label: string;
  maskType?: TextInputMaskTypeProp; // Máscara opcional
  maskOptions?: object; 
}

export function FormInputController<T extends FieldValues>({
  control,
  errors,
  name,
  label,
  maskType,
  maskOptions,
  ...props
}: FormInputControllerProps<T>) {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text style = {styles.labelInputForm}>{label}</Text>
            {errors && errors[name] && (
              <Text style = {styles.errorText}>
                {errors[name]?.message as string}
              </Text>
            )}
            {maskType ? (
              <TextInputMask
                type={maskType}
                options={maskOptions}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.inputForm}
                {...props}  
              />
            ) : (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value || ""}
                style={styles.inputForm}
                {...props}
              />
            )}
          </View>
        )}
      />
    </View>
  );
}
