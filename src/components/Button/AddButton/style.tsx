import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    left: "80%",
    bottom: 20,
  },
  
  buttonAdd: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: theme.colors.gray[800],
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  buttonText: {
    color: theme.colors.gray[100],
    fontSize: 26,
  },
});

export default styles;
