import { useEffect, useState } from "react";
import { RootStackParams } from "../components/Route/Navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { TYPE_GRADIENTS } from "../styles/GlobalStyle";
import { MoveDetails } from "../interfaces/Pokemon";

export default function useFetchMovimentDetais(){
    type Route = RouteProp<RootStackParams, "MovementDetail">;

    const { params } = useRoute<Route>();
    const { url, name } = params;
    
    const [move, setMove] = useState<MoveDetails>();
    const [loading, setLoading] = useState(false);
    const [background, setBackground] = useState<string[]>([
      "#1a1035", "#0f1d3e", "#0a0a1a",
    ]);

    // Caso não vá usar o textColor por enquanto, pode mantê-lo aqui ou removê-lo
    const [textColor, setT] = useState<string[]>([
      "#1a1035", "#0f1d3e", "#0a0a1a",
    ]);

    const getGradient = (type: string): string[] =>
      TYPE_GRADIENTS[type] ?? ["#1a1035", "#0f1d3e", "#0a0a1a"];

    useEffect(() => {
        fetchMove();
    }, []);

    useEffect(() => {
        if (move) {
          setBackground(getGradient(move.type.name));
        }
    }, [move]);

    const fetchMove = async(): Promise<void> => {
        try {
            // CORREÇÃO: Ativa o loading ao iniciar a busca externa
            setLoading(true);

            const fetchData = await fetch(url);
            const resData = await fetchData.json();

            setMove({
                accuracy:   resData.accuracy,
                power:      resData.power,
                pp:         resData.pp,
                type:       resData.type,               
                describe:   resData.flavor_text_entries
                                .find((f: any) => f.language.name === "en")
                                ?.flavor_text
                                .replace(/\f/g, " ") ?? "",
                generation: resData.generation.name,
                category:   resData.damage_class.name,
            });
            
        } catch(error) {
            console.error("Erro:", error);
        } finally {
            setLoading(false);
        }
    };

    // ─── Retorno unificado para a tela de Detalhes do Movimento ────────────────
    return {
        // 📊 Dados do Movimento e parâmetros recebidos
        moveName: name,      // Nome do movimento vindo do param da rota
        move,                // Objeto com accuracy, power, pp, describe, etc.
        type: move?.type,
        loading,
        background,          // Gradiente baseado no tipo do movimento (ex: fire, water)
        textColor,           

        // 🚀 Ações
        refetchMove: fetchMove,
    };
}