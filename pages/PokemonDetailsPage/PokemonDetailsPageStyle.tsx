import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";

// ─── Background com gradiente dinâmico ───────────────────────────────────────
export const Background = styled(LinearGradient)<{ colors: string[] }>`
  flex: 1;
`;

export const Container = styled(SafeAreaView)`
  flex: 1;
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

// ─── Sprite ───────────────────────────────────────────────────────────────────
export const SpriteContainer = styled.View`
  align-items: center;
  margin: 16px 0;
`;

export const Sprite = styled(Image)`
  width: 200px;
  height: 200px;
`;

// ─── Tipos ────────────────────────────────────────────────────────────────────
export const TypesRow = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
`;

export const TypeBadge = styled.View<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  padding: 4px 16px;
  border-radius: 20px;
`;

export const TypeBadgeText = styled.Text<{ color: string }>`
  font-size: 11px;
  font-weight: 700;
  color: ${({ color }) => color};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// ─── Info (altura e peso) ─────────────────────────────────────────────────────
export const InfoRow = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-bottom: 16px;
`;

export const InfoCard = styled.View`
  flex: 1;
  background-color: rgba(255,255,255,0.1);
  border-width: 1px;
  border-color: rgba(255,255,255,0.18);
  border-radius: 16px;
  padding: 12px;
  align-items: center;
`;

export const InfoLabel = styled.Text`
  font-size: 10px;
  color: rgba(255,255,255,0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`;

export const InfoValue = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
`;

// ─── Seções ───────────────────────────────────────────────────────────────────
export const Section = styled.View`
  background-color: rgba(255,255,255,0.1);
  border-width: 1px;
  border-color: rgba(255,255,255,0.18);
  border-radius: 16px;
  padding: 14px 16px;
  margin-bottom: 12px;
`;

export const Moves = styled.TouchableOpacity`
  background-color: rgba(255,255,255,0.1);
  border-width: 1px;
  border-color: rgba(255,255,255,0.18);
  border-radius: 16px;
  padding: 14px 16px;
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

export const Description = styled.Text`
  font-size: 16px;
  color: rgba(255,255,255,0.85);
  line-height: 22px;
  text-align: center;
`;

// ─── Stats ────────────────────────────────────────────────────────────────────
export const StatsContainer = styled.View`
  gap: 8px;
`;

export const StatRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const StatLabel = styled.Text`
  font-size: 16px;
  color: rgba(255,255,255,0.55);
  width: 72px;
`;

export const StatTrack = styled.View`
  flex: 1;
  height: 6px;
  background-color: rgba(255,255,255,0.1);
  border-radius: 3px;
  overflow: hidden;
`;

export const StatFill = styled.View<{ width: string; color: string }>`
  height: 100%;
  width: ${({ width }) => width};
  background-color: ${({ color }) => color};
  border-radius: 3px;
`;

export const StatValue = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  width: 28px;
  text-align: right;
`;

export const EvoItem = styled.View`
  align-items: center;
  gap: 6px;
`;

export const EvoSprite = styled(Image)`
  width: 80px;
  height: 80px;
  background-color: rgba(255,255,255,0.1);
  border-radius: 40px;
  border-width: 1px;
  border-color: rgba(255,255,255,0.2);
`;

export const EvoName = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  text-transform: capitalize;
`;

export const EvoArrow = styled.Text`
  font-size: 24px;
  color: rgba(255,255,255,0.5);
  margin-bottom: 20px;
`;