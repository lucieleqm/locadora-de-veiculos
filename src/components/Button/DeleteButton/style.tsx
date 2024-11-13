import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
      },
      threeDotsButton: {
        paddingRight: 10,
      },
      dots: {
        fontSize: 36,
        color: "#333",
      },
      modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      menuContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 20,
        elevation: 5,
        width: 200,
        alignItems: "center",
      },
      deleteButton: {
        paddingVertical: 10,
      },
      deleteButtonText: {
        color: "red",
        fontWeight: "bold",
        fontSize: 16,
      },
      cancelButton: {
        paddingVertical: 10,
        marginTop: 10,
      },
      cancelButtonText: {
        color: "blue",
        fontWeight: "bold",
        fontSize: 16,
      },
});

export default styles;