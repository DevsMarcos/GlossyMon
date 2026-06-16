import { Background, ContainerGlobal, Description, Section, SectionTitle, TouchableButton } from "../../styles/GlobalStyle";
import { useNavigation } from "@react-navigation/native";
import { ContainerView } from "./NotFoundPokemonDetailStyle";
export default function NotFoundPokemonDetail(){

    const navigation = useNavigation();
    return(
        <Background>
            <ContainerGlobal>
                <ContainerView>
                <Section>
                    <SectionTitle>
                        Falha na Busca!
                    </SectionTitle>
                    <Description>
                        Não foi possivel carregar detalhes desse pokemon,
                        ele está sendo implementado, tente novamente mais tarde!
                    </Description>
                    <TouchableButton onPress={() => navigation.goBack()}>
                        <SectionTitle>Voltar</SectionTitle>
                    </TouchableButton>
                </Section>
                </ContainerView>

            </ContainerGlobal>
        </Background>
    )
}