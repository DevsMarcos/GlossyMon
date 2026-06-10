import { useEffect, useState } from "react";
import { RootStackParams } from "../../components/Route/Navigation"
import { RouteProp, useRoute } from "@react-navigation/native"
import { PokemonProfile } from "../../interfaces/Pokemon";


type Route = RouteProp<RootStackParams, "ProfilePokemon">

export default function PokemonDetailsPage(){

const { params } = useRoute<Route>();
const { id } = params;
const [pokemon, setPokemon] = useState<PokemonProfile | null>(null) ;
const [loading, setLoading] = useState(false);

useEffect(() => {
    fetchPokemon(id);
}, [id]);

const fetchPokemon = async (id: number) =>{
    try{
    setLoading(true)
    // Busca os dois endpoints em paralelo

    const [pokemonRes, speciesRes] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);

    const pokemonData = await pokemonRes.json();
    const speciesData = await speciesRes.json();

        // Busca a cadeia de evoluções com a URL retornada pela species
    const evoRes  = await fetch(speciesData.evolution_chain.url);
    const evoData = await evoRes.json();
setPokemon({
      id:          pokemonData.id,
      name:        pokemonData.name,
      sprite:      pokemonData.sprites.other["official-artwork"].front_default,
      types:       pokemonData.types.map((t: any) => t.type.name),
      height:      pokemonData.height,        // em decímetros — divide por 10 para metros
      weight:      pokemonData.weight,        // em hectogramas — divide por 10 para kg
      stats:       pokemonData.stats,         // array com HP, Ataque, Defesa...
      description: speciesData.flavor_text_entries
                     .find((f: any) => f.language.name === "en")
                     ?.flavor_text
                     .replace(/\f/g, " "),    // remove caracteres especiais do texto
      evolution:   evoData.chain,             // cadeia evolutiva
    });

  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
  } finally {
    setLoading(false);
  }
    
}

    return(
        <>
        </>
    )
}