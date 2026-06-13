import { Route, RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParams } from "../../components/Route/Navigation";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { MoveInfo, PokemonDataResponse, PokemonMove } from "../../interfaces/Pokemon";
import { ListRenderItem } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Background, ContainerGlobal, TouchableButton } from "../../styles/GlobalStyle";



export default function Movements(){

    type Route = RouteProp<RootStackParams, "Movements">;
    
    const { params } = useRoute<Route>();

    const { id } = params;
    const [moves,    setMoves]    = useState<MoveInfo[]>([]);
    const [loading,    setLoading]    = useState(false);
    const [background, setBackground] = useState<[string, string, string]>([
    "#1a1035", "#0f1d3e", "#0a0a1a",
  ]);

  useEffect(()=>{
    fetchMoves();
  }, [])

    const fetchMoves = async (): Promise<void> => {
        try{
            setLoading(true);

            const moveRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const data: PokemonDataResponse = await moveRes.json();


            const dataMoves: MoveInfo[] = data.moves.map(item => item.move);

            setMoves(dataMoves)
        } catch (error) {
      console.error("Erro ao buscar movimentos:", error);
        } finally {
        setLoading(false);
    }
  }

    const RenderItem: ListRenderItem<MoveInfo> = ({ item }) => (
      <TouchableButton>
        <Text>{item.name}</Text>
      </TouchableButton>
    )

      if(loading){
        return(
        <Background>
          <ActivityIndicator color="#a78bfa" style={{ margin: 20 }} />
        </Background>
        )
      }

    
    return(
      <Background>
        <ContainerGlobal>
        <FlatList 
          data={moves}
          renderItem={RenderItem}
          keyExtractor={(item) => item.name}
        
        />
        </ContainerGlobal>

      </Background>

    )
}