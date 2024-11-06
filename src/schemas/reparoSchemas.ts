import * as yup from "yup";

// Esse arquivo é onde fica as validações dos inputs do formulário "FormReparos"

export const reparoSchemas = yup.object().shape({
    placa_veiculo: yup.string().required("A placa é obrigatória"),
    data: yup.string().required("A data é obrigatória"),
    custo: yup.number().required("O custo é obrigatório"),
    descricao: yup.string().required("A descrição é obrigatória"),
    
  });