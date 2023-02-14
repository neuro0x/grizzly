import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import React, { ComponentProps } from "react";
import { Button, useTheme } from "react-native-paper";

import useAuthorization from "../../utils/useAuthorization";

type Props = Readonly<ComponentProps<typeof Button>>;

export default function DisconnectButton(props: Props) {
  const { colors } = useTheme();
  const { deauthorizeSession } = useAuthorization();

  return (
    <Button
      buttonColor={colors.secondary}
      mode={props.mode || "contained"}
      onPress={() => {
        transact(async (wallet) => {
          await deauthorizeSession(wallet);
        });
      }}
    >
      {props.children}
    </Button>
  );
}
