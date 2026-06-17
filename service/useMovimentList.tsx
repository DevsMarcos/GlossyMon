import api from "./api";

export const useMovimentList = {
  fetchMoves: async (id: number) => {
    const response = await api.get(`/pokemon/${id}`);
    return response.data;
  },
};
