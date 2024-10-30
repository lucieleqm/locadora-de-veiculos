import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

const styles = StyleSheet.create({
  container: {
    padding: 10,

  },
  titleDetails: {
    color: theme.colors.gray[800],
    fontFamily: theme.fontFamily.bold,
    fontSize: 24,
  },

  buttons: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  infos: {
    paddingVertical: 10,
    justifyContent: 'space-between'
  },

  infoDetails: {
    fontFamily: theme.fontFamily.regular,
    fontSize: 16,
    color: theme.colors.gray[800]
  }
});

export default styles;
