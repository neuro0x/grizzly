import AsyncStorage from "@react-native-async-storage/async-storage";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { clusterApiUrl, PublicKey, PublicKeyInitData } from "@solana/web3.js";
import React, { Suspense } from "react";
import {
  ActivityIndicator,
  AppState,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { MD3DarkTheme, Provider as PaperProvider } from "react-native-paper";
import { Cache, SWRConfig } from "swr";

import SnackbarProvider from "./components/SnackbarProvider";
import MainScreen from "./screens/MainScreen";

const DEVNET_ENDPOINT = /*#__PURE__*/ clusterApiUrl("devnet");

function cacheReviver(key: string, value: any) {
  if (key === "publicKey") {
    return new PublicKey(value as PublicKeyInitData);
  } else {
    return value;
  }
}

const STORAGE_KEY = "app-cache";
let initialCacheFetchPromise: Promise<void>;
let initialCacheFetchResult: any;
function asyncStorageProvider() {
  if (initialCacheFetchPromise == null) {
    initialCacheFetchPromise = AsyncStorage.getItem(STORAGE_KEY).then(
      (result) => {
        initialCacheFetchResult = result;
      }
    );
    throw initialCacheFetchPromise;
  }
  let storedAppCache;
  try {
    storedAppCache = JSON.parse(initialCacheFetchResult, cacheReviver);
  } catch {}
  const map = new Map(storedAppCache || []);
  initialCacheFetchResult = undefined;
  function persistCache() {
    const appCache = JSON.stringify(Array.from(map.entries()));
    AsyncStorage.setItem(STORAGE_KEY, appCache);
  }
  AppState.addEventListener("change", (state) => {
    if (state !== "active") {
      persistCache();
    }
  });
  AppState.addEventListener("memoryWarning", () => {
    persistCache();
  });
  return map as Cache<any>;
}

const theme = {
  ...MD3DarkTheme,
  roundness: 2,
  colors: {
    primary: "rgb(0, 227, 139)",
    onPrimary: "rgb(0, 57, 31)",
    primaryContainer: "rgb(0, 82, 47)",
    onPrimaryContainer: "rgb(86, 255, 168)",
    secondary: "rgb(216, 185, 255)",
    onSecondary: "rgb(69, 0, 134)",
    secondaryContainer: "rgb(99, 0, 187)",
    onSecondaryContainer: "rgb(237, 220, 255)",
    tertiary: "rgb(163, 205, 219)",
    onTertiary: "rgb(3, 54, 65)",
    tertiaryContainer: "rgb(33, 76, 88)",
    onTertiaryContainer: "rgb(191, 233, 248)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(25, 28, 26)",
    onBackground: "rgb(225, 227, 222)",
    surface: "rgb(25, 28, 26)",
    onSurface: "rgb(225, 227, 222)",
    surfaceVariant: "rgb(65, 73, 66)",
    onSurfaceVariant: "rgb(192, 201, 192)",
    outline: "rgb(138, 147, 139)",
    outlineVariant: "rgb(65, 73, 66)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(225, 227, 222)",
    inverseOnSurface: "rgb(46, 49, 46)",
    inversePrimary: "rgb(0, 109, 64)",
    elevation: {
      level0: "transparent",
      level1: "rgb(24, 38, 32)",
      level2: "rgb(23, 44, 35)",
      level3: "rgb(22, 50, 38)",
      level4: "rgb(22, 52, 40)",
      level5: "rgb(22, 56, 42)",
    },
    surfaceDisabled: "rgba(225, 227, 222, 0.12)",
    onSurfaceDisabled: "rgba(225, 227, 222, 0.38)",
    backdrop: "rgba(42, 50, 44, 0.4)",
  },
};
export default function App() {
  return (
    <ConnectionProvider
      config={{ commitment: "processed" }}
      endpoint={DEVNET_ENDPOINT}
    >
      <SafeAreaView
        style={{
          height: "100%",
        }}
      >
        <PaperProvider theme={theme}>
          <SnackbarProvider>
            <Suspense
              fallback={
                <View
                  style={{
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator
                    size="large"
                    style={{
                      marginVertical: "auto",
                    }}
                  />
                </View>
              }
            >
              <SWRConfig value={{ provider: asyncStorageProvider }}>
                <MainScreen />
              </SWRConfig>
            </Suspense>
          </SnackbarProvider>
        </PaperProvider>
      </SafeAreaView>
    </ConnectionProvider>
  );
}
