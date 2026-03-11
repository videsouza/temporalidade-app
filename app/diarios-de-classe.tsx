import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import {
  EducationType,
  FundamentalOrganization,
  EJALevel,
  infantilLevels,
  fundamentalSerieOptions,
  fundamentalYearOptions,
  ejaIOptions,
  ejaIIOptions,
  formatTemporalityDisplay,
} from "@/hooks/use-diarios-temporalidade";

type Step = "education" | "organization" | "level";

export default function DiariosDeClasseScreen() {
  const router = useRouter();
  const colors = useColors();
  const [step, setStep] = useState<Step>("education");
  const [educationType, setEducationType] = useState<EducationType | null>(null);
  const [fundamentalOrg, setFundamentalOrg] = useState<FundamentalOrganization | null>(null);
  const [ejaLevel, setEjaLevel] = useState<EJALevel | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<{ label: string; years: number } | null>(null);

  const handleEducationSelect = (type: EducationType) => {
    setEducationType(type);
    if (type === "fundamental") {
      setStep("organization");
    } else if (type === "eja") {
      setStep("organization");
    } else {
      setStep("level");
    }
  };

  const handleFundamentalOrgSelect = (org: FundamentalOrganization) => {
    setFundamentalOrg(org);
    setStep("level");
  };

  const handleEJALevelSelect = (level: EJALevel) => {
    setEjaLevel(level);
    setStep("level");
  };

  const handleLevelSelect = (level: { label: string; years: number }) => {
    setSelectedLevel(level);
  };

  const handleBack = () => {
    if (step === "level") {
      if (educationType === "fundamental" || educationType === "eja") {
        setStep("organization");
      } else {
        setStep("education");
      }
    } else if (step === "organization") {
      setStep("education");
    } else {
      router.back();
    }
  };

  const handleReset = () => {
    setStep("education");
    setEducationType(null);
    setFundamentalOrg(null);
    setEjaLevel(null);
    setSelectedLevel(null);
  };

  const handleNewSearch = () => {
    handleReset();
  };

  const getLevelOptions = () => {
    if (educationType === "infantil") {
      return infantilLevels;
    } else if (educationType === "fundamental") {
      if (fundamentalOrg === "serie") {
        return fundamentalSerieOptions;
      } else {
        return fundamentalYearOptions;
      }
    } else if (educationType === "eja") {
      if (ejaLevel === "eja1") {
        return ejaIOptions;
      } else {
        return ejaIIOptions;
      }
    }
    return [];
  };

  const getEducationLabel = (type: EducationType): string => {
    switch (type) {
      case "infantil":
        return "Educação Infantil";
      case "fundamental":
        return "Ensino Fundamental";
      case "eja":
        return "EJA";
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <ScreenContainer className="p-4 bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="gap-6 py-4">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Diários de Classe</Text>
            <Text className="text-sm text-muted">Código: 5.3.02.01.12</Text>
            <Text className="text-xs text-muted mt-2">
              Calcule a temporalidade do diário de classe conforme o nível/série/fase
            </Text>
          </View>

          {/* Step Indicator */}
          <View
            className="p-3 rounded-lg"
            style={{
              backgroundColor: colors.surface,
            }}
          >
              <Text className="text-xs text-muted">
              {step === "education" && "Etapa 1: Selecione o tipo de educação"}
              {step === "organization" && "Etapa 2: Selecione a forma de organização"}
              {step === "level" && "Etapa 3: Selecione o nível/série/fase"}
            </Text>
          </View>

          {/* Education Selection */}
          {step === "education" && (
            <View className="gap-3">
              <EducationButton
                label="Educação Infantil"
                description="BI, BII, BIII, Infantil I-IV, Pré I-II"
                onPress={() => handleEducationSelect("infantil")}
                colors={colors}
              />
              <EducationButton
                label="Ensino Fundamental"
                description="Série ou Ano (1º ao 8º/9º)"
                onPress={() => handleEducationSelect("fundamental")}
                colors={colors}
              />
              <EducationButton
                label="EJA"
                description="Educação de Jovens e Adultos"
                onPress={() => handleEducationSelect("eja")}
                colors={colors}
              />
            </View>
          )}

          {/* Fundamental Organization Selection */}
          {step === "organization" && educationType === "fundamental" && (
            <View className="gap-3">
              <Text className="text-sm font-semibold text-foreground">
                Selecione a forma de organização:
              </Text>
              <EducationButton
                label="Série"
                description="1ª a 8ª série"
                onPress={() => handleFundamentalOrgSelect("serie")}
                colors={colors}
              />
              <EducationButton
                label="Ano"
                description="1º ao 9º ano"
                onPress={() => handleFundamentalOrgSelect("ano")}
                colors={colors}
              />
            </View>
          )}

          {/* EJA Level Selection */}
          {step === "organization" && educationType === "eja" && (
            <View className="gap-3">
              <Text className="text-sm font-semibold text-foreground">
                Selecione o nível:
              </Text>
              <EducationButton
                label="EJA I"
                description="Fase I a V"
                onPress={() => handleEJALevelSelect("eja1")}
                colors={colors}
              />
              <EducationButton
                label="EJA II"
                description="Fase I a IV"
                onPress={() => handleEJALevelSelect("eja2")}
                colors={colors}
              />
            </View>
          )}

          {/* Level Selection */}
          {step === "level" && (
            <View className="gap-3">
              <Text className="text-sm font-semibold text-foreground">
                {educationType === "infantil" && "Selecione o nível:"}
                {educationType === "fundamental" && fundamentalOrg === "serie" && "Selecione a série:"}
                {educationType === "fundamental" && fundamentalOrg === "ano" && "Selecione o ano:"}
                {educationType === "eja" && "Selecione a fase:"}
              </Text>
              {getLevelOptions().map((level, index) => (
                <LevelButton
                  key={index}
                  label={level.label}
                  years={level.years}
                  onPress={() => handleLevelSelect(level)}
                  colors={colors}
                />
              ))}
            </View>
          )}

          {/* Result */}
            {selectedLevel && (
            <View className="gap-4">
              <View
                className="p-6 rounded-2xl gap-4 border-2"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.primary,
                }}
              >
                <Text className="text-lg font-bold text-foreground">
                  {selectedLevel.label}
                </Text>

                <View className="gap-3 pt-2">
                  <ResultRow
                    label="Anos a somar:"
                    value={`${selectedLevel.years} anos`}
                    colors={colors}
                  />
                </View>
              </View>
            </View>
          )}

          {/* Navigation Buttons */}
          <View className="gap-2 pt-4">
            {step !== "education" && (
              <Pressable
                onPress={handleBack}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.7 : 1,
                    borderColor: colors.border,
                  },
                ]}
                className="px-6 py-3 rounded-lg items-center border"
              >
                <Text className="text-foreground font-semibold">← Voltar</Text>
              </Pressable>
            )}

            {selectedLevel && (
              <Pressable
                onPress={handleNewSearch}
                style={({ pressed }) => [
                  {
                    backgroundColor: colors.primary,
                    opacity: pressed ? 0.8 : 1,
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                  },
                ]}
                className="px-6 py-3 rounded-lg items-center"
              >
                <Text className="text-white font-semibold">Fazer nova consulta</Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

interface EducationButtonProps {
  label: string;
  description: string;
  onPress: () => void;
  colors: any;
}

function EducationButton({ label, description, onPress, colors }: EducationButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
      className="p-4 rounded-lg gap-1"
    >
      <Text className="text-base font-semibold text-foreground">{label}</Text>
      <Text className="text-xs text-muted">{description}</Text>
    </Pressable>
  );
}

interface LevelButtonProps {
  label: string;
  years: number;
  onPress: () => void;
  colors: any;
}

function LevelButton({ label, years, onPress, colors }: LevelButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: colors.surface,
          borderColor: colors.primary,
          borderWidth: 1,
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
      className="p-4 rounded-lg flex-row justify-between items-center"
    >
      <Text className="text-base font-semibold text-foreground">{label}</Text>
      <View
        className="px-3 py-1 rounded-full"
        style={{
          backgroundColor: colors.primary + "20",
        }}
      >
        <Text className="text-xs font-semibold text-primary">{years} anos</Text>
      </View>
    </Pressable>
  );
}

interface ResultRowProps {
  label: string;
  value: string;
  colors: any;
  highlight?: boolean;
}

function ResultRow({ label, value, colors, highlight }: ResultRowProps) {
  return (
    <View className="flex-row justify-between items-center py-2 border-b" style={{ borderBottomColor: colors.border }}>
      <Text className={`text-sm ${highlight ? "font-bold" : ""} text-foreground`}>
        {label}
      </Text>
      <Text
        className={`text-sm font-semibold ${highlight ? "text-primary" : "text-foreground"}`}
      >
        {value}
      </Text>
    </View>
  );
}
