import styled from "styled-components/native";

export const Card = styled.View`
width: 90%;
  background-color: rgba(255,255,255,0.1);
  border-width: 1px;
  border-color: rgba(255,255,255,0.18);
  border-radius: 16px;
  padding: 10px;
  align-items: center;
  margin-bottom: 8px;
`;

export const CardNumber = styled.Text`
  font-size: 10px;
  color: rgba(255,255,255,0.4);
  align-self: flex-start;
  margin-bottom: 4px;
`;

export const CardName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  text-transform: capitalize;
  margin-top: 4px;
  margin-bottom: 6px;
`;

export const BadgesRow = styled.View`
  flex-direction: row;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Badge = styled.View<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  padding: 2px 8px;
  border-radius: 20px;
`;

export const BadgeText = styled.Text<{ color: string }>`
  font-size: 12px;
  font-weight: 700;
  color: ${({ color }) => color};
  letter-spacing: 0.4px;
  text-transform: uppercase;
`;