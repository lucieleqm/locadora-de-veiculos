import React from 'react'
import { SafeAreaView} from 'react-native'
import AddButton from '../../../../components/Button/AddButton'
import { router } from 'expo-router'

import styles from '../../../../styles/style'

export default function Locacoes(){
    return (
      <SafeAreaView style={styles.container}>
        <AddButton onPress={()=>router.push('../../../addReparo')}/>
      </SafeAreaView>
    )
}