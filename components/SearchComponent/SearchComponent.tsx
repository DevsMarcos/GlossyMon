import React, { useState } from "react";
import {Input, InputArea, SearchArea} from "./SearchComponentStyle";
import { Ionicons } from "@expo/vector-icons";


    
    interface SearchProps {
  value: string;
  onChangeText: (text: string) => void;
} 
export default function SearchComponente({value, onChangeText}: SearchProps){
    const [texto, setTexto] = useState("");

    return(
        <SearchArea>
            <InputArea>
                <Ionicons name="search" size={24} color="rgba(255,255,255,0.8)" />
                <Input 
                placeholder={"Informe o nome de um pokemon"} 
                placeholderTextColor={'#fff'}
                onChangeText={onChangeText}
                value={value}
                
                />
            </InputArea>
            <Ionicons name="filter" size={24} color="rgba(255,255,255,0.8)"/>
        </SearchArea>
    )
}