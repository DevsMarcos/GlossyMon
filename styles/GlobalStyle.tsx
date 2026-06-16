import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

export const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  fire:     { bg: "rgba(240,100,50,0.28)",  text: "#f4845f" },
  water:    { bg: "rgba(80,130,240,0.28)",  text: "#7da8f5" },
  grass:    { bg: "rgba(120,200,80,0.28)",  text: "#a8e06a" },
  poison:   { bg: "rgba(80,160,100,0.28)", text: "#6ecf8a" },
  electric: { bg: "rgba(240,210,60,0.28)", text: "#f0d840" },
  psychic:  { bg: "rgba(220,180,240,0.25)",text: "#d4b0f0" },
  steel:    { bg: "rgba(180,180,210,0.25)",text: "#b8b8d0" },
  normal:   { bg: "rgba(210,210,210,0.2)", text: "#d4d4d4" },
  ice:      { bg: "rgba(80,160,200,0.28)", text: "#70c0e0" },
  ghost:    { bg: "rgba(100,80,200,0.28)", text: "#9080e0" },
  ground:   { bg: "rgba(150,100,50,0.28)", text: "#c8a06a" },
  fighting: { bg: "rgba(200,80,80,0.28)",  text: "#e08080" },
  dragon:   { bg: "rgba(80,80,240,0.28)",  text: "#8080f0" },
  dark:     { bg: "rgba(60,40,40,0.35)",   text: "#a08080" },
  fairy:    { bg: "rgba(240,180,200,0.28)",text: "#f0b0c8" },
  rock:     { bg: "rgba(150,130,80,0.28)", text: "#c8b060" },
  bug:      { bg: "rgba(120,160,40,0.28)", text: "#a0c840" },
  flying:   { bg: "rgba(120,160,220,0.28)",text: "#a0c0e8" },
};


export const TYPE_GRADIENTS: Record<string, [string, string, string]> = {
  fire:     ["#7a1f00", "#c13a00", "#0a0a1a"],
  water:    ["#003a7a", "#005fb5", "#0a0a1a"],
  grass:    ["#1a3d00", "#2d6b0f", "#0a0a1a"],
  electric: ["#4a3800", "#7a5f00", "#0a0a1a"],
  poison:   ["#3b0066", "#5c0099", "#0a0a1a"],
  psychic:  ["#5c0033", "#990055", "#0a0a1a"],
  normal:   ["#2a2a2a", "#444444", "#0a0a1a"],
  ice:      ["#003a5c", "#005c8a", "#0a0a1a"],
  ghost:    ["#1a0033", "#2d0059", "#0a0a1a"],
  dragon:   ["#00007a", "#0000b5", "#0a0a1a"],
  dark:     ["#1a0a00", "#2d1500", "#0a0a1a"],
  fighting: ["#5c0000", "#8a0000", "#0a0a1a"],
  steel:    ["#1a1a2e", "#2d2d4a", "#0a0a1a"],
  fairy:    ["#5c0033", "#8a0050", "#0a0a1a"],
  ground:   ["#3d2000", "#5c3000", "#0a0a1a"],
  rock:     ["#2d2000", "#4a3300", "#0a0a1a"],
  bug:      ["#1a2d00", "#2d4a00", "#0a0a1a"],
  flying:   ["#001a3d", "#002d5c", "#0a0a1a"],
};

export const ContainerGlobal = styled(SafeAreaView)`
    flex: 1;
    
`

export const Background = styled(LinearGradient).attrs({
  colors: ["#1a1035", "#0f1d3e", "#1b3a6b", "#2d1d5e"],
  start: { x: 0.1, y: 0 },
  end:   { x: 0.9, y: 1 },
})`
  flex: 1;
`;

export const BackgroundLoad = styled(LinearGradient)<{ colors: string[] }>`
  flex: 1;
`;


export const GlobalTopBar = styled.View`
height: 56px;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  align-items: center;
`

export const GlobalTitle = styled.Text`
  font-size: 30px;
  color: #ffffff;
`

// ─── Seções ───────────────────────────────────────────────────────────────────
export const Section = styled.View`
  background-color: rgba(255,255,255,0.1);
  border-width: 1px;
  border-color: rgba(255,255,255,0.18);
  border-radius: 16px;
  padding: 14px 16px;
  margin-bottom: 12px;
`;

export const TouchableButton = styled.TouchableOpacity`
  background-color: rgba(255,255,255,0.1);
  border-width: 1px;
  border-color: rgba(255,255,255,0.18);
  border-radius: 16px;
  padding: 14px 16px;
  padding-left: 20px;
  margin-bottom: 12px;
`;

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
  text-align: center;
`;


interface DescriptionProps {
  align?: 'left' | 'center' | 'right' | 'justify'; // Aceita apenas valores válidos de alinhamento
  case?: 'uppercase' | 'lowercase';
  Size?: '16px' | '18px'
}

export const Description = styled.Text<DescriptionProps>`
  font-size: ${props => props.Size || '16'}px;
  color: rgba(255,255,255,0.85);
  text-align: ${({ align }) =>  align || 'center'};
  font-weight: 600;
  margin-bottom: 10px;

`;

export const OfuscedDescription = styled.Text`
  font-size: 13px;
  color: rgba(255,255,255,0.5);
`;


// ─── Top App Bar ──────────────────────────────────────────────────────────────
export const TopBar = styled.View`
  height: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  margin-top: 2%;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255,255,255,0.12);
  background-color: rgba(255,255,255,0.07);
  text-align: center;
`;

export const TitleArea = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-right: 20%;
`



export const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const BackIcon = styled.Text`
  font-size: 22px;
  color: #ffffff;
`;

export const PokemonNumber = styled.Text`
  font-size: 13px;
  color: rgba(255,255,255,0.5);
`;

export const PokemonName = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  text-transform: capitalize;
  text-align: center;
`;