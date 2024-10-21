import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

const styles = StyleSheet.create({
  buttonEdit: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDelete: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.red,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSearch: {
    
  },
});

export default styles;