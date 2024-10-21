import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        marginVertical: 40,
        marginHorizontal: 5, 
    },

    formTitle: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    formTitleText: {
        fontFamily: theme.fontFamily.bold,
        fontSize: 20,
        color: theme.colors.gray[800],
        marginBottom: 10,
    },
})

export default styles;