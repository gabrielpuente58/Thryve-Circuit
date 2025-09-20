import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

type WelcomeHeaderProps = {
  /** Name to show after "Welcome" */
  name?: string;
  /** Optional additional styles for the outer container (e.g., top padding, horizontal padding) */
  style?: ViewStyle;
  /** Size of the avatar circle/icon */
  avatarSize?: number;
  /** Called when the avatar is pressed (e.g., open profile) */
  onPressAvatar?: () => void;
};

export default function WelcomeHeader({
  name = "User",
  style,
  avatarSize = 30,
  onPressAvatar,
}: WelcomeHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <Pressable
        onPress={onPressAvatar}
        disabled={!onPressAvatar}
        style={[
          styles.avatar,
          { width: avatarSize, height: avatarSize, borderRadius: avatarSize },
        ]}
      >
        <Feather
          name="user"
          size={Math.max(20, Math.floor(avatarSize * 0.66))}
          color="#555"
        />
      </Pressable>

      <Text style={styles.welcomeText}>Welcome {name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
});
