import React, { useState } from "react";
import { Image, TouchableHighlight, View } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";

import AccountInfo from "./wallet/AccountInfo";
import ConnectButton from "./wallet/ConnectButton";
import useAuthorization from "../utils/useAuthorization";

export default function Header() {
  const { accounts, selectedAccount, onChangeAccount } = useAuthorization();
  const [accountInfoOpen, setAccountInfoOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <View>
      <View
        style={{
          paddingHorizontal: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image
          style={{
            backgroundColor: "transparent",
            width: 610 / 4,
            height: 200 / 4,
            resizeMode: "contain",
          }}
          source={require("../assets/logo-full.png")}
        />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableHighlight onPress={() => setSearchOpen(!searchOpen)}>
            <IconButton icon="magnify" mode="contained" />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => setAccountInfoOpen(!accountInfoOpen)}
          >
            <IconButton mode="contained" icon="dots-vertical" />
          </TouchableHighlight>
        </View>
      </View>
      {accountInfoOpen && !selectedAccount && (
        <ConnectButton style={{ marginVertical: 5 }}>
          Connect a wallet to bid
        </ConnectButton>
      )}
      {accounts && selectedAccount && accountInfoOpen && (
        <AccountInfo
          accounts={accounts}
          onChange={onChangeAccount}
          selectedAccount={selectedAccount}
        />
      )}
      {searchOpen && <TextInput placeholder="Search a collection" />}
    </View>
  );
}
