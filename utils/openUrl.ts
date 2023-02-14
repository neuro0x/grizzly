import { Alert, Linking } from "react-native";

export default async function openUrl(url: string) {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(`I don't know how to open this URL: ${url}`);
  }
}
