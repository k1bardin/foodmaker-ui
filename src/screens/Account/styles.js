import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,

    backgroundColor: "white",
  },

  title: {
    color: "#333",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24,
    marginTop: 20,
  },
  profileItem: {
    justifyContent: "space-between",
    marginBottom: 15,
    width: 354,
    height: 56,
    borderRadius: 8,
    backgroundColor: "#F2F2F2",
  },
  label: {
    margin: 6,
    marginLeft: 12,
    fontSize: 12,
    color: "#9D99AC",

    fontWeight: "400",
    fontFamily: "Nunito Sans",
  },
  value: {
    fontSize: 16,
    color: "#555",
    marginLeft: 12,
    marginBottom: 12,
    fontFamily: "Nunito Sans",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  recipesButton: {
    height: 48,
    width: "215",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    backgroundColor: "#235427",
  },
  logoutButton: {
    height: 48,
    width: "215",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    backgroundColor: "#D8E593CC",
  },
  recipesText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  logoutText: {
    color: "#22222270",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default styles;
