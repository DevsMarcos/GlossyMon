import { Route, RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { RootStackParams } from "../../components/Route/Navigation";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { MoveInfo, PokemonDataResponse, PokemonMove } from "../../interfaces/Pokemon";
import { ListRenderItem } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { BackButton, Background, ContainerGlobal, Description, GlobalTitle, GlobalTopBar, OfuscedDescription, PokemonName, PokemonNumber, TopBar, TouchableButton } from "../../styles/GlobalStyle";
import { Ionicons } from "@expo/vector-icons";
import { Moves } from "../PokemonDetailsPage/PokemonDetailsPageStyle";



export default function Movements(){

    type Route = RouteProp<RootStackParams, "Movements">;
    
    const { params } = useRoute<Route>();

    const { id, name } = params;
    const [moves,    setMoves]    = useState<MoveInfo[]>([]);
    const [loading,    setLoading]    = useState(false);
    const [background, setBackground] = useState<[string, string, string]>([
    "#1a1035", "#0f1d3e", "#0a0a1a",
  ]);

    const navigation = useNavigation();
  

  useEffect(()=>{
    fetchMoves();
  }, [])

const fetchMoves = async (): Promise<void> => {
  try {
    setLoading(true);

    const moveRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data: PokemonDataResponse = await moveRes.json();

    const dataMoves: MoveInfo[] = data.moves
      // Filtra só movimentos aprendidos subindo de nível
      .filter((item) =>
        item.version_group_details.some(
          (v) => v.move_learn_method.name === "level-up"
        )
      )
      // Mapeia com o nível
      .map((item) => {
        const detail = item.version_group_details
          .filter((v) => v.move_learn_method.name === "level-up")
          .sort((a, b) => b.level_learned_at - a.level_learned_at)[0];

        return {
          name:  item.move.name,
          url:   item.move.url,
          level: detail?.level_learned_at ?? 0,
        };
      })
      // Ordena pelo nível
      .sort((a, b) => a.level - b.level);

    setMoves(dataMoves);

  } catch (error) {
    console.error("Erro ao buscar movimentos:", error);
  } finally {
    setLoading(false);
  }
};

    const RenderItem: ListRenderItem<MoveInfo> = ({ item }) => (
    <TouchableButton>
      <Description align="left" fontSize="18"> Movimento: {item.name.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase())}</Description>
      <OfuscedDescription>Level de Aprendizagem: {item.level} </OfuscedDescription>
    </TouchableButton>
);

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

        <TopBar>
          <BackButton onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={32} color="white" />
          </BackButton>
          <PokemonNumber>#{String(id).padStart(3, "0")}</PokemonNumber>
          <PokemonName>{name}</PokemonName>
        </TopBar>
        <GlobalTopBar>
          <GlobalTitle>Lista de Movimentos</GlobalTitle>
        </GlobalTopBar>

        <FlatList 
          data={moves}
          renderItem={RenderItem}
          keyExtractor={(item) => item.name}
          contentContainerStyle={{ paddingBottom: 32, padding:16 }} // ← adiciona isso
        
        />
        </ContainerGlobal>

      </Background>

    )
}