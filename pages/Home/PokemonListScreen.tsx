import { StatusBar, Text } from "react-native";
import {ContainerGlobal} from "../../styles/GlobalStyle"
import { Background, PokemonsArea, Title, TopBar, SearchContainer} from "./PokemonListScreenStyle";
import SearchComponente from "../../components/SearchComponent/SearchComponent";



export default function PokemonListScreen(){
    return(
        <ContainerGlobal edges={["top"]}>
            <Background>
                <TopBar>
                    <Title>GlossyMon</Title>
                </TopBar>
                
                <SearchContainer>
                    <SearchComponente>

                    </SearchComponente>
                </SearchContainer>

                <PokemonsArea>
                    
                </PokemonsArea>
            </Background>
        </ContainerGlobal>
    )
}