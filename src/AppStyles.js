import { StyleSheet } from "react-native";



// 2 photos per width
export const RecipeCard = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 17,
    marginTop: 20,
    width: 170,
    height: 228,
    borderColor: "#cccccc",
    borderWidth: 0.5,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#E5E5E5",
  },
  title: {
    marginTop: 160,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 15,
    fontFamily: "Source Sans Pro",
    fontSize: 12,
    fontWeight: "600",
    color: "#222222",
    backgroundColor: "#FFFFFF",
    marginRight:60,
    marginLeft:10
  },

  photo: {
    width: 170,
    height: 228,
    borderRadius: 8,
    position: "absolute", // Фото тоже делаем абсолютным
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  category: {
    marginTop: 5,
    marginBottom: 5,
  },
});
