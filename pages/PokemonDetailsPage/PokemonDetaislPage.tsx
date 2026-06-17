import React from "react"; // Boa prática manter o React importado
import { ActivityIndicator, ScrollView, StatusBar } from "react-native";
import { RootStackParams } from "../../components/Route/Navigation";
import { useNavigation } from "@react-navigation/native";
import {
  Background,
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
  EvoName,
  Moves,
} from "./PokemonDetailsPageStyle";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  BackButton,
  ContainerGlobal,
  PokemonName,
  PokemonNumber,
  TitleArea,
  TopBar,
} from "../../styles/GlobalStyle";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import NotFoundPokemonDetail from "../Error/NotFoundPokemonDetails";
import useFetchPokemonDetail from "../../hooks/useFetchPokemonDetail";

export default function PokemonDetailsPage() {
  type Nav = NativeStackNavigationProp<RootStackParams, "Movements">;
  const navigation = useNavigation<Nav>();

  // ─── DESESTRUTURAÇÃO DO SEU HOOK (A MÁGICA ACONTECE AQUI) ───────────────────
  const {
    pokemon,
    evolutions,
    loading,
    error,
    background,
    TYPE_COLORS,
    STAT_NAMES,
    STAT_COLORS,
    MAX_STAT,
  } = useFetchPokemonDetail();

  // ─── RENDERIZAÇÕES DE CONTROLE (LOADING / ERRO) ────────────────────────────
  if (loading) {
    return (
      <Background colors={["#1a1035", "#0f1d3e", "#0a0a1a"]}>
        <ActivityIndicator size="large" color="#a78bfa" style={{ flex: 1 }} />
      </Background>
    );
  }

  if (error) {
    return <NotFoundPokemonDetail />;
  }

  if (!pokemon) {
    return null;
  }

  // ─── RENDERIZAÇÃO DA SUA TELA PRINCIPAL ────────────────────────────────────
  return (
    <Background colors={background}>
      <ContainerGlobal edges={["top", "bottom"]}>
        <StatusBar hidden={true} />

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
            <PokemonNumber>
              #{String(pokemon.id).padStart(3, "0")}
            </PokemonNumber>
            <Sprite source={{ uri: pokemon.sprite }} resizeMode="contain" />
          </SpriteContainer>

          {/* Tipos */}
          <TypesRow>
            {pokemon.types.map((type) => {
              const colors = TYPE_COLORS[type] ?? {
                bg: "rgba(200,200,200,0.2)",
                text: "#ccc",
              };
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
                  <StatLabel>
                    {STAT_NAMES[stat.stat.name] ?? stat.stat.name}
                  </StatLabel>
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
                  <EvoItem
                    key={evo.name}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <EvoSprite
                      source={{ uri: evo.sprite }}
                      resizeMode="contain"
                    />
                    <EvoName>{evo.name}</EvoName>
                    {index < evolutions.length - 1 && (
                      <MaterialIcons
                        name="arrow-right"
                        size={32}
                        color="white"
                      />
                    )}
                  </EvoItem>
                ))}
              </ScrollView>
            </Section>
          )}

          {/* Botão de Movimentos */}
          <Moves
            onPress={() =>
              navigation.navigate("Movements", {
                id: pokemon.id,
                name: pokemon.name,
                background: background,
              })
            }
          >
            <SectionTitle>Movimentos</SectionTitle>
          </Moves>
        </ScrollView>
      </ContainerGlobal>
    </Background>
  );
}
