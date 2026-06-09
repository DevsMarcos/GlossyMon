import { NavigationContainer } from '@react-navigation/native';
import RootStack from './components/Navigation';

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};
