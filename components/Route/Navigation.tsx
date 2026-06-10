import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokemonListScreen from "../../pages/Home/PokemonListScreen";

const Stack = createNativeStackNavigator();

export default function RootStack(){
return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PokemonListScreen" component={PokemonListScreen}/>
    </Stack.Navigator>
)


}