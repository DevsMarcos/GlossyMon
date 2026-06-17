import React from "react"; // Boa prática manter o React importado
import { ActivityIndicator } from "react-native";
import { RootStackParams } from "../../components/Route/Navigation";
import { useNavigation } from "@react-navigation/native";
import { MoveInfo } from "../../interfaces/Pokemon";
import { ListRenderItem } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  BackButton,
  Background,
  BackgroundLoad,
  ContainerGlobal,
  Description,
  GlobalTitle,
  GlobalTopBar,
  OfuscedDescription,
  PokemonName,
  TitleArea,
  TopBar,
  TouchableButton,
} from "../../styles/GlobalStyle";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useFetchMovementsList from "../../hooks/useFetchMovementsList";

export default function Movements() {
  type Nav = NativeStackNavigationProp<RootStackParams, "MovementDetail">;
  const navigation = useNavigation<Nav>();

  // ─── CONEXÃO COM O SEU HOOK (DESESTRUTURAÇÃO) ──────────────────────────────
  const { pokemonName, background, moves, loading } = useFetchMovementsList();

  // ─── COMPONENTE DE RENDERIZAÇÃO DOS ITENS DA LISTA ────────────────────────
  const RenderItem: ListRenderItem<MoveInfo> = ({ item }) => (
    <TouchableButton
      onPress={() =>
        navigation.navigate("MovementDetail", {
          url: item.url,
          name: item.name,
        })
      }
    >
      <Description align="left" Size={18}>
        Movimento:{" "}
        {item.name.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase())}
      </Description>
      <OfuscedDescription> 
        Level de Aprendizagem: {item.level}
      </OfuscedDescription>
    </TouchableButton>
  );

  // ─── TELA DE LOADING ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <Background>
        <ActivityIndicator
          color="#a78bfa"
          style={{ flex: 1, justifyContent: "center" }}
        />
      </Background>
    );
  }

  // ─── RENDERIZAÇÃO DA SUA INTERFACE PRINCIPAL ───────────────────────────────
  return (
    <BackgroundLoad colors={background ?? ["#1a1035", "#0f1d3e", "#0a0a1a"]}>
      <ContainerGlobal edges={["top", "bottom"]}>
        {/* Barra Superior */}
        <TopBar>
          <BackButton onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={32} color="white" />
          </BackButton>
          <TitleArea>
            <PokemonName>{pokemonName}</PokemonName>
          </TitleArea>
        </TopBar>

        {/* Título da Seção */}
        <GlobalTopBar>
          <GlobalTitle>Lista de Movimentos</GlobalTitle>
        </GlobalTopBar>

        {/* Lista de Movimentos */}
        <FlatList
          data={moves}
          renderItem={RenderItem}
          keyExtractor={(item) => item.name}
          contentContainerStyle={{ paddingBottom: 32, padding: 16 }}
        />
      </ContainerGlobal>
    </BackgroundLoad>
  );
}
