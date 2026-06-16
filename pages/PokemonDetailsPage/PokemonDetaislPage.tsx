import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StatusBar } from "react-native";
import { RootStackParams } from "../../components/Route/Navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { PokemonProfile } from "../../interfaces/Pokemon";
import {
  Background,
  Container,
  BackIcon,
  SpriteContainer,
  Sprite,
  TypesRow,
  TypeBadge,
  TypeBadgeText,
  Section,
  SectionTitle,
  Description,
  StatsContainer,
  StatRow,
  StatLabel,
  StatTrack,
  StatFill,
  StatValue,
  InfoRow,
  InfoCard,
  InfoLabel,
  InfoValue,
  EvoItem,
  EvoSprite,
  EvoArrow,
  EvoName,
  Moves,
} from "./PokemonDetailsPageStyle";
import Ionicons from '@expo/vector-icons/Ionicons';
import { BackButton, ContainerGlobal, PokemonName, PokemonNumber, TitleArea, TopBar } from "../../styles/GlobalStyle";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import NotFoundPokemonDetail from "../Error/NotFoundPokemonDetails";

// ─── Gradientes por tipo ──────────────────────────────────────────────────────
const TYPE_GRADIENTS: Record<string, [string, string, string]> = {
  fire:     ["#7a1f00", "#c13a00", "#0a0a1a"],
  water:    ["#003a7a", "#005fb5", "#0a0a1a"],
  grass:    ["#1a3d00", "#2d6b0f", "#0a0a1a"],
  electric: ["#4a3800", "#7a5f00", "#0a0a1a"],
  poison:   ["#3b0066", "#5c0099", "#0a0a1a"],
  psychic:  ["#5c0033", "#990055", "#0a0a1a"],
  normal:   ["#2a2a2a", "#444444", "#0a0a1a"],
  ice:      ["#003a5c", "#005c8a", "#0a0a1a"],
  ghost:    ["#1a0033", "#2d0059", "#0a0a1a"],
  dragon:   ["#00007a", "#0000b5", "#0a0a1a"],
  dark:     ["#1a0a00", "#2d1500", "#0a0a1a"],
  fighting: ["#5c0000", "#8a0000", "#0a0a1a"],
  steel:    ["#1a1a2e", "#2d2d4a", "#0a0a1a"],
  fairy:    ["#5c0033", "#8a0050", "#0a0a1a"],
  ground:   ["#3d2000", "#5c3000", "#0a0a1a"],
  rock:     ["#2d2000", "#4a3300", "#0a0a1a"],
  bug:      ["#1a2d00", "#2d4a00", "#0a0a1a"],
  flying:   ["#001a3d", "#002d5c", "#0a0a1a"],
};

const getGradient = (types: string[]): [string, string, string] => {
  return TYPE_GRADIENTS[types[0]] ?? ["#1a1035", "#0f1d3e", "#0a0a1a"];
};

// ─── Cores por tipo ───────────────────────────────────────────────────────────
const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  fire:     { bg: "rgba(240,100,50,0.28)",  text: "#f4845f" },
  water:    { bg: "rgba(80,130,240,0.28)",  text: "#7da8f5" },
  grass:    { bg: "rgba(120,200,80,0.28)",  text: "#a8e06a" },
  poison:   { bg: "rgba(80,160,100,0.28)", text: "#6ecf8a" },
  electric: { bg: "rgba(240,210,60,0.28)", text: "#f0d840" },
  psychic:  { bg: "rgba(220,180,240,0.25)",text: "#d4b0f0" },
  steel:    { bg: "rgba(180,180,210,0.25)",text: "#b8b8d0" },
  normal:   { bg: "rgba(210,210,210,0.2)", text: "#d4d4d4" },
  ice:      { bg: "rgba(80,160,200,0.28)", text: "#70c0e0" },
  ghost:    { bg: "rgba(100,80,200,0.28)", text: "#9080e0" },
  ground:   { bg: "rgba(150,100,50,0.28)", text: "#c8a06a" },
  fighting: { bg: "rgba(200,80,80,0.28)",  text: "#e08080" },
  dragon:   { bg: "rgba(80,80,240,0.28)",  text: "#8080f0" },
  dark:     { bg: "rgba(60,40,40,0.35)",   text: "#a08080" },
  fairy:    { bg: "rgba(240,180,200,0.28)",text: "#f0b0c8" },
  rock:     { bg: "rgba(150,130,80,0.28)", text: "#c8b060" },
  bug:      { bg: "rgba(120,160,40,0.28)", text: "#a0c840" },
  flying:   { bg: "rgba(120,160,220,0.28)",text: "#a0c0e8" },
};

