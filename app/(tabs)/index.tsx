import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useMemo, useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { HOME_CATEGORIES } from "@/lib/home-categories";
import { getQuickSearchCounts } from "@/lib/quick-search";
import data from "@/data.json";
import setores from "@/setores.json";

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const [temporalidadeCategory, setoresCategory] = HOME_CATEGORIES;
  const [quickQuery, setQuickQuery] = useState("");
  const quickCounts = useMemo(
    () => getQuickSearchCounts(quickQuery, data, setores),
    [quickQuery],
  );

  return (
    <ScreenContainer className="p-4 bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6 mt-4">
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-foreground">Consulta de Documentos</Text>
            <Text className="text-sm text-muted text-center">
              Escolha uma categoria para iniciar sua busca
            </Text>
          </View>

          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Pesquisa rápida</Text>
            <View
              className="flex-row items-center gap-2 px-4 py-3 rounded-lg border bg-surface"
              style={{ borderColor: colors.border }}
            >
              <MaterialIcons name="search" size={24} color={colors.muted} />
              <TextInput
                value={quickQuery}
                onChangeText={setQuickQuery}
                placeholder="Digite um termo para pesquisar"
                placeholderTextColor={colors.muted}
                className="flex-1 text-base"
                style={{ color: colors.foreground }}
                autoCapitalize="none"
                returnKeyType="search"
              />
              {!!quickQuery && (
                <Pressable onPress={() => setQuickQuery("")} style={({ pressed }) => ({ opacity: pressed ? 0.55 : 1 })}>
                  <Text className="text-lg text-muted">✕</Text>
                </Pressable>
              )}
            </View>

            {!!quickQuery.trim() && (
              <View
                className="p-4 rounded-xl border gap-3"
                style={{ backgroundColor: colors.primary + "10", borderColor: colors.border }}
              >
                <Text className="text-sm text-foreground">
                  Resultados para <Text className="font-bold">“{quickQuery.trim()}”</Text>
                </Text>
                <View className="flex-row gap-3">
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => router.push({ pathname: "/temporalidade", params: { quickQuery: quickQuery.trim() } })}
                    style={({ pressed }) => ({
                      flex: 1,
                      backgroundColor: colors.primary,
                      borderRadius: 10,
                      padding: 12,
                      opacity: pressed ? 0.8 : 1,
                    })}
                  >
                    <Text className="text-white text-xs font-semibold text-center">Temporalidade</Text>
                    <Text className="text-white text-lg font-bold text-center mt-1">{quickCounts.documents}</Text>
                  </Pressable>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => router.push({ pathname: "/setores", params: { quickQuery: quickQuery.trim() } })}
                    style={({ pressed }) => ({
                      flex: 1,
                      backgroundColor: colors.surface,
                      borderColor: colors.primary,
                      borderWidth: 1,
                      borderRadius: 10,
                      padding: 12,
                      opacity: pressed ? 0.8 : 1,
                    })}
                  >
                    <Text className="text-primary text-xs font-semibold text-center">Setores</Text>
                    <Text className="text-primary text-lg font-bold text-center mt-1">{quickCounts.sectors}</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>

          <View style={{ gap: 16 }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Abrir busca de temporalidade"
              onPress={() => router.push(temporalidadeCategory.route)}
              style={({ pressed }) => ({
                backgroundColor: colors.primary,
                borderColor: colors.primary,
                borderWidth: 1,
                borderRadius: 16,
                padding: 20,
                minHeight: 126,
                justifyContent: "center",
                opacity: pressed ? 0.82 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <MaterialIcons name="description" size={42} color="#ffffff" />
                <Text style={{ color: "#ffffff", fontSize: 22, lineHeight: 28, fontWeight: "700", flex: 1 }}>
                  {temporalidadeCategory.title}
                </Text>
              </View>
              <Text style={{ color: "#ffffff", fontSize: 14, lineHeight: 21, marginTop: 8 }}>
                {temporalidadeCategory.description}
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Abrir busca de setores"
              onPress={() => router.push(setoresCategory.route)}
              style={({ pressed }) => ({
                backgroundColor: colors.surface,
                borderColor: colors.primary,
                borderWidth: 1,
                borderRadius: 16,
                padding: 20,
                minHeight: 126,
                justifyContent: "center",
                opacity: pressed ? 0.82 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <MaterialIcons name="business" size={42} color={colors.primary} />
                <Text style={{ color: colors.primary, fontSize: 22, lineHeight: 28, fontWeight: "700", flex: 1 }}>
                  {setoresCategory.title}
                </Text>
              </View>
              <Text style={{ color: colors.muted, fontSize: 14, lineHeight: 21, marginTop: 8 }}>
                {setoresCategory.description}
              </Text>
            </Pressable>
          </View>

          <View
            className="p-4 rounded-xl border gap-2"
            style={{ backgroundColor: colors.primary + "10", borderColor: colors.border }}
          >
            <Text className="text-base font-semibold text-foreground">Como usar</Text>
            <Text className="text-sm text-muted leading-relaxed">
              A busca de temporalidade aceita somente números no campo de código e monta automaticamente o formato x.x.xx.xx.xx.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
