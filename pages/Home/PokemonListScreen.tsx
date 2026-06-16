import { ActivityIndicator, FlatList, StatusBar } from "react-native";
import { ContainerGlobal } from "../../styles/GlobalStyle";
import { Background, PokemonsArea, Title, TopBar, SearchContainer } from "./PokemonListScreenStyle";
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

type Nav = NativeStackNavigationProp<RootStackParams, "PokemonListScreen">;

export default function PokemonListScreen() {
  const [pokemons,       setPokemons]       = useState<Pokemon[]>([]);
  const [search,         setSearch]         = useState("");
  const [offset,         setOffset]         = useState(0);
  const [hasMore,        setHasMore]        = useState(true);
  const [loading,        setLoading]        = useState(false);
  const [modalVisible,   setModalVisible]   = useState(false);
  const [selectedType,   setSelectedType]   = useState<string | null>(null);
  const [filteredByType, setFilteredByType] = useState<Pokemon[]>([]);
  const [loadingType,    setLoadingType]    = useState(false);
  const [allNames,       setAllNames]       = useState<{ name: string; url: string }[]>([]);
  const [searchResults,  setSearchResults]  = useState<Pokemon[]>([]);
  const [loadingSearch,  setLoadingSearch]  = useState(false);

  const isLoadingRef = useRef(false);
  const navigation   = useNavigation<Nav>();

  // ── Primeira carga ──────────────────────────────────────────────────────────
  useEffect(() => {
    fetchPokemons(0);
    loadAllNames(); // ← adiciona

  }, []);

  useEffect(() => {
  onSearchChanged();
}, [search]);

//Busca nomes
const loadAllNames = async () => {
  try {
    const res  = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1500&offset=0");
    const data = await res.json();
    setAllNames(data.results);
  } catch (error) {
    console.error("Erro ao carregar nomes:", error);
  }
};

  // ── Busca pokémons paginados ────────────────────────────────────────────────
  const fetchPokemons = async (currentOffset: number) => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    try {
      setLoading(true);

      const listRes  = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${currentOffset}`);
      const listData = await listRes.json();

      const detalhes: Pokemon[] = await Promise.all(
        listData.results.map(async (item: { url: string }) => {
          const detRes  = await fetch(item.url);
          const detData = await detRes.json();
          return {
            id:     detData.id,
            name:   detData.name,
            sprite: detData.sprites.other["official-artwork"].front_default
                 ?? detData.sprites.front_default,
            types:  detData.types.map((t: any) => t.type.name),
          };
        })
      );

      setPokemons((prev) => currentOffset === 0 ? detalhes : [...prev, ...detalhes]);
      setOffset(currentOffset + 20);
      setHasMore(listData.next !== null);

    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
      isLoadingRef.current = false;
    }
  };

  const onSearchChanged = async () => {
  const term = search.toLowerCase().trim();

  if (term === "") {
    setSearchResults([]);
    return;
  }

  const matched = allNames
    .filter((p) => p.name.includes(term))
    .slice(0, 20);

  if (matched.length === 0) {
    setSearchResults([]);
    return;
  }

  try {
    setLoadingSearch(true);

    const detalhes: Pokemon[] = await Promise.all(
      matched.map(async (p) => {
        const detRes  = await fetch(p.url);
        const detData = await detRes.json();
        return {
          id:     detData.id,
          name:   detData.name,
          sprite: detData.sprites.other["official-artwork"].front_default
               ?? detData.sprites.front_default,
          types:  detData.types.map((t: any) => t.type.name),
        };
      })
    );

    setSearchResults(detalhes.sort((a, b) => a.id - b.id));
  } catch (error) {
    console.error("Erro na busca:", error);
  } finally {
    setLoadingSearch(false);
  }
};

  // ── Busca pokémons por tipo ─────────────────────────────────────────────────
  const handleSelectType = async (type: string | null) => {
    setSelectedType(type);

    // Sem tipo selecionado — limpa o filtro
    if (!type) {
      setFilteredByType([]);
      return;
    }

    try {
      setLoadingType(true);

      const res  = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await res.json();

      // Busca detalhes dos primeiros 40 pokémons do tipo
      const detalhes: Pokemon[] = await Promise.all(
        data.pokemon.slice(0, 40).map(async (p: any) => {
          const detRes  = await fetch(p.pokemon.url);
          const detData = await detRes.json();
          return {
            id:     detData.id,
            name:   detData.name,
            sprite: detData.sprites.other["official-artwork"].front_default
                 ?? detData.sprites.front_default,
            types:  detData.types.map((t: any) => t.type.name),
          };
        })
      );

      setFilteredByType(detalhes.sort((a, b) => a.id - b.id));

    } catch (error) {
      console.error("Erro ao filtrar por tipo:", error);
    } finally {
      setLoadingType(false);
    }
  };

  // ── Lista base + filtro por nome ────────────────────────────────────────────
  // Se tem tipo selecionado → usa filteredByType
  // Se não tem tipo        → usa pokemons completo
  // Aplica filtro por nome por cima
const dadosExibidos = search.trim()
  ? searchResults                                          // tem texto → busca real
  : selectedType
    ? filteredByType                                       // tem tipo → filtro por tipo
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
            <ActivityIndicator color="#a78bfa" size="large" style={{ marginTop: 40 }} />
          ) : (
            <FlatList
              data={dadosExibidos}
              keyExtractor={(item) => String(item.id)}
              numColumns={2}
              onEndReached={() => {
                // Só pagina se não há tipo selecionado
                if (!selectedType && hasMore && !loading) fetchPokemons(offset);
              }}
              onEndReachedThreshold={0.2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              ListFooterComponent={
                loading
                  ? <ActivityIndicator color="#a78bfa" style={{ margin: 20 }} />
                  : null
              }
              ListEmptyComponent={
                !loading && !loadingType
                  ? <ActivityIndicator color="#a78bfa" style={{ margin: 20 }} />
                  : null
              }
              renderItem={({ item }) => (
                <PokemonCard
                  pokemon={item}
                  onPress={(p) => navigation.navigate("ProfilePokemon", { id: p.id })}
                />
              )}
            />
          )}
        </PokemonsArea>

      </ContainerGlobal>
    </Background>
  );
}