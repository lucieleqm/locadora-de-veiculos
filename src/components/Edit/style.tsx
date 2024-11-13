import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    color: theme.colors.gray[800],
    fontFamily: theme.fontFamily.bold,
    fontSize: 20,
    textAlign: "center"
  },
  switchContainer: {
    marginTop: 15,
    flexDirection: "column",
    alignItems: "flex-start"
  },
  input: {
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
  label: {
    fontFamily: theme.fontFamily.medium,
    fontSize: 16,
    color: theme.colors.gray[800],
    marginBottom: 5,
    marginLeft: 10,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  button: {
    height: 48,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.blue,
    borderRadius: 10,
    padding: 10,
  },
  textButton: {
    color: theme.colors.gray[100],
    fontFamily: theme.fontFamily.bold,
    fontSize: 16,
  },
});

export default styles;
