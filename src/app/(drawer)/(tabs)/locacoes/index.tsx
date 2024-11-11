import React from 'react'
import { SafeAreaView} from 'react-native'

import ListLocacao from '../../../../components/List/ListLocacao'

import styles from '../../../../styles/style'

export default function Locacoes(){
    return (
      <SafeAreaView style={styles.container}>
        <ListLocacao/>
      </SafeAreaView>
    )
}