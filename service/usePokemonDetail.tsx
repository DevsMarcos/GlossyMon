import api from "./api";

export const pokemonDetailService = {
    loadEvolutions: async (name: string) => {
        const response = await api.get(`/pokemon/${name}`);
        return response.data;
    },

    loadPokemon: async (id: number) => {
        const response = await api.get(`/pokemon/${id}`);
        return response.data;
    },

    loadPokemonSpecie: async (id: number) => {
        const response = await api.get(`/pokemon-species/${id}`);
        return response.data;
    }
}