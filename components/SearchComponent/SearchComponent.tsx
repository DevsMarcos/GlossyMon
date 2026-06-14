import React, { useState } from "react";
import {Input, InputArea, SearchArea} from "./SearchComponentStyle";
import { Ionicons } from "@expo/vector-icons";
import { Keyboard } from "react-native";


    
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
                placeholder={"Nome do Pokemon"} 
                placeholderTextColor={'#fff'}
                onChangeText={onChangeText}
                value={value}
                onSubmitEditing={Keyboard.dismiss}
                
                />
            </InputArea>
        </SearchArea>
    )
}