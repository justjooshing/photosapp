import AsyncStorage from "@react-native-async-storage/async-storage";

export type SortOptions = "keep" | "delete";
export const setImagesCount = async (key: SortOptions) => {
  const currentCount = Number((await AsyncStorage.getItem(key)) || 0);
  AsyncStorage.setItem(key, `${currentCount + 1}`);
};

export const getImagesCount = async (key: SortOptions) =>
  Number((await AsyncStorage.getItem(key)) || 0);
