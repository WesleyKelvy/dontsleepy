import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem("token", token);
};

export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem("token");
};

export const removeToken = async () => {
  await AsyncStorage.removeItem("token");
};

export const setUserData = async (name: string) => {
  await AsyncStorage.setItem("userData", name);
};

export const getUserData = async () => {
  return await AsyncStorage.getItem("userData");
};
