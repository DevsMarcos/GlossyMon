export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

// Interface do perfil completo
export interface PokemonProfile {
  id:          number;
  name:        string;
  sprite:      string;
  types:       string[];
  height:      number;
  weight:      number;
  stats:       Stat[];
  description: string;
  evolution:   any;
}

interface Stat {
  base_stat: number;
  stat: { name: string };
}