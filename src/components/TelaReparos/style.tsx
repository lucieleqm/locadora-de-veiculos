import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

const styles = StyleSheet.create({
    boxMain:{
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: '#F9F9F9',
        width: '100%',
        padding: 20
    },
    textTitle:{
        fontSize: 25,
        fontWeight: 'bold'
    },
    boxFlatList:{
        width: '100%',
        padding: 10,
        flex: 8
    },
    boxList:{
        padding: 10,
        borderRadius: 1,
        marginTop: 15,
        shadowColor: '#e8e8e8',
        shadowRadius: 2,
        elevation: 2
    },
    textListType:{
        fontSize: 17,
        fontWeight: 'bold'
    },
    textListItem:{
        fontSize: 16
    },
    boxAreaButton:{
        flex: 1,
        width: '100%',
        backgroundColor: '#F9F9F9',
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxButton:{
        backgroundColor: theme.colors.gray[800],
        height: 55,
        width: 55,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButton:{
        color: theme.colors.gray[100],
        fontSize: 26,
    }
});

export default styles;