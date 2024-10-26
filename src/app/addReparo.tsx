import React from "react";
import { SafeAreaView } from "react-native";
import FormReparos from "../components/Form/FormReparos";

export default function addReparo(){
    return(
        <SafeAreaView className="flex-1 bg-grey-500 items-center justify-center">
            <FormReparos></FormReparos>
        </SafeAreaView>
    )
}