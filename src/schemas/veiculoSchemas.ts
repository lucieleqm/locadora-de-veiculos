import { useState } from "react";
import * as yup from "yup";

// Esse arquivo é onde fica as validações dos inputs do formulário "FormVeiculos"

export const veiculoSchema = yup.object().shape({
    tipo_veiculo: yup.string().required("O tipo é obrigatório"),
    marca_veiculo: yup.string().required("A marca veiculo é obrigatória"),
    modelo_veiculo: yup.string().required("O modelo é obrigatório"),
    placa_veiculo: yup.string().required("A placa é obrigatória"),
    num_renavam: yup.string().required("O renavam é obrigatório"),
    chassi: yup.string().required("O chassi é obrigatório"),
    motor: yup.string().required("O motor é obrigatório"),
    cor: yup.string().required("A cor é obrigatória"),
    ano: yup.string().required("O ano é obrigatório"),
    combustivel: yup.string().required("O combustível é obrigatório"),
    valor_semanal: yup.string().required("O valor é obrigátorio")
  });