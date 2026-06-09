import { NavigationContainer } from '@react-navigation/native';
import RootStack from './components/Navigation';
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function App() {
  return (
      <GestureHandlerRootView  style={{ flex: 1 }}>
          <NavigationContainer>
              <RootStack />
          </NavigationContainer>
      </GestureHandlerRootView>

  );
};
