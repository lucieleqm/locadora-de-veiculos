import React from "react";
import { SafeAreaView } from "react-native";
import FormReparos from "../components/Form/FormReparos";
import styles from "../styles/style";

export default function addReparo(){
    return(
        <SafeAreaView style={styles.container}>
            <FormReparos/>
        </SafeAreaView>
    );
}