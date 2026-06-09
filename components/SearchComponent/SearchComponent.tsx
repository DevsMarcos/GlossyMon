import React, { useState } from "react";
import {Input, InputArea, SearchArea} from "./SearchComponentStyle";
import { Ionicons } from "@expo/vector-icons";

export default function SearchComponente(){
    const [texto, setTexto] = useState("");
    
    return(
        <SearchArea>
            <InputArea>
                <Ionicons name="search" size={24} color="rgba(255,255,255,0.8)" />
                <Input 
                placeholder={"Informe o nome de um pokemon"} 
                placeholderTextColor={'#fff'}
                onChangeText={setTexto}
                value={texto}
                
                />
            </InputArea>
            <Ionicons name="filter" size={24} color="rgba(255,255,255,0.8)"/>
        </SearchArea>
    )
}