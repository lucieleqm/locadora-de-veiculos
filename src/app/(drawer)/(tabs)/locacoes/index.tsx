import React from 'react'
import { SafeAreaView} from 'react-native'
import AddButton from '../../../../components/Button/AddButton'
import { router } from 'expo-router'

import ListLocacao from '../../../../components/List/ListLocacao'

import styles from '../../../../styles/style'

export default function Locacoes(){
    return (
      <SafeAreaView style={styles.container}>
        <ListLocacao/>
        <AddButton onPress={()=>router.push('../../../add-locacao')}/>
      </SafeAreaView>
    )
}