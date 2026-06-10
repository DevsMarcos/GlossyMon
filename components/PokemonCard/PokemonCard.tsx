import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { Pokemon } from "../../interfaces/Pokemon";

import {
  Card,
  CardNumber,
  CardName,
  BadgesRow,
  Badge,
  BadgeText,
} from "./PokemonCardStyle";

interface Props {
  pokemon: Pokemon;
  onPress?: (pokemon: Pokemon) => void;
}

export default function PokemonCard({ pokemon, onPress }: Props) {
  return (
    <TouchableOpacity
    style={{ flex: 1, maxWidth: "50%" }}
    activeOpacity={0.8}
    onPress={() => onPress?.(pokemon)}
    >
      <Card>
        <CardNumber>#{String(pokemon.id).padStart(3, "0")}</CardNumber>

        <Image
          source={{ uri: pokemon.sprite }}
          style={{ width: 72, height: 72 }}
          resizeMode="contain"
        />

        <CardName>{pokemon.name}</CardName>

        <BadgesRow>
          {pokemon.types.map((type) => {
            const colors = TYPE_COLORS[type] ?? { bg: "rgba(200,200,200,0.2)", text: "#ccc" };
            return (
              <Badge key={type} bg={colors.bg}>
                <BadgeText color={colors.text}>{type}</BadgeText>
              </Badge>
            );
          })}
        </BadgesRow>
      </Card>
    </TouchableOpacity>
  );
}

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