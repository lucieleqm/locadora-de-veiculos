import React, { useState } from "react";
import { 
  SafeAreaView, 
  ScrollView, 
  Text,  
  Alert,
  Modal,
  TouchableOpacity,
  View
} from "react-native";

import DatePicker from "react-native-modern-datepicker";
import styles from "../style";
import { getFormatedDate, getToday } from "react-native-modern-datepicker";
import { useNavigation } from "expo-router";

import FormButton from "../../Button/FormButton";
import { FormInputController } from "../../../controllers/FormInputController";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { reparoSchemas } from "../../../schemas/reparoSchemas";
import api from '../../../services/api';

interface ReparoFormData {
  placa_veiculo: string;
  data: string;
  custo: number;
  descricao: string;
}

export default function FormReparos() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReparoFormData>({
    resolver: yupResolver(reparoSchemas),
  });

  const [openData, setOpenData] = useState(false)

  const today = new Date()
  today.setDate(today.getDate()+1)
  const dataR = getFormatedDate(today)

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  async function CadastroReparo(dados: ReparoFormData) {
    try {
      const veiculoResponse = await api.get(
          `/veiculos/buscarPorPlaca/${dados.placa_veiculo}`
      )

      const formData = new FormData()
      formData.append('data', dados.data)
      formData.append('descricao', dados.descricao)
      formData.append('custo', dados.custo.toString())
      formData.append('id_veiculo', veiculoResponse.data.id)

      console.log('FormData Enviado', formData)

      const response = await api.post("/reparos/insert", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      if (response.status == 201) {
        Alert.alert("Sucesso", "Reparo cadastrado com sucesso!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", "Não foi possível cadastrar o reparo.");
      }
    } catch(error) {
      console.error("Erro ao cadastrar reparo:", error);
      Alert.alert("Erro", "Ocorreu um erro ao cadastrar o reparo. Tente novamente.");
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.formContainer}>
        <SafeAreaView style={styles.formTitle}>
          <Text style={styles.formTitleText}>Adicionar Reparo</Text>
        </SafeAreaView>
        <FormInputController
          control={control}
          name="placa_veiculo"
          label="Placa do veículo"
          errors={errors}
          placeholder="XXX9X99"
        />

        <FormInputController
          control={control}
          name="custo"
          label="Custo"
          errors={errors}
          placeholder="R$ 250,00"
          keyboardType="numeric"
        />
        <FormInputController
          control={control}
          name="descricao"
          label="Descrição"
          errors={errors}
          placeholder="Troca de óleo"
        />

        <Controller
                control={control}
                name="data"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <>
                    <TouchableOpacity onPress={() => setOpenData(true)}>
                      <Text style={{left: 10, fontSize: 15}}>{value || "Selecionar Data do Reparo"}</Text>
                    </TouchableOpacity>

                    {error && <Text style={{ color: "red" }}>{error.message}</Text>}

                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={openData}
                    >
                      <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                          <DatePicker
                            mode="calendar"
                            selected={value}
                            minimumDate={dataR}
                            onDateChange={(date) => {
                              console.log(typeof date);
                              const formattedDate = date.replace(/\//g, "-");
                              console.log(`Data de Início Selecionada: ${date}`);
                              onChange(date);
                              setOpenData(false);
                            }}
                            locale="pt-br"
                          />
                          <TouchableOpacity onPress={() => setOpenData(false)}>
                            <Text>Fechar</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  </>
                )}
              />

        <FormButton
          label="Adicionar"
          onPress={handleSubmit(CadastroReparo)}
          disabled={loading}
        ></FormButton>
      </SafeAreaView>
    </ScrollView>
  );
}
