import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    padding: 10,
  },
  inputForm: {
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
  labelInputForm: {
    fontFamily: theme.fontFamily.medium,
    fontSize: 16,
    color: theme.colors.gray[800],
    marginBottom: 5,
    marginLeft: 10,
  },
  labelPicker: {
    fontFamily: theme.fontFamily.medium,
    fontSize: 16,
    color: theme.colors.gray[800],
    marginBottom: 5,
  },
  /*inputPicker: {
    width: "100%",
    backgroundColor: "#ffff",
    borderWidth: 3,
    borderColor: theme.colors.blue,
    borderRadius: 4,
    padding: 8,
  },*/
  errorText: {
    color: theme.colors.red,
    marginLeft: 10,
  },
  boxMain:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.gray[200]
  },
  TextTitle:{
    fontSize: 25
  },
  inputMarca:{
    borderRadius: 10,
    borderWidth: 2,
    height: 45,
    width: '50%',
    fontSize: 15,
    paddingLeft: 10,
    top: 10
  },
  boxButton:{
    flexDirection: 'row',
    top: 30
  },
  button:{
    marginHorizontal: 20,
    borderRadius: 10,
    height: 40,
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF'
  },
  textButton:{
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  }
});

export default styles;
