import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  buttonForm: {
    width: "45%",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.blue,
    borderRadius: 10,
    padding: 10,
  },
  textButtonForm: {
    color: theme.colors.gray[100],
    fontFamily: theme.fontFamily.bold,
    fontSize: 16,
  },
})

export default styles;
