import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        marginVertical: 20,
        marginHorizontal: 5,
    },

    formTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 20,
    },
    formTitleText: {
        fontFamily: theme.fontFamily.bold,
        fontSize: 20,
        color: theme.colors.gray[800],
        marginBottom: 10
    },
    boxButtonIcon:{
        position: 'absolute',
        left: 0,
        paddingLeft: 10
    },
    boxImageLoad:{
        width: '100%',
        height: 250,
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxImage:{
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    textImage:{
        position: 'absolute',
        fontSize: 16,
    }
})

export default styles;