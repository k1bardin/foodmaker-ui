import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: "#fff",
  },
  attributes: {
    flexDirection: "row", // Располагаем элементы в ряд
    alignItems: "center", // Выравниваем по центру вертикально
  marginBottom: 12
  },
  userInfo: {
    flexDirection: "row", // Располагаем элементы в ряд
    alignItems: "center", // Выравниваем по центру вертикально
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -15,
    padding: 10,
    marginBottom:20
  },
  editButton: {
    backgroundColor: "#235427",
    borderRadius: 32,
    padding: 10,
    marginRight: 10,
  },
  editText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 24,
  },
  deleteText: {
    color: '#222222B2',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 24,
  },
  deleteButton: {
    backgroundColor: '#D8E593CC',
    borderRadius: 32,
    padding: 10,
    
  },
  header: {
    alignItems: "center",
    marginBottom: 4,
  },
  image: {
    alignItems: "center",
    width: 393,
    height: 258,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontFamily: "Source Sans Pro",
    fontSize: 24,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 32,
    color: "#000000",
    marginBottom: 15,
  },
  subtitle: {
    borderRadius: 8,
    backgroundColor: "#E5E5E5",
    fontSize: 14,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 32,
    height: 32,
    textAlign: "center",
    paddingHorizontal: 10, // Дополнительный отступ по бокам
    marginRight: 16,
  },
  subtitleUser: {
    borderRadius: 8,
    backgroundColor: "#E5E5E5",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 32,
    height: 40,
    textAlign: "center",
    paddingHorizontal: 10, // Дополнительный отступ по бокам
    paddingVertical: 5,
    marginRight: 16,
    marginBottom: 16,
  },

  section: {
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Source Sans Pro",
    color: "#222222",
    marginBottom: 8,
  },
  ingredientsList: {
    flex: 1,
    maxHeight: "75%",
    marginBottom: 16,
  },
  ingredientItem: {
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  ingredientTitle: {
    flex: 1,
    marginRight: 16,
  },
  ingredientQuantity: {
    flex: 0,
    textAlign: "right",
  },
  stepsList: {
    padding: 8,
  },
  step: {
    flexDirection: "row",
    marginBottom: 12,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "400",
    marginRight: 8,
    fontFamily: "Source Sans Pro",
    color: "#222222",
  },
  stepDescription: {
    fontSize: 16,
    fontFamily: "Source Sans Pro",
    fontWeight: "400",
    color: "#222222",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default styles;
