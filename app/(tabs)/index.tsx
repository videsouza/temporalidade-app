import { Pressable, ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

export default function HomeScreen() {
  const colors = useColors();

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

          <View className="gap-4">
            <Link href="/temporalidade" asChild>
              <Pressable
                accessibilityRole="button"
                style={({ pressed }) => ({
                  backgroundColor: colors.primary,
                  borderRadius: 16,
                  padding: 20,
                  opacity: pressed ? 0.82 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
              >
                <Text className="text-2xl font-bold text-white">Busca de Temporalidade</Text>
                <Text className="text-sm text-white mt-2">
                  Consulte por código ou palavra-chave e veja série, tipo, temporalidade e observações.
                </Text>
              </Pressable>
            </Link>

            <Link href="/setores" asChild>
              <Pressable
                accessibilityRole="button"
                style={({ pressed }) => ({
                  backgroundColor: colors.surface,
                  borderColor: colors.primary,
                  borderWidth: 1,
                  borderRadius: 16,
                  padding: 20,
                  opacity: pressed ? 0.82 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
              >
                <Text className="text-2xl font-bold text-primary">Busca de Setores</Text>
                <Text className="text-sm text-muted mt-2">
                  Localize setores por código ou por qualquer palavra do nome/descrição.
                </Text>
              </Pressable>
            </Link>
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
