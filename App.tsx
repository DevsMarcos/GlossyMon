import { NavigationContainer } from '@react-navigation/native';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import RootStack from './components/Route/Navigation';

export default function App() {
  return (
      <GestureHandlerRootView  style={{ flex: 1 }}>
          <NavigationContainer>
              <RootStack />
          </NavigationContainer>
      </GestureHandlerRootView>

  );
};
