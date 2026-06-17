import { Pokemon } from "./Pokemon";

export interface PokemonCardProps {
  pokemon: Pokemon;
  onPress?: (pokemon: Pokemon) => void;
}
