import React, { useState } from "react";
import styles from "./style";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";

interface DeleteButtonProps {
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Função para alternar a visibilidade do menu popup
  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };

  // Função para confirmar a exclusão com um alerta
  const handleDelete = () => {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja deletar este item?",
      [
        {
          text: "Cancelar",
          onPress: () => setIsVisible(false), // Fecha o menu se cancelar
          style: "cancel",
        },
        {
          text: "Deletar",
          onPress: () => {
            onDelete(); // Executa a função de exclusão
            setIsVisible(false); // Fecha o menu após deletar
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Botão de três pontos */}
      <TouchableOpacity onPress={toggleMenu} style={styles.threeDotsButton}>
        <Text style={styles.dots}>⋮</Text>
      </TouchableOpacity>

      {/* Menu popup */}
      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={toggleMenu}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.menuContainer}>
            {/* Botão para deletar */}
            <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Deletar</Text>
            </TouchableOpacity>

            {/* Botão para cancelar */}
            <TouchableOpacity
              onPress={() => setIsVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DeleteButton;
