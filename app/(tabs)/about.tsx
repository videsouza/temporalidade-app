import { ScrollView, Text, View, Pressable, Linking } from "react-native";
import { Link } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { TopMenu } from "@/components/top-menu";
import { useColors } from "@/hooks/use-colors";
import { APP_DEVELOPER } from "@/lib/app-info";

export default function AboutScreen() {
  const colors = useColors();

  const handleEmailPress = () => {
    Linking.openURL("mailto:vinicius.souza@sjc.sp.gov.br");
  };

  return (
    <ScreenContainer className="p-4 bg-background">
      <TopMenu />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="gap-8 py-8">
          <Link href="/" asChild>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Voltar ao menu inicial"
              style={({ pressed }) => ({ opacity: pressed ? 0.55 : 1 })}
            >
              <Text className="text-base font-semibold text-primary">⌂  Menu inicial</Text>
            </Pressable>
          </Link>

          {/* Logo/Icon */}
          <View className="items-center gap-4">
            <Text className="text-6xl">📋</Text>
            <Text className="text-3xl font-bold text-foreground">Temporalidade</Text>
            <Text className="text-sm text-muted">Versão 1.0.7</Text>
          </View>

          {/* Main Info Card */}
          <View
            className="p-6 rounded-2xl gap-4"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
            }}
          >
            <Text className="text-base leading-relaxed text-foreground">
              App Temporalidade - Desenvolvido pelo Setor de Arquivo da Secretaria de Educação da Prefeitura Municipal de São José dos Campos.
            </Text>
            <Text className="text-sm font-semibold text-primary">
              Desenvolvido por {APP_DEVELOPER}
            </Text>
          </View>

          {/* Features */}
          <View className="gap-4">
            <Text className="text-lg font-semibold text-foreground">Funcionalidades</Text>

            <View
              className="p-4 rounded-lg gap-2"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
              }}
            >
              <Text className="text-sm font-semibold text-foreground">🔍 Busca por Código</Text>
              <Text className="text-xs text-muted">
                Consulte a temporalidade digitando o código do documento
              </Text>
            </View>

            <View
              className="p-4 rounded-lg gap-2"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
              }}
            >
              <Text className="text-sm font-semibold text-foreground">🔎 Busca por Palavra-chave</Text>
              <Text className="text-xs text-muted">
                Busque em séries, tipos, temporalidades e observações
              </Text>
            </View>

            <View
              className="p-4 rounded-lg gap-2"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
              }}
            >
              <Text className="text-sm font-semibold text-foreground">🕐 Histórico de Buscas</Text>
              <Text className="text-xs text-muted">
                Acesso rápido às últimas 10 buscas realizadas
              </Text>
            </View>
          </View>

          {/* Database Info */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Base de Dados</Text>
            <View className="flex-row gap-3">
              <View
                className="flex-1 p-4 rounded-lg items-center gap-2"
                style={{
                  backgroundColor: colors.primary + "15",
                }}
              >
                <Text className="text-2xl font-bold text-primary">246</Text>
                <Text className="text-xs text-muted text-center">Documentos</Text>
              </View>
              <View
                className="flex-1 p-4 rounded-lg items-center gap-2"
                style={{
                  backgroundColor: colors.primary + "15",
                }}
              >
                <Text className="text-2xl font-bold text-primary">228</Text>
                <Text className="text-xs text-muted text-center">Códigos</Text>
              </View>
              <View
                className="flex-1 p-4 rounded-lg items-center gap-2"
                style={{
                  backgroundColor: colors.primary + "15",
                }}
              >
                <Text className="text-2xl font-bold text-primary">75</Text>
                <Text className="text-xs text-muted text-center">Tipos</Text>
              </View>
            </View>
          </View>

          {/* Contact */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Suporte</Text>
            <Text className="text-sm text-muted mb-3">
              Em caso de dúvidas, entre em contato conosco:
            </Text>
            <Pressable
              onPress={handleEmailPress}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.primary,
                  opacity: pressed ? 0.8 : 1,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
              className="px-6 py-4 rounded-lg items-center gap-2"
            >
              <Text className="text-white font-semibold">📧 Enviar E-mail</Text>
              <Text className="text-white text-xs">vinicius.souza@sjc.sp.gov.br</Text>
            </Pressable>
          </View>

          {/* Footer */}
          <View className="items-center gap-2 pt-4 border-t" style={{ borderTopColor: colors.border }}>
            <Text className="text-xs text-muted">
              Setor de Arquivo - Secretaria de Educação
            </Text>
            <Text className="text-xs text-muted">
              Prefeitura Municipal de São José dos Campos
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
