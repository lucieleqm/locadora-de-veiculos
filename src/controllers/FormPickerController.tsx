import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import styles from "../components/Input/style";
import {
  Controller,
  Control,
  FieldErrors,
  FieldValues,
  FieldPath,
} from "react-hook-form";
import api from "../services/api";

interface FormPickerControllerProps<T extends FieldValues> {
  control: Control<T>;
  errors?: FieldErrors<T>;
  name: FieldPath<T>;
  label?: string;
  options: { label: string; value: any }[];
  setOptions?: React.Dispatch<
    React.SetStateAction<{ label: string; value: any; key:string }[]>
  >;
  placeholder?: string;
  endpoint?: string;
  additionalData?: Record<string, any>;
  labelNovoItem?: string;
}

export function FormPickerController<T extends FieldValues>({
  control,
  errors,
  name,
  label,
  labelNovoItem = name,
  options,
  setOptions,
  placeholder,
  endpoint,
  additionalData,
}: FormPickerControllerProps<T>) {
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState({ nome: "" });

  const handleCreateItem = async () => {
    if (endpoint) {
      try {
        const data = { ...newItem, ...additionalData };
        console.log("Enviando dados:", data);
        const response = await api.post(endpoint, data);
        const newItemData = response.data;
        if (setOptions) {
          setOptions((prevOptions) => [
            ...prevOptions,
            { label: newItemData.nome, value: newItemData.id, key: newItemData.id },
          ]);
        }
      } catch (error) {
        console.error("Erro ao criar item:", error);
      }
    }
    setModalVisible(false);
    // Reseta os campos
    setNewItem({ nome: "", ...additionalData });
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.labelPicker}>{label}</Text>
      {errors && errors[name] && (
        <Text style={styles.errorText}>{errors[name]?.message as string}</Text>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <>
            <RNPickerSelect
              value={value}
              onValueChange={(selectedValue) => {
                if (selectedValue === "novaOpcao") {
                  setModalVisible(true);
                } else {
                  onChange(selectedValue);
                }
              }}
              items={
                endpoint
                  ? [...options, { label: "Outra...", value: "novaOpcao", key: "novaOpcao" }]
                  : options
              }
              placeholder={{
                label: placeholder || "Selecione uma opção",
                value: null,
              }}
              style={{
                inputIOS: styles.inputForm,
                inputAndroid: styles.inputForm,
              }}
            />
            <Modal visible={modalVisible} animationType="slide">
              <View>
                <Text>Adicionar nova {labelNovoItem}</Text>
                <TextInput
                  placeholder={`Nome da ${labelNovoItem}`}
                  value={newItem.nome}
                  onChangeText={(text) =>
                    setNewItem({ ...newItem, nome: text })
                  }
                  //style={styles.input}
                />
                <TouchableOpacity onPress={handleCreateItem}>
                  <Text>Criar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </>
        )}
      />
    </View>
  );
}
