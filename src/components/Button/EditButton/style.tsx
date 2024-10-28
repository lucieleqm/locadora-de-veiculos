import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

const styles = StyleSheet.create({
  buttonContainer: {
    flex:1
  },  
  buttonEdit: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.gray[100],
    fontSize: 25,
},
});

export default styles;