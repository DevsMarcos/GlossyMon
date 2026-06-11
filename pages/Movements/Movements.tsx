import { Route, RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParams } from "../../components/Route/Navigation";
import { useState } from "react";



export default function Movements(){

    type Route = RouteProp<RootStackParams, "Movements">;
    
    const { params } = useRoute<Route>();

    const { id } = params;
    const [moviments,    setMoviments]    = useState<PokemonProfile | null>(null);
    const [loading,    setLoading]    = useState(false);
    const [background, setBackground] = useState<[string, string, string]>([
    "#1a1035", "#0f1d3e", "#0a0a1a",
  ]);
    
    return(
        <>
        </>
    )
}