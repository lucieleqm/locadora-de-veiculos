import * as yup from "yup";

// Esse arquivo é onde fica as validações dos inputs do formulário "FormCliente"

export const blacklistSchema = yup.object().shape({
    motivo: yup.string().required('O motivo é obrigatório'),
    cpf: yup.string().required("O CPF é obrigatório"),
    nome: yup.string().required("O nome é obrigatório")
    
  });