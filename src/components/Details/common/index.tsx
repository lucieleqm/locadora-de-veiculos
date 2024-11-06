import { View, Text } from "react-native";
import styles from "./style";
import React from "react";

export const SectionCard = ({
  title,
  iconComponent: IconComponent,
  iconName,
  children,
}: {
  title: string;
  iconComponent: any;
  iconName: string;
  children: React.ReactNode;
}) => (
  <View style={styles.sectionCard}>
    <View style={styles.sectionHeader}>
      <IconComponent name={iconName} size={24} style={styles.icon} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <View style={styles.sectionInfo}>{children}</View>
  </View>
);

export const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);
