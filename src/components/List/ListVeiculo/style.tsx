import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
  cardVehicle: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    width: "45%",
    margin: 10,
    textAlign: "center",
  },

  cardImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  cardInfosContainer: {
    padding: 5,
    marginHorizontal: 5,
  },

  // Estilo para o título do card
  cardTitle: {
    fontFamily: theme.fontFamily.bold,
    fontSize: 18,
    color: theme.colors.gray[800],
    marginTop: 8,
    marginBottom: 5,
  },
  // Estilo para o parágrafo do card
  cardVehicleDetails: {
    fontFamily: theme.fontFamily.regular,
    fontSize: 16,
    color: theme.colors.gray[800],
  },
  // Estilo para o parágrafo do card
  cardParagraph: {
    fontSize: 14,
    color: theme.colors.gray[500],
    marginTop: 15,
  },
  // Estilo para o preço
  cardVehiclePrice: {
    fontFamily: theme.fontFamily.medium,
    fontSize: 18,
    color: theme.colors.blue,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 50,
  },
  searchInput: {
    flex: 1,
    fontFamily: theme.fontFamily.regular,
    fontSize: 16,
    color: theme.colors.gray[800],
  },
  searchIcon: { 
    marginRight: 10,
   },
});

export default styles;
