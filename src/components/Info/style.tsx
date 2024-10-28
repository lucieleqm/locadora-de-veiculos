import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

const styles = StyleSheet.create({
    boxMain:{
        flex: 1,
        marginVertical: 40,
        marginHorizontal: 5,
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
    textTitle:{
        fontSize: 20
    }
});

export default styles;