import { Link, usePathname } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { useColors } from "@/hooks/use-colors";

const MENU_ITEMS = [
  { label: "Início", href: "/" as const, icon: "⌂" },
  { label: "Temporalidade", href: "/temporalidade" as const, icon: "📄" },
  { label: "Setores", href: "/setores" as const, icon: "🏢" },
  { label: "Diários", href: "/diarios-de-classe" as const, icon: "📚" },
  { label: "Sobre", href: "/about" as const, icon: "ⓘ" },
];

export function TopMenu() {
  const colors = useColors();
  const pathname = usePathname();
  const isHomePath = pathname === "/" || pathname === "/(tabs)" || pathname === "/(tabs)/index";

  return (
    <View className="mb-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingHorizontal: 1, paddingVertical: 2 }}
      >
        {MENU_ITEMS.map((item) => {
          const isActive = item.href === "/"
            ? isHomePath
            : pathname === item.href || pathname.startsWith(item.href);

          return (
            <Link key={item.href} href={item.href} asChild>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Abrir ${item.label}`}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  paddingHorizontal: 11,
                  paddingVertical: 8,
                  borderRadius: 9,
                  borderWidth: 1,
                  borderColor: isActive ? colors.primary : colors.border,
                  backgroundColor: isActive ? colors.primary + "12" : colors.surface,
                  opacity: pressed ? 0.72 : 1,
                })}
              >
                <Text style={{ fontSize: 14 }}>{item.icon}</Text>
                <Text
                  style={{
                    color: isActive ? colors.primary : colors.foreground,
                    fontSize: 13,
                    fontWeight: "600",
                  }}
                >
                  {item.label}
                </Text>
              </Pressable>
            </Link>
          );
        })}
      </ScrollView>
    </View>
  );
}
