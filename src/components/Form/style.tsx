import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        padding: 10,
        marginVertical: 10,
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
    boxImageLoad:{
        width: '100%',
        height: 250,
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxImageSaveLoad:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: 63,
        marginTop: 10,
        marginBottom: 10
    },
    boxImage:{
        width: '100%',
        height: '100%',
        borderRadius: 8
    },
    textImage:{
        position: 'absolute',
        fontSize: 16,
    },
    boxImageSave:{
        width: 60,
        height: '100%',
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    smallImage:{
        width: '100%',
        height: '100%',
        borderRadius: 6
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: theme.colors.white,
        borderRadius: 20,
        width: "90%",
        padding: 35,
        alignItems: "center",
        shadowColor: theme.colors.gray[800],
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
})

export default styles;