import { ScrollView, Text, View, TextInput, Pressable, FlatList, ActivityIndicator } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";
import data from "@/data.json";

interface Document {
  COD: string;
  TIPO: string;
  TEMP: string | number;
}

interface SearchResult {
  TIPO: string;
  TEMP: string | number;
}

export default function HomeScreen() {
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSelectedCode(null);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(true);
      // Simulate a small delay for better UX
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter results based on search query
  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    const filtered = data.filter((doc: Document) =>
      doc.COD.toLowerCase().startsWith(query)
    );

    // Group by COD and get the first match
    if (filtered.length > 0) {
      const firstCode = filtered[0].COD;
      setSelectedCode(firstCode);
      return filtered.filter((doc: Document) => doc.COD === firstCode);
    }

    setSelectedCode(null);
    return [];
  }, [searchQuery]);

  const handleClear = () => {
    setSearchQuery("");
    setSelectedCode(null);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <ScreenContainer className="p-4 bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="gap-6">
          {/* Header */}
          <View className="items-center gap-2 mt-4">
            <Text className="text-3xl font-bold text-foreground">Temporalidade</Text>
            <Text className="text-sm text-muted text-center">
              Consulte a temporalidade de documentos por código
            </Text>
          </View>

          {/* Search Bar */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Código do Documento</Text>
            <View
              className="flex-row items-center gap-2 px-4 py-3 rounded-lg border bg-surface"
              style={{
                borderColor: colors.border,
              }}
            >
              <TextInput
                placeholder="Ex: 1.0.01.00.13"
                placeholderTextColor={colors.muted}
                value={searchQuery}
                onChangeText={handleSearch}
                className="flex-1 text-foreground text-base"
                style={{
                  color: colors.foreground,
                }}
              />
              {searchQuery.length > 0 && (
                <Pressable
                  onPress={handleClear}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.6 : 1,
                    },
                  ]}
                >
                  <Text className="text-lg text-muted">✕</Text>
                </Pressable>
              )}
            </View>
          </View>

          {/* Loading State */}
          {isLoading && (
            <View className="items-center py-8">
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          )}

          {/* Results */}
          {!isLoading && searchQuery.trim() !== "" && results.length > 0 && (
            <View className="gap-4">
              <View className="gap-2">
                <Text className="text-xs font-semibold text-muted uppercase">Código</Text>
                <View
                  className="p-3 rounded-lg border"
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  }}
                >
                  <Text className="text-lg font-semibold text-foreground">{selectedCode}</Text>
                </View>
              </View>

              <View className="gap-2">
                <Text className="text-xs font-semibold text-muted uppercase">
                  Tipos Documentais ({results.length})
                </Text>
                <FlatList
                  data={results}
                  keyExtractor={(item, index) => `${item.TIPO}-${index}`}
                  scrollEnabled={false}
                  renderItem={({ item, index }) => (
                    <View
                      className="p-4 rounded-lg border mb-3"
                      style={{
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                      }}
                    >
                      <View className="gap-2">
                        <Text className="text-xs font-semibold text-muted uppercase">Tipo</Text>
                        <Text className="text-base font-medium text-foreground">{item.TIPO}</Text>
                      </View>
                      <View className="gap-2 mt-3">
                        <Text className="text-xs font-semibold text-muted uppercase">Temporalidade</Text>
                        <View
                          className="px-3 py-2 rounded-md"
                          style={{
                            backgroundColor: colors.primary + "20",
                          }}
                        >
                          <Text
                            className="text-base font-bold"
                            style={{
                              color: colors.primary,
                            }}
                          >
                            {item.TEMP}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                />
              </View>
            </View>
          )}

          {/* Empty State - No Results */}
          {!isLoading && searchQuery.trim() !== "" && results.length === 0 && (
            <View className="items-center gap-4 py-12">
              <Text className="text-5xl">📄</Text>
              <Text className="text-lg font-semibold text-foreground text-center">
                Código não encontrado
              </Text>
              <Text className="text-sm text-muted text-center">
                Nenhum documento encontrado para "{searchQuery}"
              </Text>
              <Pressable
                onPress={handleClear}
                style={({ pressed }) => [
                  {
                    backgroundColor: colors.primary,
                    opacity: pressed ? 0.8 : 1,
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                  },
                ]}
                className="px-6 py-3 rounded-lg mt-4"
              >
                <Text className="text-white font-semibold">Tentar Novamente</Text>
              </Pressable>
            </View>
          )}

          {/* Empty State - Initial */}
          {searchQuery.trim() === "" && (
            <View className="items-center gap-4 py-12">
              <Text className="text-6xl">🔍</Text>
              <Text className="text-base text-muted text-center">
                Digite um código de documento para consultar sua temporalidade
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
