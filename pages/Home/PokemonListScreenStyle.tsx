import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";


export const Background = styled(LinearGradient).attrs({
  colors: ["#1a1035", "#0f1d3e", "#1b3a6b", "#2d1d5e"],
  start: { x: 0.1, y: 0 },
  end:   { x: 0.9, y: 1 },
})`
  flex: 1;
`;


export const TopBar = styled.View`
height: 56px;
  flex-direction: row;
  border: 2px solid white;
  text-align: center;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  font-size: 30px;
  color: #ffffff;
`

export const PokemonsArea = styled.View`
  flex: 1;
  justify-content: space-between;
  border: 2px solid white;
`
