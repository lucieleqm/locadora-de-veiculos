import * as yup from "yup";

// Esse arquivo é onde fica as validações dos inputs do formulário "FormCliente"

export const clienteSchema = yup.object().shape({
    nome: yup.string().required("O nome é obrigatório"),
    estado_civil: yup.string(),
    profissao: yup.string(),
    rg: yup.string().required("O RG é obrigatório"),
    cpf: yup.string().required("O CPF é obrigatório"),
    email: yup.string().email("E-mail inválido"),
    telefone1: yup.string().required("O telefone é obrigatório"),
    telefone2: yup.string(),
    rua: yup.string(),
    numero: yup.string(),
    bairro: yup.string(),
    complemento: yup.string(),
    cidade: yup.string(),
    cep: yup.string(),
  });