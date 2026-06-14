import React from "react";
import { Modal, TouchableOpacity, FlatList, View } from "react-native";
import styled from "styled-components/native";

// ─── Tipos disponíveis ────────────────────────────────────────────────────────
const TYPES = [
  { name: "fire",     label: "Fogo",     bg: "rgba(240,100,50,0.28)",  text: "#f4845f" },
  { name: "water",    label: "Água",     bg: "rgba(80,130,240,0.28)",  text: "#7da8f5" },
  { name: "grass",    label: "Planta",   bg: "rgba(120,200,80,0.28)",  text: "#a8e06a" },
  { name: "electric", label: "Elétrico", bg: "rgba(240,210,60,0.28)",  text: "#f0d840" },
  { name: "poison",   label: "Veneno",   bg: "rgba(80,160,100,0.28)",  text: "#6ecf8a" },
  { name: "psychic",  label: "Psíquico", bg: "rgba(220,180,240,0.25)", text: "#d4b0f0" },
  { name: "normal",   label: "Normal",   bg: "rgba(210,210,210,0.2)",  text: "#d4d4d4" },
  { name: "ice",      label: "Gelo",     bg: "rgba(80,160,200,0.28)",  text: "#70c0e0" },
  { name: "ghost",    label: "Fantasma", bg: "rgba(100,80,200,0.28)",  text: "#9080e0" },
  { name: "dragon",   label: "Dragão",   bg: "rgba(80,80,240,0.28)",   text: "#8080f0" },
  { name: "dark",     label: "Sombrio",  bg: "rgba(60,40,40,0.35)",    text: "#a08080" },
  { name: "fighting", label: "Lutador",  bg: "rgba(200,80,80,0.28)",   text: "#e08080" },
  { name: "steel",    label: "Aço",      bg: "rgba(180,180,210,0.25)", text: "#b8b8d0" },
  { name: "fairy",    label: "Fada",     bg: "rgba(240,180,200,0.28)", text: "#f0b0c8" },
  { name: "ground",   label: "Terra",    bg: "rgba(150,100,50,0.28)",  text: "#c8a06a" },
  { name: "rock",     label: "Pedra",    bg: "rgba(150,130,80,0.28)",  text: "#c8b060" },
  { name: "bug",      label: "Inseto",   bg: "rgba(120,160,40,0.28)",  text: "#a0c840" },
  { name: "flying",   label: "Voador",   bg: "rgba(120,160,220,0.28)", text: "#a0c0e8" },
];

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  visible:        boolean;
  selectedType:   string | null;
  onSelectType:   (type: string | null) => void;
  onClose:        () => void;
}

// ─── Styled Components ────────────────────────────────────────────────────────
const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0,0,0,1);
`;

const ModalContainer = styled.View`
  flex: 1;
  padding: 24px 16px;
`;

const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const ModalTitle = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
`;

const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(255,255,255,0.1);
  align-items: center;
  justify-content: center;
`;

const CloseText = styled.Text`
  font-size: 20px;
  color: #ffffff;
`;

// Botão "Todos"
const AllButton = styled.TouchableOpacity<{ selected: boolean }>`
  height: 56px;
  border-radius: 16px;
  background-color: ${({ selected }) => selected ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)"};
  border-width: 1px;
  border-color: ${({ selected }) => selected ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)"};
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

const AllButtonText = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 0.5px;
`;

// Card de tipo
const TypeCard = styled.TouchableOpacity<{ bg: string; selected: boolean }>`
  flex: 1;
  height: 56px;
  border-radius: 16px;
  background-color: ${({ bg }) => bg};
  border-width: ${({ selected }) => selected ? "2px" : "1px"};
  border-color: ${({ selected }) => selected ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)"};
  align-items: center;
  justify-content: center;
  margin: 4px;
`;

const TypeCardText = styled.Text<{ color: string }>`
  font-size: 13px;
  font-weight: 700;
  color: ${({ color }) => color};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// ─── Componente ───────────────────────────────────────────────────────────────
export default function TypeFilterModal({ visible, selectedType, onSelectType, onClose }: Props) {

  const handleSelect = (type: string | null) => {
    onSelectType(type);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Overlay>
        <ModalContainer>

          {/* Header */}
          <ModalHeader>
            <ModalTitle>Filtrar por tipo</ModalTitle>
            <CloseButton onPress={onClose}>
              <CloseText>✕</CloseText>
            </CloseButton>
          </ModalHeader>

          {/* Botão Todos */}
          <AllButton
            selected={selectedType === null}
            onPress={() => handleSelect(null)}
          >
            <AllButtonText>🔍 Todos os Pokémon</AllButtonText>
          </AllButton>

          {/* Grid de tipos */}
          <FlatList
            data={TYPES}
            keyExtractor={(item) => item.name}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TypeCard
                bg={item.bg}
                selected={selectedType === item.name}
                onPress={() => handleSelect(item.name)}
                activeOpacity={0.8}
              >
                <TypeCardText color={item.text}>{item.label}</TypeCardText>
              </TypeCard>
            )}
          />

        </ModalContainer>
      </Overlay>
    </Modal>
  );
}