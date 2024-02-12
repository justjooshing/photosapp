import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = () => {
  AsyncStorage.setItem("auth", "true");
};

export const logout = () => {
  AsyncStorage.setItem("auth", "false");
};

export const isAuth = async () => {
  const value = await AsyncStorage.getItem("auth");
  return value === "true";
};
