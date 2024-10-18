import * as yup from "yup";

// Esse arquivo é onde fica as validações dos inputs do formulário "FormCliente"

export const clienteSchema = yup.object().shape({
    nome: yup.string().required("O nome é obrigatório"),
    estado_civil: yup.string().required("O estado civil é obrigatório"),
    profissao: yup.string().required("A profissão é obrigatória"),
    rg: yup.string().required("O RG é obrigatório"),
    cpf: yup.string().required("O CPF é obrigatório"),
    email: yup.string().email("E-mail inválido").required("O e-mail é obrigatório"),
    telefone: yup.string().required("O telefone é obrigatório"),
    rua: yup.string().required("A rua é obrigatória"),
    numero: yup.string().required("O número é obrigatório"),
    bairro: yup.string().required("O bairro é obrigatório"),
    complemento: yup.string(),
    cidade: yup.string().required("A cidade é obrigatória"),
    cep: yup.string().required("O CEP é obrigatório"),
  });