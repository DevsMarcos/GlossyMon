import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

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
  font-size: 24px;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
  text-align: center;
`;


interface DescriptionProps {
  align?: 'left' | 'center' | 'right' | 'justify'; // Aceita apenas valores válidos de alinhamento
  case?: 'uppercase' | 'lowercase';
  Size?: '16px'
}

export const Description = styled.Text<DescriptionProps>`
  font-size: ${props => props.Size || '16'}px;
  color: rgba(255,255,255,0.85);
  text-align: ${({ align }) =>  align || 'center'};
  font-weight: 600;

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
  padding: 0 16px;
  margin-top: 2%;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255,255,255,0.12);
  background-color: rgba(255,255,255,0.07);
`;

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
  flex: 1;
`;