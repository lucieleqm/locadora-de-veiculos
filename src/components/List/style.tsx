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
    width: "auto",
    height: "auto",
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
    fontSize: 14,
    color: theme.colors.gray[800],
    marginBottom: 2
  }
})

export default styles;