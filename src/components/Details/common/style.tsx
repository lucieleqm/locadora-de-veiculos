import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titleDetails: {
    color: theme.colors.gray[800],
    fontFamily: theme.fontFamily.bold,
    fontSize: 24,
    marginTop: 10,
    marginLeft: 15
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionsBox: {
    backgroundColor: theme.colors.white,
    borderRadius: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.gray[200]
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.gray[800],
    marginLeft: 10,
  },
  icon: {
    color: theme.colors.gray[800],
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionInfo: {
    padding: 5,
  },
  infoItem: {
    flexDirection: "row",
    marginBottom: 4,
  },
  infoLabel: {
    fontFamily: theme.fontFamily.bold,
    marginRight: 8,
  },
  infoValue: {
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.gray[800],
  },
});

export default styles;
