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



export default function PokemonListScreen() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const isLoadingRef = useRef(false);
  const [background, setBackground] = useState<[string, string, string]>([
    "#1a1035", "#0f1d3e", "#0a0a1a",
  ]);



type Nav = NativeStackNavigationProp<RootStackParams, "PokemonListScreen">;

const navigation = useNavigation<Nav>();

  // Carrega os primeiros pokémons ao montar a tela
  useEffect(() => {
    fetchPokemons(0);
  }, []);

  const fetchPokemons = async (currentOffset: number) => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    try {
      setLoading(true);

      // CORREÇÃO: Usar a variável currentOffset que veio por parâmetro
      const listRes = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${currentOffset}`);
      const listData = await listRes.json();

      const detalhes: Pokemon[] = await Promise.all(
        listData.results.map(async (item: { url: string }) => {
          const detRes = await fetch(item.url);
          const detData = await detRes.json();
          return {
            id: detData.id,
            name: detData.name,
            sprite: detData.sprites.other["official-artwork"].front_default 
                 ?? detData.sprites.front_default,
            types: detData.types.map((t: any) => t.type.name),
          };
        })
      );

      // CORREÇÃO: Compara usando o parâmetro atual da função
      setPokemons((prev) => (currentOffset === 0 ? detalhes : [...prev, ...detalhes]));
      
      // Atualiza o estado com o próximo offset baseado no que foi requisitado
      setOffset(currentOffset + 20);
      setHasMore(listData.next !== null);

    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
      isLoadingRef.current = false;
    }
  };

  const filtrado = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
        <Background>
        <ContainerGlobal edges={["top", "bottom"]}>
            <StatusBar 
              hidden={true} // Faz o app ocupar o espaço da barra de status
            />
        <TopBar>
          <Title>GlossyMon</Title>
        </TopBar>

        <SearchContainer>
          <SearchComponente value={search} onChangeText={setSearch}/>
        </SearchContainer>

        <PokemonsArea>
          <FlatList
            data={filtrado}
            keyExtractor={(item) => String(item.id)}
            numColumns={2}
            onEndReached={() => { if (hasMore && !loading) fetchPokemons(offset)}}
            onEndReachedThreshold={0.2}
            // ESSENCIAL: Distribui os cards de 48% nas pontas, criando o espaço correto no meio
            columnWrapperStyle={{ justifyContent: 'space-between'}}
            ListFooterComponent={loading ? <ActivityIndicator color="#a78bfa" style={{ margin: 20 }} /> : null}
            renderItem={({ item }) => <PokemonCard pokemon={item} onPress={(p) => navigation.navigate("ProfilePokemon", {id: p.id})}/>}
            />


        </PokemonsArea>
      </ContainerGlobal>
      </Background>

  );
}
