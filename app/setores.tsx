import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useMemo, useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { normalizeSearchText } from "@/lib/search-utils";
import setores from "@/setores.json";

type Setor = {
  codigo: string;
  descricao: string;
};

export default function SetoresScreen() {
  const colors = useColors();
  const { quickQuery: quickQueryParam } = useLocalSearchParams<{ quickQuery?: string }>();
  const initialQuickQuery = typeof quickQueryParam === "string" ? quickQueryParam : "";
  const [query, setQuery] = useState(initialQuickQuery);

  const results = useMemo(() => {
    const term = normalizeSearchText(query.trim());
    if (!term) return setores as Setor[];

    return (setores as Setor[]).filter((item) =>
      normalizeSearchText(`${item.codigo} ${item.descricao}`).includes(term),
    );
  }, [query]);

  const clearSearch = () => setQuery("");

  return (
    <ScreenContainer className="bg-background">
      <FlatList
        data={results}
        keyExtractor={(item) => item.codigo}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        ListHeaderComponent={
          <View className="gap-4 mb-5">
            <Link href="/" asChild>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Voltar ao menu inicial"
                style={({ pressed }) => ({ opacity: pressed ? 0.55 : 1 })}
              >
                <Text className="text-base font-semibold text-primary">⌂  Menu inicial</Text>
              </Pressable>
            </Link>
            <View>
              <View className="flex-1">
                <Text className="text-3xl font-bold text-foreground">Busca de Setores</Text>
                <Text className="text-sm text-muted">{(setores as Setor[]).length} setores cadastrados</Text>
              </View>
            </View>

            <Link href="/temporalidade" asChild>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Ir para Busca de Temporalidade"
                style={({ pressed }) => ({
                  backgroundColor: colors.primary + "10",
                  borderColor: colors.primary + "55",
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  opacity: pressed ? 0.8 : 1,
                })}
              >
                <Text className="text-center text-base font-semibold text-primary">📄 Busca de Temporalidade</Text>
              </Pressable>
            </Link>

            <View
              className="flex-row items-center gap-2 px-4 py-3 rounded-lg border bg-surface"
              style={{ borderColor: colors.border }}
            >
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Digite o código ou nome do setor"
                placeholderTextColor={colors.muted}
                className="flex-1 text-base"
                style={{ color: colors.foreground }}
                autoCapitalize="none"
                returnKeyType="search"
              />
              {!!query && (
                <Pressable
                  onPress={clearSearch}
                  accessibilityRole="button"
                  accessibilityLabel="Limpar busca"
                  style={({ pressed }) => ({
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                    paddingHorizontal: 8,
                    paddingVertical: 6,
                    borderRadius: 8,
                    backgroundColor: colors.primary + "15",
                    opacity: pressed ? 0.6 : 1,
                  })}
                >
                  <MaterialIcons name="clear" size={16} color={colors.primary} />
                  <Text className="text-xs font-semibold text-primary">Limpar</Text>
                </Pressable>
              )}
            </View>

            <Text className="text-xs font-semibold text-muted uppercase">
              {query.trim() ? `${results.length} resultado(s)` : "Todos os setores"}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View className="items-center gap-3 py-12">
            <Text className="text-5xl">⌕</Text>
            <Text className="text-lg font-semibold text-foreground">Nenhum setor encontrado</Text>
            <Text className="text-sm text-muted text-center">Tente outro código ou termo de busca.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            className="p-4 rounded-xl border mb-3"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          >
            <Text
              className="text-xl font-bold text-primary"
              accessibilityLabel={`Número do setor ${item.codigo}`}
            >
              {item.codigo}
            </Text>
            <Text className="text-base font-semibold text-foreground mt-2 leading-relaxed">{item.descricao}</Text>
          </View>
        )}
      />
    </ScreenContainer>
  );
}
