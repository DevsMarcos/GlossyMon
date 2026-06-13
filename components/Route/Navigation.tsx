import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokemonListScreen from "../../pages/Home/PokemonListScreen";
import PokemonDetailsPage from "../../pages/PokemonDetailsPage/PokemonDetaislPage";
import Movements from "../../pages/Movements/Movements";

// Navigation.tsx
export type RootStackParams = {
  PokemonListScreen:    undefined;
  ProfilePokemon: { id: number };
  Movements: { id: number, name: string }
};

const Stack = createNativeStackNavigator<RootStackParams>();


export default function RootStack(){
return(
    <Stack.Navigator screenOptions={{ headerShown: false}}>
        <Stack.Screen name="PokemonListScreen" component={PokemonListScreen}/>
        <Stack.Screen name="ProfilePokemon" component={PokemonDetailsPage}/>
        <Stack.Screen name="Movements" component={Movements}/>
    </Stack.Navigator>
)


}