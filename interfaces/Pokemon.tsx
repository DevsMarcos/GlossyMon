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

export interface MoveInfo {
  name:  string;
  url:   string;
  level: number;
}

export interface PokemonMove {
  move: { name: string; url: string };
  version_group_details: {
    level_learned_at:  number;
    move_learn_method: { name: string };
  }[];
}

export interface PokemonDataResponse {
  moves: PokemonMove[];
  // Omitimos as outras propriedades da API que não vamos usar agora
}

export interface MoveDetails {
  accuracy:   number;
  power:      number;
  pp:         number;
  type:       { name: string };   // objeto, não array
  describe:   string;
  generation: string;
  category:   string;
}

export interface typeMoviment {
  name: string
}