import { useEffect, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParams } from "../components/Route/Navigation";
import { MoveInfo, PokemonDataResponse } from "../interfaces/Pokemon";

import { useMovimentList } from "../service/useMovimentList";

export default function useFetchMovementsList() {
  type Route = RouteProp<RootStackParams, "Movements">;

  const { params } = useRoute<Route>();
  const { id, name, background } = params;

  const [moves, setMoves] = useState<MoveInfo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMoves();
  }, [id]); // Boa prática monitorar o ID caso mude dinamicamente

  const fetchMoves = async (): Promise<void> => {
    try {
      setLoading(true);

      // Usando o seu serviço Axios unificado (loadPokemons ou a rota de detalhe que traz os moves)
      const data: PokemonDataResponse = await useMovimentList.fetchMoves(id);

      const dataMoves: MoveInfo[] = data.moves
        // Filtra só movimentos aprendidos subindo de nível
        .filter((item) =>
          item.version_group_details.some(
            (v) => v.move_learn_method.name === "level-up",
          ),
        )
        // Mapeia extraindo o nível
        .map((item) => {
          const detail = item.version_group_details
            .filter((v) => v.move_learn_method.name === "level-up")
            .sort((a, b) => b.level_learned_at - a.level_learned_at)[0];

          return {
            name: item.move.name,
            url: item.move.url,
            level: detail?.level_learned_at ?? 0,
          };
        })
        // Ordena do menor nível para o maior
        .sort((a, b) => a.level - b.level);

      setMoves(dataMoves);
    } catch (error) {
      console.error("Erro ao buscar movimentos:", error);
    } finally {
      setLoading(false);
    }
  };

  // ─── Retorno unificado para a tela de Movimentos ───────────────────────────
  return {
    pokemonName: name,
    background,
    moves,
    loading,
    refetchMoves: fetchMoves,
  };
}
