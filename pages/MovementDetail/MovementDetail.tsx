import { useEffect, useState } from "react";
import { RootStackParams } from "../../components/Route/Navigation";
import { BackButton, Background, BackgroundLoad, ContainerGlobal, PokemonName, PokemonNumber, SectionTitle, TopBar, TYPE_COLORS, TYPE_GRADIENTS } from "../../styles/GlobalStyle"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { MoveDetails } from "../../interfaces/Pokemon";
import { ActivityIndicator, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Description, Section } from "../PokemonDetailsPage/PokemonDetailsPageStyle";
import { ContainerMovement, SectionMove, SectionMoveData } from "./MovementDetaisStyle";

export default function MovementDetail(){ 
    type Route = RouteProp<RootStackParams, "MovementDetail">;

    const navigation = useNavigation()

    const { params } = useRoute<Route>();

    const { url, name } = params;
    const [move, setMove] = useState<MoveDetails>();
    const [loading,    setLoading]    = useState(false);
    const [background, setBackground] = useState<string[]>([
    "#1a1035", "#0f1d3e", "#0a0a1a",
  ]);

      const [textColor, setT] = useState<string[]>([
    "#1a1035", "#0f1d3e", "#0a0a1a",
  ]);

const getGradient = (type: string): string[] =>
  TYPE_GRADIENTS[type] ?? ["#1a1035", "#0f1d3e", "#0a0a1a"];


    useEffect(() => {
        fetchMove();
    }, [])

      useEffect(() => {
        if (move) {
          setBackground(getGradient(move.type.name));
        }
      }, [move]);

    const fetchMove = async(): Promise<void> => {
        try{
            const fetchData = await fetch(url);
            const resData = await fetchData.json();

            setMove({
        accuracy:   resData.accuracy,
        power:      resData.power,
        pp:         resData.pp,
        type:       resData.type,               // { name: "fire" }
        describe:   resData.flavor_text_entries
                        .find((f: any) => f.language.name === "en")
                        ?.flavor_text
                        .replace(/\f/g, " ") ?? "",
        generation: resData.generation.name,
        category:   resData.damage_class.name,
        });
            
    }catch(error){
        console.error("Erro:", error);
        } finally {
            setLoading(false);
        }
    }


if (loading || !move) {
  return (
    <Background>
      <ActivityIndicator size="large" color="#a78bfa" style={{ flex: 1 }} />
    </Background>
  );
}

const colors = TYPE_COLORS[move.type.name] ?? { bg: "rgba(200,200,200,0.2)", text: "#ccc" };

return (
  <BackgroundLoad colors={background}>
    <ContainerGlobal>

        <TopBar>
            <BackButton onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={32} color="white" />
            </BackButton>
            <PokemonName>{name}</PokemonName>
            <PokemonName>{move.type.name}</PokemonName>
        </TopBar>
        <ContainerMovement>
            <SectionMove>
                <SectionMoveData>
                    <SectionTitle>Poder</SectionTitle>
                    <Description>{move.power}</Description>
                    <SectionTitle>PP</SectionTitle>
                    <Description>{move.pp}</Description>
                </SectionMoveData>

                <SectionMoveData>
                    <SectionTitle>Precisao</SectionTitle>
                    <Description>{move.accuracy}</Description>
                    <SectionTitle>Dano</SectionTitle>
                    <Description>{move.power}</Description>
                </SectionMoveData>
            </SectionMove>

            <Section>
                <SectionTitle>Descrição</SectionTitle>
                <Description>{move.describe}</Description>
            </Section>

            <SectionMove>
                <SectionMoveData>
                    <SectionTitle>Geração</SectionTitle>
                    <Description>{move.generation}</Description>

                </SectionMoveData>

                <SectionMoveData>
                    <SectionTitle>Categoria</SectionTitle>
                    <Description>{move.type.name}</Description>

                </SectionMoveData>
            </SectionMove>


        </ContainerMovement>

    </ContainerGlobal>
  </BackgroundLoad>

  
);

}