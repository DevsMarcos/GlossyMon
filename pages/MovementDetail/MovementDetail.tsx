import React from "react"; // Mantendo a boa prática
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  BackButton,
  Background,
  BackgroundLoad,
  ContainerGlobal,
  PokemonName,
  SectionTitle,
  TitleArea,
  TopBar,
} from "../../styles/GlobalStyle";
import { Description, Section } from "../PokemonDetailsPage/PokemonDetailsPageStyle";
import { ContainerMovement, SectionMove, SectionMoveData } from "./MovementDetaisStyle";
// 1. Importando o seu hook customizado
import useFetchMovimentDetais from "../../hooks/useFetchMovimentDetaisl";

export default function MovementDetail() { 
  const navigation = useNavigation();

  // ─── CONEXÃO COM O SEU HOOK (DESESTRUTURAÇÃO) ──────────────────────────────
  const {
    moveName,
    move,
    loading,
    background,
  } = useFetchMovimentDetais();

  // ─── TELA DE LOADING / DADOS AUSENTES ──────────────────────────────────────
  if (loading || !move) {
    return (
      <Background>
        <ActivityIndicator size="large" color="#a78bfa" style={{ flex: 1, justifyContent: "center" }} />
      </Background>
    );
  }

  // ─── RENDERIZAÇÃO DA SUA INTERFACE PRINCIPAL ───────────────────────────────
  return (
    <BackgroundLoad colors={background}>
      <ContainerGlobal edges={["top", "bottom"]}>

        {/* Barra Superior */}
        <TopBar>
          <BackButton onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={32} color="white" />
          </BackButton>
          <TitleArea>
            {/* Exibe o nome do movimento formatado vindo do hook */}
            <PokemonName>
              {moveName.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase())}
            </PokemonName>
          </TitleArea>
        </TopBar>

        {/* Painel de Informações do Movimento */}
        <ContainerMovement>
          
          <SectionMove>
            <SectionMoveData>
              <SectionTitle>Poder</SectionTitle>
              <Description>{move.power ?? "--"}</Description>
              
              <SectionTitle>PP</SectionTitle>
              <Description>{move.pp}</Description>
            </SectionMoveData>

            <SectionMoveData>
              <SectionTitle>Precisão</SectionTitle>
              <Description>{move.accuracy ? `${move.accuracy}%` : "--"}</Description>
              
              <SectionTitle>Tipo</SectionTitle>
              {/* Exibe o tipo do movimento (ex: Fire, Water) */}
              <Description style={{ textTransform: "capitalize" }}>
                {move.type.name}
              </Description>
            </SectionMoveData>
          </SectionMove>

          {/* Seção de Descrição do Efeito */}
          <Section>
            <SectionTitle>Descrição</SectionTitle>
            <Description>{move.describe}</Description>
          </Section>

          <SectionMove>
            <SectionMoveData>
              <SectionTitle>Geração</SectionTitle>
              {/* Limpa o texto da geração (ex: generation-v -> Generation V) */}
              <Description style={{ textTransform: "uppercase" }}>
                {move.generation.replace("generation-", "Gen ")}
              </Description>
            </SectionMoveData>

            <SectionMoveData>
              <SectionTitle>Categoria</SectionTitle>
              {/* Exibe se o movimento é Físico, Especial ou Status */}
              <Description style={{ textTransform: "capitalize" }}>
                {move.category}
              </Description>
            </SectionMoveData>
          </SectionMove>

        </ContainerMovement>
      </ContainerGlobal>
    </BackgroundLoad>
  );
}