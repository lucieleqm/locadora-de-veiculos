import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

const styles = StyleSheet.create({
    boxMain:{
        flex: 1,
        marginVertical: 40,
        marginHorizontal: 5
    },
    formTitle:{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 30
    },
    formTitleText: {
        fontFamily: theme.fontFamily.bold,
        fontSize: 22,
        color: theme.colors.gray[800]
    },
    boxButtonIcon:{
        position: 'absolute',
        left: 0,
        paddingLeft: 10    
    },
    boxNavigation:{
        width: '90%',
        height: 50,
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 30,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.1,
        textShadowRadius: 4,
        elevation: 3
    },
    buttonNavigation:{
        width: '10%',
        height: 20,
        borderWidth: 2
    },
    textButtonNav:{
        fontSize: 17,
        fontWeight: 'bold',
        borderBottomWidth: 2.5,
        borderColor: '#007BFF'
    },
    textButtonNav2:{
        fontSize: 17,
        fontWeight: 'bold'
    },
    boxEdit:{
        height: 47,
        width: 47,
        justifyContent: 'center',
        backgroundColor: '#007BFF',
        alignItems: 'center',
        borderRadius: 100
    },
    boxDetails:{
        width: '90%',
        height: 'auto',
        backgroundColor: '#fff',
        borderRadius: 15,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.1,
        textShadowRadius: 4,
        elevation: 3,
        padding: 6
    },
    textTitle:{
        fontSize: 18,
        marginLeft: 10
    }
});

export default styles;