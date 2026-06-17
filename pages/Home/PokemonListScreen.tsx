import { ActivityIndicator, FlatList, StatusBar } from "react-native";
import { ContainerGlobal } from "../../styles/GlobalStyle";
import {
  Background,
  PokemonsArea,
  Title,
  TopBar,
  SearchContainer,
} from "./PokemonListScreenStyle";
import SearchComponente from "../../components/SearchComponent/SearchComponent";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import { useEffect, useRef, useState } from "react";
import { Pokemon } from "../../interfaces/Pokemon";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../components/Route/Navigation";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import TypeFilterModal from "../../components/ModalFIlter/ModalFilter";
import useFetchPokemonList from "../../hooks/useFetchPokemonList";
type Nav = NativeStackNavigationProp<RootStackParams, "PokemonListScreen">;

export default function PokemonListScreen() {
  const {
    pokemons,
    searchResults,
    selectedType,
    filteredByType,
    search,
    setSearch,
    setModalVisible,
    modalVisible,
    handleSelectType,
    loadingType,
    hasMore,
    loading,
    fetchPokemons,
    fetchMorePokemons,
  } = useFetchPokemonList();

  const navigation = useNavigation<Nav>();

  // ── Lista base + filtro por nome ────────────────────────────────────────────
  // Se tem tipo selecionado → usa filteredByType
  // Se não tem tipo        → usa pokemons completo
  // Aplica filtro por nome por cima
  const dadosExibidos = search.trim()
    ? searchResults // tem texto → busca real
    : selectedType
      ? filteredByType // tem tipo → filtro por tipo
      : pokemons;

  return (
    <Background>
      <ContainerGlobal edges={["top", "bottom"]}>
        <StatusBar hidden={true} />

        {/* Top App Bar */}
        <TopBar>
          <Title>GlossyMon</Title>
        </TopBar>

        {/* Busca + botão de filtro */}
        <SearchContainer>
          <SearchComponente value={search} onChangeText={setSearch} />

          {/* Botão de filtro — fica roxo quando tipo está selecionado */}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: selectedType
                ? "rgba(167,139,250,0.2)"
                : "rgba(255,255,255,0.12)",
              borderWidth: 1,
              borderColor: selectedType
                ? "rgba(167,139,250,0.6)"
                : "rgba(255,255,255,0.2)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="filter"
              size={20}
              color={selectedType ? "#a78bfa" : "rgba(255,255,255,0.7)"}
            />
          </TouchableOpacity>
        </SearchContainer>

        {/* Modal de filtro por tipo */}
        <TypeFilterModal
          visible={modalVisible}
          selectedType={selectedType}
          onSelectType={handleSelectType}
          onClose={() => setModalVisible(false)}
        />

        {/* Grid de pokémons */}
        <PokemonsArea>
          {loadingType ? (
            <ActivityIndicator
              color="#a78bfa"
              size="large"
              style={{ marginTop: 40 }}
            />
          ) : (
            <FlatList
              data={dadosExibidos}
              keyExtractor={(item) => String(item.id)}
              numColumns={2}
              onEndReached={() => {
                // Só pagina se não há tipo selecionado
                if (!selectedType && hasMore && !loading) fetchMorePokemons();
              }}
              onEndReachedThreshold={0.2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              ListFooterComponent={
                loading ? (
                  <ActivityIndicator color="#a78bfa" style={{ margin: 20 }} />
                ) : null
              }
              ListEmptyComponent={
                !loading && !loadingType ? (
                  <ActivityIndicator color="#a78bfa" style={{ margin: 20 }} />
                ) : null
              }
              renderItem={({ item }) => (
                <PokemonCard
                  pokemon={item}
                  onPress={(p) =>
                    navigation.navigate("ProfilePokemon", { id: p.id })
                  }
                />
              )}
            />
          )}
        </PokemonsArea>
      </ContainerGlobal>
    </Background>
  );
}
