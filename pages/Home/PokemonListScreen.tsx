import { StatusBar, Text } from "react-native";
import {ContainerGlobal} from "../../styles/GlobalStyle"
import { Background, PokemonsArea, Title, TopBar} from "./PokemonListScreenStyle";



export default function PokemonListScreen(){
    return(
        <ContainerGlobal edges={["top"]}>
            <Background>
                <TopBar>
                    <Title>GlossyMon</Title>
                </TopBar>
                <PokemonsArea>
                    
                </PokemonsArea>
            </Background>
        </ContainerGlobal>
    )
}