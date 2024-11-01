import * as yup from "yup";

// Esse arquivo é onde ficam as validações dos inputs do formulário "FormVeiculos"
export const veiculoSchema = yup.object().shape({
  placa: yup.string().required("A placa é obrigatória"),
  renavam: yup.string().required("O renavam é obrigatório"),
  chassi: yup.string().required("O chassi é obrigatório"),
  motor: yup.string().required("O motor é obrigatório"),
  km: yup
    .number()
    .required("A quilometragem é obrigatório"),
  cor: yup
    .number()
    .required("O combustível é obrigatório"),
  ano: yup
    .string()
    .required("O ano é obrigatório")
    .matches(/^\d{4}$/, "O ano deve ter 4 dígitos"),
  valor: yup
    .number()
    .required("O valor é obrigatório")
    .typeError("O valor deve ser um número"),
  //status: yup.boolean().required("O status é obrigatório"),
  tipo: yup
    .number()
    .required("O tipo é obrigatório"),
  modelo: yup
    .number()
    .required("O modelo é obrigatório"),
  combustivel: yup
    .number()
    .required("O combustível é obrigatório"),
  marca: yup
    .number()
    .required("A marca é obrigatória")
  /*imagem: yup
    .array()
    .of(yup.string().url("Cada imagem deve ser uma URL válida").required())  // Garante que `imagem` seja apenas um array de strings válidas
    .min(0, "Pelo menos uma imagem é necessária")
    .required("As imagens são obrigatórias"),  // Ajustado para garantir que é sempre um array de strings*/
});
