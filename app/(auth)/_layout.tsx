import { AntDesign } from "@expo/vector-icons";
import { Redirect, Tabs, router } from "expo-router";
import { View, StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useGetAuthToken } from "@/api/queries/auth";
import { useGetCount } from "@/api/queries/images";
import ContentWrapper from "@/components/content_wrapper";
import { tokens } from "@/config/tamagui/tokens";
import { ImageProvider } from "@/context/image";
import usePathname from "@/hooks/usePathname";

const Layout = () => {
  const token = useGetAuthToken();
  const count = useGetCount();
  const { slug } = usePathname();

  const activeTabs = [
    { name: "index", label: "Sort", icon: "swap" },
    { name: "dashboard", label: "Dashboard", icon: "home" },
    { name: "albums", label: "Image Sets", icon: "picture" },
  ] as const;

  return !token ? (
    <Redirect href="/login" />
  ) : (
    <ImageProvider>
      <View style={styles.flex}>
        <GestureHandlerRootView style={styles.flex}>
          <ContentWrapper>
            <Tabs
              screenOptions={{
                tabBarLabelPosition: "below-icon",
                tabBarActiveBackgroundColor: tokens.color.grey1,
                tabBarInactiveBackgroundColor: tokens.color.grey4,
                headerShown: false,
                tabBarBadgeStyle: {
                  display: "flex",
                  fontSize: 10,
                  alignItems: "center",
                  justifyContent: "center",
                },
              }}
            >
              {activeTabs.map(({ name, icon, label }) => (
                <Tabs.Screen
                  key={name}
                  name={name}
                  listeners={{
                    tabPress: () => {
                      // override issue clicking album tab when in album/[albumId]
                      // wouldn't navigate anywhere
                      if (name === "albums" && slug) router.push(`/${name}`);
                    },
                  }}
                  options={{
                    tabBarBadge:
                      name === "albums" && count.data?.albumsToDelete
                        ? count.data?.albumsToDelete.count
                        : null,
                    tabBarIcon: ({ focused }) => (
                      <AntDesign
                        name={icon}
                        size={20}
                        color={
                          focused ? tokens.color.blue3 : tokens.color.grey1
                        }
                      />
                    ),
                    tabBarLabel: ({ focused }) => (
                      <Text
                        style={[
                          styles.tab_label,
                          {
                            color: focused
                              ? tokens.color.blue3
                              : tokens.color.grey1,
                          },
                        ]}
                      >
                        {label}
                      </Text>
                    ),
                  }}
                />
              ))}
            </Tabs>
          </ContentWrapper>
        </GestureHandlerRootView>
      </View>
    </ImageProvider>
  );
};

export default Layout;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  tab_label: {
    fontSize: 12,
  },
});
