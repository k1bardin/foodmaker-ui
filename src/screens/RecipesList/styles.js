import { StyleSheet } from "react-native";
import { RecipeCard } from "../../AppStyles";

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  button: {
    width: 350,
    alignSelf: "center",
    height: 56,
    borderRadius: 8,
    backgroundColor: "#F2F2F2",
    marginTop: 15,
  },
  buttonText: {
    width: 250,
    height: 24,
    fontFamily: "Source Sans Pro",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 24,
    color: "#212121",
    marginTop: 15,
    marginLeft: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 24,
    height: 24,
  },
  heartImage: {
    width: "100%",
    height: "100%",
  },
});

export default styles;
