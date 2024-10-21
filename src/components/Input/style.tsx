import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

const styles = StyleSheet.create({
  inputForm: {
    width: "100%",
    height: 48,
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
  labelInputForm: {
    fontFamily: theme.fontFamily.medium,
    fontSize: 16,
    color: theme.colors.gray[800],
    marginBottom: 5,
    marginLeft: 10,
  },
  errorText: {
    color: theme.colors.red,
    marginLeft: 10,
  },
});

export default styles;
