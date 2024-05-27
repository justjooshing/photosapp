import { AntDesign } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text } from "tamagui";

import { useGetAlbums } from "@/api/queries/albums";
import { useGetAuthToken } from "@/api/queries/auth";
import ContentWrapper from "@/components/content_wrapper";
import Header from "@/components/header";
import { HeadingProvider } from "@/context/header";
import { ImageProvider } from "@/context/image";
import { color } from "@/tamagui/tokens";

const Layout = () => {
  const token = useGetAuthToken();
  const albums = useGetAlbums();

  const activeTabs = [
    { name: "index", label: "Sort", icon: "swap" },
    { name: "dashboard", label: "Dashboard", icon: "home" },
    { name: "albums", label: "Albums", icon: "picture" },
  ] as const;

  const hiddenTabs = ["goodbye/index"];

  return !token ? (
    <Redirect href="/login" />
  ) : (
    <HeadingProvider>
      <ImageProvider>
        <Header />
        <ScrollView contentContainerStyle={styles.flex}>
          <GestureHandlerRootView style={styles.flex}>
            <ContentWrapper>
              <Tabs>
                {activeTabs.map(({ name, icon, label }) => (
                  <Tabs.Screen
                    key={name}
                    name={name}
                    options={{
                      tabBarActiveBackgroundColor: color.grey1,
                      tabBarInactiveBackgroundColor: color.grey4,
                      headerShown: false,
                      tabBarBadge:
                        name === "albums" &&
                        albums.data?.withDeletedCount.length
                          ? albums.data?.withDeletedCount.length
                          : null,
                      tabBarBadgeStyle: {
                        display: "flex",
                        fontSize: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      },
                      tabBarIcon: ({ focused }) => (
                        <AntDesign
                          name={icon}
                          size={20}
                          color={focused ? color.blue3 : color.grey1}
                        />
                      ),
                      tabBarLabel: ({ focused }) => (
                        <Text
                          fontSize={12}
                          color={focused ? "$color.blue3" : "$color.grey1"}
                        >
                          {label}
                        </Text>
                      ),
                    }}
                  />
                ))}

                {hiddenTabs.map((name) => (
                  <Tabs.Screen
                    name={name}
                    key={name}
                    options={{ href: null, headerShown: false }}
                  />
                ))}
              </Tabs>
            </ContentWrapper>
          </GestureHandlerRootView>
        </ScrollView>
      </ImageProvider>
    </HeadingProvider>
  );
};

export default Layout;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
