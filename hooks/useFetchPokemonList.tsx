import { useState, useEffect, useRef } from "react";
import { Pokemon } from "../interfaces/Pokemon";
import { pokemonService } from "../service/usePokemonList";

export default function useFetchPokemonList(){


    const [pokemons,       setPokemons]       = useState<Pokemon[]>([]);
    const [search,         setSearch]         = useState("");
    const [offset,         setOffset]         = useState(0);
    const [hasMore,        setHasMore]        = useState(true);
    const [loading,        setLoading]        = useState(false);
    const [modalVisible,   setModalVisible]   = useState(false);
    const [selectedType,   setSelectedType]   = useState<string | null>(null);
    const [filteredByType, setFilteredByType] = useState<Pokemon[]>([]);
    const [loadingType,    setLoadingType]    = useState(false);
    const [searchResults,  setSearchResults]  = useState<Pokemon[]>([]);
    const [allNames,       setAllNames]       = useState<{ name: string; url: string }[]>([]);
    const [loadingSearch,  setLoadingSearch]  = useState(false);
    const isLoadingRef = useRef(false);


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
            //const res  = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1500&offset=0");
            const data  = await pokemonService.loadAllNames(1500, 0);

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

     // const listRes  = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${currentOffset}`);

      const listData = await pokemonService.loadPokemons(currentOffset);
     // const listData = await listRes.json();

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

     // const res  = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      //const data = await res.json();

      const data = await pokemonService.loadPokemonType(type);

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



  return {
    pokemons,
    searchResults,
    filteredByType,
    allNames,
    search,
    setSearch,
    selectedType,
    modalVisible,
    setModalVisible,
    hasMore,
    loading,
    loadingType,
    loadingSearch,
    fetchMorePokemons: () => fetchPokemons(offset), // Facilitador para scroll infinito
    fetchPokemons, // Se quiser chamar manualmente passando o offset
    handleSelectType,
  };
}