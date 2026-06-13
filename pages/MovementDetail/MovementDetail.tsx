import { useEffect } from "react";
import { RootStackParams } from "../../components/Route/Navigation";
import { Background } from "../../styles/GlobalStyle"
import { RouteProp, useRoute } from "@react-navigation/native";

export default function MovementDetail(){ 
    type Route = RouteProp<RootStackParams, "MovementDetail">;

    const { params } = useRoute<Route>();

    const { url } = params;


    useEffect(() => {
        fetchMove();
    }, [])

    const fetchMove = async(): Promise<void> => {
        try{
            const fetchData = await fetch(url);
            const resData = fetchData.json();
            
        }
    }


    return(
    <Background>

    </Background>
    )

}