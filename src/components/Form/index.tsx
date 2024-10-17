import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define o schema de validação com yup
const schema = yup.object().shape({
    name: yup.string().required("O nome é obrigatório"),
  });


// Define a interface para o tipo de dados do formulário 
interface FormData {
    name: string;
}

export function Form() {

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    // Função chamada no envio do formulário
    function handleCadastroCliente(data: FormData) {
        console.log(data);
    }

    return (
        <View className="w-full flex-1 justify-start bg-white p-5">
            <View className="px-4 mb-4 ">
                <Text className="text-gray-700 mb-2">Nome Completo</Text>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="Nome Completo"
                            className="w-full h-12 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 px-4 mb-4"
                        />
                    )}
                />
                {errors.name && <Text className="text-red-500">{errors.name?.message}</Text>}

                <TouchableOpacity 
                    onPress={handleSubmit(handleCadastroCliente)}
                    className="w-full h-12 bg-gray-800 rounded-lg justify-center items-center mt-4">
                    <Text className=" text-lg">Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    );
}