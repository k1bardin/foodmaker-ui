import { StyleSheet } from "react-native";
import { RecipeCard } from '../../AppStyles';

const styles = StyleSheet.create({

    
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Source Sans Pro",
    marginBottom: 16,
  },
  selector: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
  },
  selectorText: {
    fontSize: 16,
    opacity: 0.22,
  },
  modalContentIngredients: {
    flex: 1,
    maxHeight: "80%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
  modalContentCategories: {
    flex: 1,
    maxHeight: "45%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },

  modalContentCountries: {
    flex: 1,
    maxHeight: "45%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
  searchContainer: {
    marginBottom: 16,
    marginTop: 10,
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(246, 246, 246, 1.0)",
    borderRadius: 8,
    backgroundColor: "#F2F2F2",
    opacity: 0.98,
    fontSize: 16,
  },
  input: {
    height: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(246, 246, 246, 1.0)",
    borderRadius: 8,
    backgroundColor: "#F2F2F2",
    opacity: 0.98,
    fontSize: 16,
    marginBottom: 15,
  },
  ingredientList: {
    flex: 1,
    maxHeight: "75%", // Ограничиваем высоту списка
    marginBottom: 16, // Добавляем отступ снизу
  },
  ingredientItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countriesList: {
    flex: 1,
    maxHeight: "75%", // Ограничиваем высоту списка
    marginBottom: 16, // Добавляем отступ снизу
  },
  countryItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryList: {
    flex: 1,
    maxHeight: "75%", // Ограничиваем высоту списка
    marginBottom: 30, // Добавляем отступ снизу
  },
  categoryItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ingredientText: {
    fontSize: 16,
  },

  countryText: {
    fontSize: 16,
  },
  checkedText: {
    color: "green",
    fontSize: 16,
    marginLeft: 8,
  },
  doneButton: {
    backgroundColor: "#235427",
    paddingVertical: 12,
    alignSelf: "stretch",
    marginTop: 16,
    borderRadius: 32,
  },
  doneText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  addStep: {
    width: 120,
    height: 20,
    fontFamily: "Source Sans Pro",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 24,
    color: "#E8B536",
  },
  quantityInput: {
    height: 30,
    width: 80,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingLeft: 10,
    marginRight: 5,
    fontSize: 16,

    backgroundColor: "#fff",
    marginLeft: 15,
  },
  selectedItems: {
    marginTop: 16,
    marginBottom: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  
  selectedItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selectedItemText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '500',
    marginRight: 8
  },

  removeButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#ff475798'
  },

  removeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
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
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    },
    searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
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
