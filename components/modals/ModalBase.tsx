import { Dispatch, SetStateAction } from "react";
import { IconButton, Modal, Portal, useTheme } from "react-native-paper";

interface ModalBaseProps {
  children: React.ReactNode;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function ModalBase({
  children,
  visible,
  setVisible,
}: ModalBaseProps) {
  const theme = useTheme();
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          margin: 20,
          padding: 20,
          borderRadius: 10,
        }}
      >
        <IconButton
          style={{ position: "absolute", top: 0, right: 0 }}
          icon="close"
          onPress={() => setVisible(false)}
        />
        {children}
      </Modal>
    </Portal>
  );
}
