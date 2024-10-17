import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'


export default function VehicleList() {
    const [list, setList] = useState();

    const handleOrderClick = () => {
        let newList = [];
        
        // Ordenar a lista de a-z
        newList.sort((a, b)=> {
            if(a.name > b.name) {
                return 1;
            }else {
                if(b.name > a.name) {
                    return -1;
                }else {
                    return 0;
                }
            }
            
        });

        setList(newList);
    };

    return(
        <FlatList
            data={list}
            renderItem={}
            keyExtractor={}
        />
    )
}

const styles = StyleSheet.create({})