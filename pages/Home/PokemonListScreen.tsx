import { FlatList } from "react-native";
import {ContainerGlobal} from "../../styles/GlobalStyle"
import { Background, PokemonsArea, Title, TopBar, SearchContainer} from "./PokemonListScreenStyle";
import SearchComponente from "../../components/SearchComponent/SearchComponent";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import { useEffect, useState } from "react";
import { Pokemon } from "../../interfaces/Pokemon";



export default function PokemonListScreen(){

const [pokemons, setPokemons] = useState<Pokemon[]>([]);
const [search, setSearch]     = useState("");
const [loading, setLoading]   = useState(true);

useEffect(() => {
    fetchPokemons();
}, []);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
 
      // Requisição 1 — lista com nomes e URLs
      const listRes  = await fetch("https://pokeapi.co/api/v2/pokemon?limit=40");
      const listData = await listRes.json();
 
      // Requisição 2 — detalhes de cada pokémon em paralelo
      const detalhes: Pokemon[] = await Promise.all(
        listData.results.map(async (item: { url: string }) => {
          const detRes  = await fetch(item.url);
          const detData = await detRes.json();
          return {
            id:     detData.id,
            name:   detData.name,
            sprite: detData.sprites.front_default,
            types:  detData.types.map((t: any) => t.type.name),
          };
        })
      );
 
      setPokemons(detalhes);
    } catch (error) {
      console.error("Erro ao buscar pokémons:", error);
    } finally {
      setLoading(false);
    }
  };

   const filtrado = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

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
                <FlatList
                data={filtrado}
                keyExtractor={(item) => String(item.id)}
                numColumns={2}
                columnWrapperStyle={{ gap: 8, paddingHorizontal: 16 }}
                contentContainerStyle={{ paddingTop: 8, paddingBottom: 32 }}
                refreshing={loading}
                onRefresh={fetchPokemons}
                renderItem={({ item }) => <PokemonCard pokemon={item} />}
            />

                </PokemonsArea>
            </Background>
        </ContainerGlobal>
    )
}