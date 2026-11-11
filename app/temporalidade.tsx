import { ScrollView, Text, View, TextInput, Pressable, FlatList, ActivityIndicator, Switch } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useSearchHistory } from "@/hooks/use-search-history";
import { cn } from "@/lib/utils";
import { formatDocumentCode } from "@/lib/search-utils";
import data from "@/data.json";

interface Document {
  COD: string;
  SERIE: string;
  TIPO: string;
  TEMP: string;
  OBS: string;
}

type SearchMode = "code" | "keyword";
type ColumnFilter = {
  SERIE: boolean;
  TIPO: boolean;
  TEMP: boolean;
  OBS: boolean;
};

const isSpecialNote = (temp: string): boolean => {
  const tempStr = String(temp).toUpperCase();
  return (
    tempStr.includes("PERMANENTE") ||
    tempStr.includes("USE:") ||
    tempStr.includes("UTILIZAR") ||
    tempStr.includes("APROVACAO") ||
    tempStr.includes("TCE")
  );
};

const isEmpty = (value: string): boolean => {
  return value === "" || value === "NaN" || value === "nan";
};

export default function HomeScreen() {
  const colors = useColors();
  const { quickQuery: quickQueryParam } = useLocalSearchParams<{ quickQuery?: string }>();
  const initialQuickQuery = typeof quickQueryParam === "string" ? quickQueryParam : "";
  const initialSearchMode: SearchMode = initialQuickQuery && /^[\d.\-/]+$/.test(initialQuickQuery) ? "code" : "keyword";
  const { history, isLoading: historyLoading, addToHistory, clearHistory, removeFromHistory } = useSearchHistory();
  const [searchMode, setSearchMode] = useState<SearchMode>(initialQuickQuery ? initialSearchMode : "code");
  const [searchQuery, setSearchQuery] = useState(
    initialQuickQuery ? (initialSearchMode === "code" ? formatDocumentCode(initialQuickQuery) : initialQuickQuery) : "",
  );
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFilter>({
    SERIE: true,
    TIPO: true,
    TEMP: false,
    OBS: false,
  });

  // Debounce search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSelectedCode(null);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(true);
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

    if (searchMode === "code") {
      // Search by code (prefix match)
      const filtered = data.filter((doc: Document) =>
        doc.COD.toLowerCase().startsWith(query)
      );

      if (filtered.length > 0) {
        const firstCode = filtered[0].COD;
        setSelectedCode(firstCode);
        return filtered.filter((doc: Document) => doc.COD === firstCode);
      }

      setSelectedCode(null);
      return [];
    } else {
      // Search by keyword (substring match in selected columns)
      const activeColumns = Object.entries(columnFilters)
        .filter(([_, isActive]) => isActive)
        .map(([col]) => col);

      if (activeColumns.length === 0) {
        return [];
      }

      return data.filter((doc: Document) => {
        return activeColumns.some((col) => {
          const value = doc[col as keyof Document];
          return value.toLowerCase().includes(query);
        });
      });
    }
  }, [searchQuery, searchMode, columnFilters]);

  const handleClear = () => {
    setSearchQuery("");
    setSelectedCode(null);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(searchMode === "code" ? formatDocumentCode(text) : text);
  };

  const handleSelectFromHistory = (code: string) => {
    setSearchMode("code");
    setSearchQuery(code);
  };

  const handleDeleteHistoryItem = (code: string) => {
    removeFromHistory(code);
  };

  const toggleColumnFilter = (column: keyof ColumnFilter) => {
    setColumnFilters((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const handleSaveToHistory = () => {
    if (selectedCode) {
      addToHistory(selectedCode);
    }
  };

  return (
    <ScreenContainer className="p-4 bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="gap-6">
          {/* Header */}
          <View className="items-center gap-2 mt-4">
            <Text className="text-3xl font-bold text-foreground">Temporalidade</Text>
            <Text className="text-sm text-muted text-center">
              Consulte a temporalidade de documentos
            </Text>
          </View>

          {/* Search Mode Toggle */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Tipo de Busca</Text>
            <View className="flex-row gap-3">
              <Pressable
                onPress={() => setSearchMode("code")}
                style={({ pressed }) => [
                  {
                    backgroundColor: searchMode === "code" ? colors.primary : colors.surface,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
                className="flex-1 py-3 px-4 rounded-lg border"
              >
                <Text
                  className="text-center font-semibold"
                  style={{
                    color: searchMode === "code" ? "white" : colors.foreground,
                  }}
                >
                  Por Código
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setSearchMode("keyword")}
                style={({ pressed }) => [
                  {
                    backgroundColor: searchMode === "keyword" ? colors.primary : colors.surface,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
                className="flex-1 py-3 px-4 rounded-lg border"
              >
                <Text
                  className="text-center font-semibold"
                  style={{
                    color: searchMode === "keyword" ? "white" : colors.foreground,
                  }}
                >
                  Por Palavra-chave
                </Text>
              </Pressable>
            </View>

            {/* Special Document Link */}
            <Link href="/diarios-de-classe" asChild>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: colors.primary + "20",
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
                className="py-3 px-4 rounded-lg border"
              >
                <Text className="text-center font-semibold text-primary">📚 Diários de Classe</Text>
              </Pressable>
            </Link>
          </View>

          {/* Search Bar */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">
              {searchMode === "code" ? "Código do Documento" : "Palavra-chave"}
            </Text>
            <View
              className="flex-row items-center gap-2 px-4 py-3 rounded-lg border bg-surface"
              style={{
                borderColor: colors.border,
              }}
            >
              <TextInput
                placeholder={searchMode === "code" ? "Digite apenas números: 10010013" : "Digite uma palavra..."}
                placeholderTextColor={colors.muted}
                value={searchQuery}
                onChangeText={handleSearch}
                keyboardType={searchMode === "code" ? "number-pad" : "default"}
                maxLength={searchMode === "code" ? 11 : undefined}
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

          {/* Column Filters for Keyword Search */}
          {searchMode === "keyword" && (
            <View className="gap-3">
              <Text className="text-sm font-semibold text-foreground">Colunas para Busca</Text>
              <View className="gap-2">
                {Object.entries(columnFilters).map(([column, isActive]) => (
                  <View
                    key={column}
                    className="flex-row items-center justify-between p-3 rounded-lg border"
                    style={{
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                    }}
                  >
                    <Text className="font-medium text-foreground">{column}</Text>
                    <Switch
                      value={isActive}
                      onValueChange={() => toggleColumnFilter(column as keyof ColumnFilter)}
                      trackColor={{ false: colors.border, true: colors.primary + "50" }}
                      thumbColor={isActive ? colors.primary : colors.muted}
                    />
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Loading State */}
          {isLoading && (
            <View className="items-center py-8">
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          )}

          {/* Results */}
          {!isLoading && searchQuery.trim() !== "" && results.length > 0 && (
            <View className="gap-4">
              {searchMode === "code" && (
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
              )}

              <View className="gap-2">
                <Text className="text-xs font-semibold text-muted uppercase">
                  {searchMode === "code" ? "Informações" : `Resultados (${results.length})`}
                </Text>
                <FlatList
                  data={results}
                  keyExtractor={(item, index) => `${item.COD}-${index}`}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <View
                      className="p-4 rounded-lg border mb-3"
                      style={{
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                      }}
                    >
                      {/* COD */}
                      {searchMode === "keyword" && (
                        <View className="gap-2 mb-3">
                          <Text className="text-xs font-semibold text-muted uppercase">Código</Text>
                          <Text className="text-base font-medium text-foreground">{item.COD}</Text>
                        </View>
                      )}

                      {/* SERIE */}
                      <View className="gap-2 mb-3">
                        <Text className="text-xs font-semibold text-muted uppercase">Série</Text>
                        {isEmpty(item.SERIE) ? (
                          <Text className="text-base text-muted italic">[Campo vazio]</Text>
                        ) : (
                          <Text className="text-base font-medium text-foreground">{item.SERIE}</Text>
                        )}
                      </View>

                      {/* TIPO */}
                      <View className="gap-2 mb-3">
                        <Text className="text-xs font-semibold text-muted uppercase">Tipo</Text>
                        {isEmpty(item.TIPO) ? (
                          <Text className="text-base text-muted italic">[Campo vazio]</Text>
                        ) : (
                          <Text className="text-base font-medium text-foreground">{item.TIPO}</Text>
                        )}
                      </View>

                      {/* TEMP */}
                      <View className="gap-2 mb-3">
                        <Text className="text-xs font-semibold text-muted uppercase">Temporalidade</Text>
                        {isEmpty(item.TEMP) ? (
                          <Text className="text-base text-muted italic">[Campo vazio]</Text>
                        ) : (
                          <View
                            className="px-3 py-2 rounded-md"
                            style={{
                              backgroundColor: isSpecialNote(item.TEMP) ? colors.warning + "20" : colors.primary + "20",
                            }}
                          >
                            <Text
                              className="text-base font-bold"
                              style={{
                                color: isSpecialNote(item.TEMP) ? colors.warning : colors.primary,
                              }}
                            >
                              {item.TEMP}
                            </Text>
                          </View>
                        )}
                      </View>

                      {/* OBS */}
                      <View className="gap-2">
                        <Text className="text-xs font-semibold text-muted uppercase">Observações</Text>
                        {isEmpty(item.OBS) ? (
                          <Text className="text-base text-muted italic">[Campo vazio]</Text>
                        ) : (
                          <View
                            className="p-3 rounded-md"
                            style={{
                              backgroundColor: colors.primary + "10",
                            }}
                          >
                            <Text className="text-base text-foreground">{item.OBS}</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  )}
                />
              </View>

              {searchMode === "code" && (
                <Pressable
                  onPress={handleSaveToHistory}
                  style={({ pressed }) => [
                    {
                      backgroundColor: colors.primary,
                      opacity: pressed ? 0.8 : 1,
                      transform: [{ scale: pressed ? 0.97 : 1 }],
                    },
                  ]}
                  className="px-6 py-3 rounded-lg"
                >
                  <Text className="text-white font-semibold text-center">Salvar no Histórico</Text>
                </Pressable>
              )}
            </View>
          )}

          {/* Empty State - No Results */}
          {!isLoading && searchQuery.trim() !== "" && results.length === 0 && (
            <View className="items-center gap-4 py-12">
              <Text className="text-5xl">📄</Text>
              <Text className="text-lg font-semibold text-foreground text-center">
                {searchMode === "code" ? "Código não encontrado" : "Nenhum resultado encontrado"}
              </Text>
              <Text className="text-sm text-muted text-center">
                {searchMode === "code"
                  ? `Nenhum documento encontrado para "${searchQuery}"`
                  : `Nenhum documento contém "${searchQuery}" nas colunas selecionadas`}
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

          {/* History Section */}
          {!historyLoading && searchMode === "code" && searchQuery.trim() === "" && history.length > 0 && (
            <View className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-foreground">Buscas Recentes</Text>
                <Pressable
                  onPress={clearHistory}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.6 : 1,
                    },
                  ]}
                >
                  <Text className="text-xs text-muted font-medium">Limpar</Text>
                </Pressable>
              </View>
              <FlatList
                data={history}
                keyExtractor={(item) => item.code}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => handleSelectFromHistory(item.code)}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed ? colors.border : colors.surface,
                        opacity: pressed ? 0.7 : 1,
                      },
                    ]}
                    className="flex-row items-center justify-between p-3 rounded-lg border mb-2"
                    accessibilityRole="button"
                  >
                    <View className="flex-row items-center gap-3 flex-1">
                      <Text className="text-lg">🕐</Text>
                      <Text className="text-base font-medium text-foreground">{item.code}</Text>
                    </View>
                    <Pressable
                      onPress={() => handleDeleteHistoryItem(item.code)}
                      style={({ pressed }) => [
                        {
                          opacity: pressed ? 0.6 : 1,
                        },
                      ]}
                      accessibilityRole="button"
                      accessibilityLabel={`Remover ${item.code} do histórico`}
                    >
                      <Text className="text-lg text-muted">✕</Text>
                    </Pressable>
                  </Pressable>
                )}
              />
            </View>
          )}

          {/* Empty State - Initial */}
          {searchQuery.trim() === "" && (searchMode === "keyword" || history.length === 0) && !historyLoading && (
            <View className="items-center gap-4 py-12">
              <Text className="text-6xl">🔍</Text>
              <Text className="text-base text-muted text-center">
                {searchMode === "code"
                  ? "Digite um código de documento para consultar sua temporalidade"
                  : "Digite uma palavra-chave e selecione as colunas para buscar"}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
