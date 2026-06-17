import api from "./api";

// Dica: Mudamos o nome de 'usePokemonList' para 'pokemonService'
// apenas para não confundir com as regras de Hooks do React (que sempre começam com 'use')
export const pokemonService = {
  loadAllNames: async (limit: number, offset: number) => {
    // Corrigido: 'response' com 'n'
    const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
    return response.data;
  },

  loadPokemons: async (currentOffset: number) => {
    const response = await api.get(`/pokemon?limit=20&offset=${currentOffset}`);
    return response.data;
  },

  loadPokemonType: async (type: string) => {
    // Corrigido: adicionada a barra '/' antes de type para garantir a rota correta
    const response = await api.get(`/type/${type}`);
    return response.data;
  },
};
