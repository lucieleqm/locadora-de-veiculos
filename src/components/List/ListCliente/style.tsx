import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 10,
  },
  cardCliente: {
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    shadowColor: theme.colors.gray[800],
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    width: "auto",
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    textAlign: "center",
  },
  cardTitle: {
    fontFamily: theme.fontFamily.bold,
    fontSize: 18,
    color: theme.colors.gray[800],
    marginTop: 2,
    marginBottom: 5,
  },
  cardClienteDetails: {
    fontSize: 14,
    color: theme.colors.gray[800],
    marginBottom: 2
  }
})

export default styles;