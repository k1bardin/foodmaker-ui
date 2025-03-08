import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Source Sans Pro",
    marginBottom: 16,
  },
  input: {
    height: 48,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(246, 246, 246, 1.0)",
    borderRadius: 8,
    backgroundColor: "#F2F2F2",
    opacity: 0.98,
    fontSize: 16,
    marginBottom: 5,
  },
  userTypeContainer: {
    marginBottom: 20,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
    flexWrap: 'nowrap',
    justifyContent: "center",
    alignItems: "center",
  },
  chipSelected: {
    backgroundColor: "#E8B536",
  },
  chipText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
  title: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 6,
    textAlign: 'center',
    },
  button: {
    height: 48,
    width: "80%",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
    alignSelf: "center",
    backgroundColor: "#235427",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