// ─── Nomes dos stats ──────────────────────────────────────────────────────────
const STAT_NAMES: Record<string, string> = {
  hp:               "HP",
  attack:           "Ataque",
  defense:          "Defesa",
  "special-attack": "Sp. Atk",
  "special-defense":"Sp. Def",
  speed:            "Velocidade",
};

const STAT_COLORS: Record<string, string> = {
  hp:               "#639922",
  attack:           "#BA7517",
  defense:          "#185FA5",
  "special-attack": "#993556",
  "special-defense":"#534AB7",
  speed:            "#993C1D",
};

const MAX_STAT = 255;

type Route = RouteProp<RootStackParams, "ProfilePokemon">;

export default function PokemonDetailsPage() {
  const { params } = useRoute<Route>();
  const { id }     = params;
  const [pokemon,    setPokemon]    = useState<PokemonProfile | null>(null);
  const [loading,    setLoading]    = useState(false);
  const [background, setBackground] = useState<[string, string, string]>([
    "#1a1035", "#0f1d3e", "#0a0a1a",
  ]);
  const [evolutions, setEvolutions] = useState<{ name: string; sprite: string }[]>([]);
  const [error, setError] = useState<boolean>(false);


  type Nav = NativeStackNavigationProp<RootStackParams , "Movements">


  const navigation = useNavigation<Nav>();


  // ── Busca os dados do pokémon ───────────────────────────────────────────────
  useEffect(() => {
    fetchPokemon(id);
  }, [id]);

  // ── Atualiza o gradiente quando o pokémon carrega ───────────────────────────
  useEffect(() => {
    if (pokemon) {
      setBackground(getGradient(pokemon.types));
    }
  }, [pokemon]);


    const parseEvolutions = async (chain: any) => {
  const evos: { name: string; sprite: string }[] = [];
  let current = chain;

  while (current) {
    const name   = current.species.name;
    const res    = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data   = await res.json();
    const sprite = data.sprites.other["official-artwork"].front_default
                ?? data.sprites.front_default;

    evos.push({ name, sprite });
    current = current.evolves_to?.[0] ?? null;
  }

  setEvolutions(evos);
};




  const fetchPokemon = async (id: number) => {
    try {
    // 1. Ativa o loading e limpa erros anteriores
    setLoading(true);
    setError(false); 

    // 2. Faz as buscas iniciais em paralelo
    const [pokemonRes, speciesRes] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);

    // FORÇA IR PARA O CATCH se o Pokémon não existir (evita o 404 travar o app)
    if (!pokemonRes.ok || !speciesRes.ok) {
      throw new Error("Pokémon não encontrado na PokéAPI");
    }

    const pokemonData = await pokemonRes.json();
    const speciesData = await speciesRes.json();

    // 3. Busca a evolução com segurança
    if (speciesData?.evolution_chain?.url) {
      const evoRes  = await fetch(speciesData.evolution_chain.url);
      
      if (evoRes.ok) {
        const evoData = await evoRes.json();
        // Executa o seu parse de evolução
        await parseEvolutions(evoData.chain);
      }
    }

      setPokemon({
        id:          pokemonData.id,
        name:        pokemonData.name,
        sprite:      pokemonData.sprites.other["official-artwork"].front_default,
        types:       pokemonData.types.map((t: any) => t.type.name),
        height:      pokemonData.height,
        weight:      pokemonData.weight,
        stats:       pokemonData.stats,
        description: speciesData.flavor_text_entries
                       .find((f: any) => f.language.name === "en")
                       ?.flavor_text
                       .replace(/\f/g, " "),
        evolution:   speciesData.chain,
      });

    } catch (error) {
    // Se QUALQUER coisa acima falhar, cai aqui
    console.log("Erro capturado com sucesso:", error);
    setError(true); // Ativa sua tela de NotFound
  } finally {
    // Esse bloco OBRIGATORIAMENTE roda, dando certo ou dando erro!
    // Isso garante o fim do loading infinito.
    setLoading(false); 
  }
  };



  if (loading) {
    return (
      <Background colors={["#1a1035", "#0f1d3e", "#0a0a1a"]}>
        <ActivityIndicator size="large" color="#a78bfa" style={{ flex: 1 }} />
      </Background>
    );
  };



  if(error){
    return <NotFoundPokemonDetail/>
  };

  if (!pokemon) {
    return null; // Ou outra tela de loading vazia
  }

  return (
    <Background colors={background}>
      <ContainerGlobal edges={["top", "bottom"]}>

        <StatusBar
          hidden={true} // Faz o app ocupar o espaço da barra de status
        />

        {/* Top App Bar */}
        <TopBar>
          <BackButton onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={32} color="white" />
          </BackButton>
          <TitleArea>
            <PokemonName>{pokemon.name}</PokemonName>
          </TitleArea>
        </TopBar>

        <ScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >

          {/* Sprite */}
          <SpriteContainer>
            <PokemonNumber>#{String(pokemon.id).padStart(3, "0")}</PokemonNumber>
            <Sprite source={{ uri: pokemon.sprite }} resizeMode="contain" />
          </SpriteContainer>

          {/* Tipos */}
          <TypesRow>
            {pokemon.types.map((type) => {
              const colors = TYPE_COLORS[type] ?? { bg: "rgba(200,200,200,0.2)", text: "#ccc" };
              return (
                <TypeBadge key={type} bg={colors.bg}>
                  <TypeBadgeText color={colors.text}>{type}</TypeBadgeText>
                </TypeBadge>
              );
            })}
          </TypesRow>

          {/* Altura e Peso */}
          <InfoRow>
            <InfoCard>
              <InfoLabel>Altura</InfoLabel>
              <InfoValue>{(pokemon.height / 10).toFixed(1)}m</InfoValue>
            </InfoCard>
            <InfoCard>
              <InfoLabel>Peso</InfoLabel>
              <InfoValue>{(pokemon.weight / 10).toFixed(1)}kg</InfoValue>
            </InfoCard>
          </InfoRow>

          {/* Descrição */}
          <Section>
            <SectionTitle>Descrição</SectionTitle>
            <Description>{pokemon.description}</Description>
          </Section>

          {/* Stats */}
          <Section>
            <SectionTitle>Estados Base</SectionTitle>
            <StatsContainer>
              {pokemon.stats.map((stat: any) => (
                <StatRow key={stat.stat.name}>
                  <StatLabel>{STAT_NAMES[stat.stat.name] ?? stat.stat.name}</StatLabel>
                  <StatTrack>
                    <StatFill
                      width={`${(stat.base_stat / MAX_STAT) * 100}%`}
                      color={STAT_COLORS[stat.stat.name] ?? "#888"}
                    />
                  </StatTrack>
                  <StatValue>{stat.base_stat}</StatValue>
                </StatRow>
              ))}
            </StatsContainer>
          </Section>
         {/* Evoluções */}
          {evolutions.length > 1 && (
            <Section>
              <SectionTitle>Evoluções</SectionTitle>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12, alignItems: "center" }}
              >
                {evolutions.map((evo, index) => (
                  <EvoItem key={evo.name} style={{ flexDirection: "row", alignItems: "center"}}>
                    <EvoSprite source={{ uri: evo.sprite }} resizeMode="contain" />
                    <EvoName>{evo.name}</EvoName>
                    {index < evolutions.length - 1 && (
                      <MaterialIcons name="arrow-right" size={32} color="white" />
                    )}
                  </EvoItem>
                ))}
              </ScrollView>
            </Section>
          )}

          <Moves onPress={() => navigation.navigate("Movements", { id: pokemon.id, name: pokemon.name, background: background })}>
            <SectionTitle>Movimentos</SectionTitle>
          </Moves>

        </ScrollView>
      </ContainerGlobal>
    </Background>
  );
}