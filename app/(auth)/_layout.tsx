import { AntDesign } from "@expo/vector-icons";
import { Redirect, Tabs, router } from "expo-router";
import { View, StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useGetAlbums } from "@/api/queries/albums";
import { useGetAuthToken } from "@/api/queries/auth";
import ContentWrapper from "@/components/content_wrapper";
import Header from "@/components/header";
import { tokens } from "@/config/tamagui/tokens";
import { HeadingProvider } from "@/context/header";
import { ImageProvider } from "@/context/image";
import usePathname from "@/hooks/usePathname";

const Layout = () => {
  const token = useGetAuthToken();
  const albums = useGetAlbums();
  const { slug } = usePathname();

  const activeTabs = [
    { name: "index", label: "Sort", icon: "swap" },
    { name: "dashboard", label: "Dashboard", icon: "home" },
    { name: "albums", label: "Albums", icon: "picture" },
  ] as const;

  return !token ? (
    <Redirect href="/login" />
  ) : (
    <HeadingProvider>
      <ImageProvider>
        <Header />
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
                        name === "albums" &&
                        albums.data?.withDeletedCount.length
                          ? albums.data?.withDeletedCount.length
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
    </HeadingProvider>
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
