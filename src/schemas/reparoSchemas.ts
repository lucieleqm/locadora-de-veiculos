import * as yup from "yup";

// Esse arquivo é onde fica as validações dos inputs do formulário "FormReparos"

export const reparoSchema = yup.object().shape({
    data: yup.string().required("A data é obrigatória"),
    custo: yup.string().required("O custo é obrigatório"),
    descricao: yup.string().required("A descrição é obrigatória"), 
  });