import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

// Estilo Base dos card das Flatlist
const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    shadowColor: theme.colors.gray[800],
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3, // Necessário no Android
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 5,
    textAlign: "center",
  },
  cardTitle: {
    fontFamily: theme.fontFamily.bold,
    fontSize: 18,
    color: theme.colors.gray[800],
    marginTop: 2,
    marginBottom: 5,
  },
  cardText: {
    fontSize: 15,
    color: theme.colors.gray[800],
    marginBottom: 2
  },
  noDataText: {
    fontFamily: theme.fontFamily.medium,
    color: theme.colors.gray[800]
  },
  searchInput: {
    width: "100%",
    height: 50,
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.gray[200],
    borderWidth: 1,
    borderRadius: 24,
    fontFamily: theme.fontFamily.regular,
    fontSize: 16,
    color: theme.colors.gray[800],
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  shareButton: {
    backgroundColor: "#25D366", // Cor do WhatsApp
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  shareButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#FF4C4C",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  
})

export default styles;