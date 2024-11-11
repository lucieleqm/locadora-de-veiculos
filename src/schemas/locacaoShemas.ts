import * as yup from "yup";

// Esse arquivo é onde fica as validações dos inputs do formulário "FormLocacao"

export const locacaoSchema = yup.object().shape({
    cpfCliente: yup.string().required("O cpf é obrigatório"),
    caucao: yup.string().required("A Caução é obrigatória"),
    valor: yup.string().required("O valor é obrigatório"),
    km: yup.number().required("A quilometragem é obrigatória"),
    dtInicio: yup.string().required("A data é obrigatória"),
    dtFinal: yup.string().required("A data é obrigatória"),
  });