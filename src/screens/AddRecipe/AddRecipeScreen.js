import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import Slider from "@react-native-community/slider";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { useAuth } from "../../services/AuthContext";
import styles from "./styles";
import trashIcon from "../../../assets/icons/trash.png";
import searchInput from "../../../assets/icons/searchInput.png";

export default function AddRecipeScreen(props) {
  const { user } = useAuth();
  const { navigation, route } = props;
  const [recipeTitle, setRecipeTitle] = useState("");
  const [typeMeal, setTypeMeal] = useState("");
  const [recipeHoliday, setRecipeHoliday] = useState("");
  const [recipeCountry, setRecipeCountry] = useState("");
  const [time, setTime] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [typeMeals, setTypeMeals] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [ingredientQuantities, setIngredientQuantities] = useState({});
  const [steps, setSteps] = useState([{ stepNumber: 1, stepDescription: "" }]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTypeMeal, setSelectedTypeMeal] = useState(null);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [activeInput, setActiveInput] = useState(null);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [ingredientsModalVisible, setIngredientsModalVisible] = useState(false);
  const [countriesModalVisible, setCountriesModalVisible] = useState(false);
  const [typeMealsModalVisible, setTypeMealsModalVisible] = useState(false);
  const [holidaysModalVisible, setHolidaysModalVisible] = useState(false);
  const [categoriesModalVisible, setCategoriesModalVisible] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = route.params || {};

  // Устанавливаем updateMode в зависимости от наличия recipeId
  useEffect(() => {
    setUpdateMode(!!recipeId);
  }, [recipeId]);

  // Выполняем запрос только если есть recipeId
  useEffect(() => {
    if (recipeId) {
      const fetchRecipe = async () => {
        try {
          console.log("recipeId:", recipeId);
          const response = await fetch(
            `http://192.168.88.249:8080/recipe/${recipeId}`
          );
          const data = await response.json();
          console.log("Получен рецепт:", data);
          // Извлекаем этапы из данных
          const initialSteps = data.steps || [];

          // Форматируем этапы для отображения
          const formattedSteps = initialSteps.map((step, index) => ({
            stepNumber: index + 1,
            stepDescription: step.stepDescription,
          }));

          // Извлекаем ингредиенты из данных
          const initialIngredients = data.ingredients || [];

          // Создаем маппинг значений для предзаполнения
          const initialSelectedIngredients = initialIngredients.map(
            (ingredient) => ingredient.ingredientId
          );
          const initialIngredientQuantities = initialIngredients.reduce(
            (acc, ingredient) => {
              acc[ingredient.ingredientId] = ingredient.quantity;
              return acc;
            },
            {}
          );
          const extractedTime = data.time ? data.time.match(/\d+/) : "";
          setRecipe(data);
          setRecipeTitle(data.recipeTitle || "");
          setTime(extractedTime ? extractedTime[0] : "");
          const categoryId = data.attributes[0]?.categoryId;
          const countryId = data.attributes[0]?.countryId;
          const typeMealId = data.attributes[0]?.typeMealId;
          const holidayId = data.attributes[0]?.holidayId;
          setSelectedCategory(categoryId || null);
          setSelectedCountry(countryId || null);
          setSelectedTypeMeal(typeMealId || null);
          setSelectedHoliday(holidayId || null);
          setSteps(formattedSteps);
          setSelectedIngredients(initialSelectedIngredients);
          setIngredientQuantities(initialIngredientQuantities);
          console.log("Название рецепта:", recipeTitle);
        } catch (error) {
          console.error("Ошибка при получении рецепта:", error);
        }
      };

      fetchRecipe();
    }
  }, [recipeId]);

  useEffect(() => {
    console.log("Название рецепта:", recipeTitle);
  }, [recipeTitle]);

  const handleCategoryPress = (item) => {
    setCategoriesModalVisible(false);
    setSelectedCategory(item.value);
  };

  const handleIngredientPress = (item) => {
    if (selectedIngredients.includes(item.value)) {
      setSelectedIngredients(
        selectedIngredients.filter((i) => i !== item.value)
      );
      setIngredientQuantities((prev) => ({
        ...prev,
        [item.value]: "",
      }));
    } else {
      setSelectedIngredients([...selectedIngredients, item.value]);
    }
  };

  const handleCountryPress = (item) => {
    setCountriesModalVisible(false);
    setSelectedCountry(item.value);
  };

  const handleTypeMealPress = (item) => {
    setTypeMealsModalVisible(false);
    setSelectedTypeMeal(item.value);
  };

  const handleHolidayPress = (item) => {
    setHolidaysModalVisible(false);
    setSelectedHoliday(item.value);
  };

  const handleQuantityChange = (ingredientValue, quantity) => {
    setIngredientQuantities((prev) => ({
      ...prev,
      [ingredientValue]: quantity,
    }));
  };

  const filteredIngredients = ingredients
    .filter(
      (item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        selectedIngredients.includes(item.value)
    )
    .sort((a, b) => {
      const aSelected = selectedIngredients.includes(a.value);
      const bSelected = selectedIngredients.includes(b.value);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return a.label.localeCompare(b.label);
    });

  const removeIngredient = (ingredient) => {
    setSelectedIngredients(
      selectedIngredients.filter((cat) => cat !== ingredient)
    );
  };

  const removeCategory = (category) => {
    setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
  };

  const fetchIngredients = async () => {
    try {
      const response = await fetch("http://192.168.88.249:8080/ingredients");
      const data = await response.json();
      setIngredients(
        data.map((item) => ({
          value: item.ingredientId,
          label: item.ingredientTitle,
        }))
      );
    } catch (error) {
      console.error("Ошибка загрузки ингредиентов:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://192.168.88.249:8080/categories");
      const data = await response.json();
      setCategories(
        data.map((item) => ({
          value: item.categoryId,
          label: item.categoryName,
        }))
      );
    } catch (error) {
      console.error("Ошибка загрузки категорий:", error);
    }
  };

  const fetchTypeMeals = async () => {
    try {
      const response = await fetch("http://192.168.88.249:8080/typeMeals");
      const data = await response.json();
      setTypeMeals(
        data.map((item) => ({
          value: item.typeMealId,
          label: item.typeMealName,
        }))
      );
    } catch (error) {
      console.error("Ошибка загрузки типов приемов пищи:", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await fetch("http://192.168.88.249:8080/countries");
      const data = await response.json();
      setCountries(
        data.map((item) => ({ value: item.countryId, label: item.countryName }))
      );
    } catch (error) {
      console.error("Ошибка загрузки стран:", error);
    }
  };

  const fetchHolidays = async () => {
    try {
      const response = await fetch("http://192.168.88.249:8080/holidays");
      const data = await response.json();
      setHolidays(
        data.map((item) => ({ value: item.holidayId, label: item.holidayName }))
      );
    } catch (error) {
      console.error("Ошибка загрузки прздников:", error);
    }
  };

  useEffect(() => {
    fetchIngredients();
    fetchCategories();
    fetchCountries();
    fetchTypeMeals();
    fetchHolidays();
  }, []);

  const addStep = () => {
    const newStepNumber = steps.length + 1;
    setSteps([...steps, { stepNumber: newStepNumber, stepDescription: "" }]);
  };

  const removeStep = (index) => {
    if (index !== 0 && index === steps.length - 1) {
      const newSteps = [...steps];
      newSteps.splice(index, 1);
      setSteps(newSteps);
    }
  };

  const saveRecipe = async () => {
    const formattedIngredients = selectedIngredients.map((itemId) => ({
      ingredientId: itemId,
      quantity: ingredientQuantities[itemId] || "",
    }));

    const formattedSteps = steps.map((step, index) => ({
      stepNumber: index + 1,
      stepDescription: step.stepDescription,
    }));

    const attributes = [
      {
        countryId: selectedCountry,
        categoryId: selectedCategory,
        holidayId: selectedHoliday,
        typeMealId: selectedTypeMeal,
      },
    ];

    const recipeData = {
      recipeId,
      recipeTitle,
      time: `${time} минут`,
      imageLink: null,
      imageLinkPreview: null,
      ingredients: formattedIngredients,
      steps: formattedSteps,
      attributes,
    };

    console.log("Selected Ingredients:", selectedIngredients);
    console.log("Formatted Ingredients:", formattedIngredients);
    console.log("Recipe Data:", recipeData);

    try {
      const response = updateMode
        ? await fetch("http://192.168.88.249:8080/recipe", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(recipeData),
          })
        : await fetch("http://192.168.88.249:8080/recipe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(recipeData),
          });

      if (response.ok) {
        const data = await response.json();
        const recipeId = data.recipeId;

        const userId = user?.userId;

        // Создаем данные для второго запроса
        const userRecipeData = {
          recipeId,
          userId,
        };

        // Отправляем второй запрос
        const userRecipeResponse = await fetch(
          "http://192.168.88.249:8080/user/recipe",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userRecipeData),
          }
        );

        if (userRecipeResponse.ok) {
          console.log("Рецепт успешно связан с пользователем");
          navigation.navigate("Recipe", {
            recipeId,
          });
        } else {
          console.error("Ошибка при связывании рецепта с пользователем");
        }
      }
    } catch (error) {
      console.error("Ошибка сохранения рецепта:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView>
        <View
          style={{
            flex: 1,
            padding: 16,
            backgroundColor: "white",
            marginBottom: 8,
          }}
        >
          <Text style={styles.title}>Название рецепта</Text>
          <TextInput
            value={recipeTitle}
            onChangeText={setRecipeTitle}
            placeholder="Введите название рецепта"
            style={styles.input}
          />
          <View
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: [{ translateY: -10 }],
            }}
          ></View>

          <Text style={styles.title}>Время приготовления</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text style={{ marginRight: 8 }}>{time} минут</Text>
            <Slider
              style={{ width: "70%" }}
              minimumValue={0}
              maximumValue={120}
              minimumTrackTintColor="#235427"
              step={1}
              value={time}
              onValueChange={setTime}
            />
          </View>

          <View
            style={{
              marginBottom: 16,
            }}
          >
            <Text style={styles.title}>Ингредиенты</Text>

            <TouchableOpacity
              style={styles.selector}
              onPress={() => setIngredientsModalVisible(true)}
            >
              <Text style={styles.selectorText}>
                {selectedIngredients.length > 0
                  ? selectedIngredients
                      .map(
                        (cat) =>
                          ingredients.find((i) => i.value === cat)?.label || cat
                      )
                      .join(", ")
                  : "Выберите ингредиенты"}
              </Text>
            </TouchableOpacity>

            {/* Модальное окно с ингредиентами */}
            <Modal
              isVisible={ingredientsModalVisible}
              onBackdropPress={() => setIngredientsModalVisible(false)}
            >
              <View style={styles.modalContentIngredients}>
                {/* Поле поиска */}
                <View style={styles.searchContainer}>
                  <TextInput
                    style={[styles.searchInput, { paddingLeft: 40 }]}
                    placeholder="Найти ингредиенты"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                  <View
                    style={{
                      position: "absolute",
                      left: 16,
                      top: "50%",
                      transform: [{ translateY: -10 }],
                    }}
                  >
                    <Image
                      source={searchInput}
                      style={{ width: 20, height: 20 }}
                    />
                  </View>
                </View>

                {/* Список ингредиентов */}
                <ScrollView style={styles.ingredientList}>
                  {filteredIngredients.map((item) => (
                    <TouchableOpacity
                      key={item.value}
                      style={styles.ingredientItem}
                      onPress={() => handleIngredientPress(item)}
                    >
                      <View style={styles.checkboxContainer}>
                        <Text style={styles.ingredientText}>{item.label}</Text>
                        {selectedIngredients.includes(item.value) && (
                            <Text style={styles.checkedText}>(✓)</Text>
                          ) && (
                            <View style={styles.quantityContainer}>
                              <TextInput
                                style={styles.quantityInput}
                                value={ingredientQuantities[item.value] || ""}
                                onChangeText={(text) =>
                                  handleQuantityChange(item.value, text)
                                }
                                placeholder="Кол-во"
                                required
                              />
                            </View>
                          )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                {/* Кнопка "Готово" */}
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={() => setIngredientsModalVisible(false)}
                >
                  <Text style={styles.doneText}>Готово</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={styles.title}>Категория рецепта</Text>

            <TouchableOpacity
              style={styles.selector}
              onPress={() => setCategoriesModalVisible(true)}
            >
              <Text style={styles.selectorText}>
                {selectedCategory
                  ? categories.find((c) => c.value === selectedCategory)?.label
                  : "Выберите категорию рецепта"}
              </Text>
            </TouchableOpacity>

            <Modal
              isVisible={categoriesModalVisible}
              onBackdropPress={() => setCategoriesModalVisible(false)}
            >
              <View style={styles.modalContentCountries}>
                <View style={styles.searchContainer}>
                  <TextInput
                    style={[styles.searchInput, { paddingLeft: 40 }]}
                    placeholder="Поиск категорий"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                  <View
                    style={{
                      position: "absolute",
                      left: 16,
                      top: "50%",
                      transform: [{ translateY: -10 }],
                    }}
                  >
                    <Image
                      source={searchInput}
                      style={{ width: 20, height: 20 }}
                    />
                  </View>
                </View>

                <ScrollView style={styles.countryList}>
                  {categories
                    .filter((item) =>
                      item.label
                        .toLowerCase()
                        .includes(
                          searchQuery.toLowerCase() &&
                            item.label !== "Мои рецепты"
                        )
                    )
                    .map((item) => (
                      <TouchableOpacity
                        key={item.value}
                        style={styles.countryItem}
                        onPress={() => handleCategoryPress(item)}
                      >
                        <View style={styles.checkboxContainer}>
                          <Text style={styles.countryText}>{item.label}</Text>
                          {selectedCategory === item.value && (
                            <Text style={styles.checkedText}>(✓)</Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              </View>
            </Modal>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={styles.title}>Страна</Text>

            <TouchableOpacity
              style={styles.selector}
              onPress={() => setCountriesModalVisible(true)}
            >
              <Text style={styles.selectorText}>
                {selectedCountry
                  ? countries.find((c) => c.value === selectedCountry)?.label
                  : "Выберите страну"}
              </Text>
            </TouchableOpacity>

            <Modal
              isVisible={countriesModalVisible}
              onBackdropPress={() => setCountriesModalVisible(false)}
            >
              <View style={styles.modalContentCountries}>
                <View style={styles.searchContainer}>
                  <TextInput
                    style={[styles.searchInput, { paddingLeft: 40 }]}
                    placeholder="Поиск страны"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                  <View
                    style={{
                      position: "absolute",
                      left: 16,
                      top: "50%",
                      transform: [{ translateY: -10 }],
                    }}
                  >
                    <Image
                      source={searchInput}
                      style={{ width: 20, height: 20 }}
                    />
                  </View>
                </View>

                <ScrollView style={styles.countriesList}>
                  {countries
                    .filter((item) =>
                      item.label
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((item) => (
                      <TouchableOpacity
                        key={item.value}
                        style={styles.countryItem}
                        onPress={() => handleCountryPress(item)}
                      >
                        <View style={styles.checkboxContainer}>
                          <Text style={styles.countryText}>{item.label}</Text>
                          {selectedCountry === item.value && (
                            <Text style={styles.checkedText}>(✓)</Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              </View>
            </Modal>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={styles.title}>Тип приема пищи</Text>

            <TouchableOpacity
              style={styles.selector}
              onPress={() => setTypeMealsModalVisible(true)}
            >
              <Text style={styles.selectorText}>
                {selectedTypeMeal
                  ? typeMeals.find((tm) => tm.value === selectedTypeMeal)?.label
                  : "Выберите тип приема пищи"}
              </Text>
            </TouchableOpacity>

            <Modal
              isVisible={typeMealsModalVisible}
              onBackdropPress={() => setTypeMealsModalVisible(false)}
            >
              <View style={styles.modalContentCountries}>
                <View style={styles.searchContainer}>
                  <TextInput
                    style={[styles.searchInput, { paddingLeft: 40 }]}
                    placeholder="Поиск типов приемов пищи"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                  <View
                    style={{
                      position: "absolute",
                      left: 16,
                      top: "50%",
                      transform: [{ translateY: -10 }],
                    }}
                  >
                    <Image
                      source={searchInput}
                      style={{ width: 20, height: 20 }}
                    />
                  </View>
                </View>

                <ScrollView style={styles.countryList}>
                  {typeMeals
                    .filter((item) =>
                      item.label
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((item) => (
                      <TouchableOpacity
                        key={item.value}
                        style={styles.countryItem}
                        onPress={() => handleTypeMealPress(item)}
                      >
                        <View style={styles.checkboxContainer}>
                          <Text style={styles.countryText}>{item.label}</Text>
                          {selectedTypeMeal === item.value && (
                            <Text style={styles.checkedText}>(✓)</Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              </View>
            </Modal>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={styles.title}>Праздник</Text>

            <TouchableOpacity
              style={styles.selector}
              onPress={() => setHolidaysModalVisible(true)}
            >
              <Text style={styles.selectorText}>
                {selectedHoliday
                  ? holidays.find((h) => h.value === selectedHoliday)?.label
                  : "Выберите праздник, если рецепт к нему относится"}
              </Text>
            </TouchableOpacity>

            <Modal
              isVisible={holidaysModalVisible}
              onBackdropPress={() => setHolidaysModalVisible(false)}
            >
              <View style={styles.modalContentCountries}>
                <View style={styles.searchContainer}>
                  <TextInput
                    style={[styles.searchInput, { paddingLeft: 40 }]}
                    placeholder="Поиск праздника"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                  <View
                    style={{
                      position: "absolute",
                      left: 16,
                      top: "50%",
                      transform: [{ translateY: -10 }],
                    }}
                  >
                    <Image
                      source={searchInput}
                      style={{ width: 20, height: 20 }}
                    />
                  </View>
                </View>

                <ScrollView style={styles.countryList}>
                  {holidays
                    .filter((item) =>
                      item.label
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((item) => (
                      <TouchableOpacity
                        key={item.value}
                        style={styles.countryItem}
                        onPress={() => handleHolidayPress(item)}
                      >
                        <View style={styles.checkboxContainer}>
                          <Text style={styles.countryText}>{item.label}</Text>
                          {selectedHoliday === item.value && (
                            <Text style={styles.checkedText}>(✓)</Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              </View>
            </Modal>
          </View>

          <Text style={styles.title}>Ход приготовления</Text>
          {steps.map((step, index) => (
            <View
              key={index}
              style={{
                marginBottom: 8,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    marginBottom: 4,
                    width: 70,
                    marginBottom: 8,
                    borderRadius: 8,
                    width: 52,
                    height: 24,
                    fontFamily: "Source Sans Pro",
                    fontSize: 14,
                    fontWeight: "600",
                    fontStyle: "normal",
                    lineHeight: 24,
                    textAlign: "center",
                    backgroundColor: "#F2F2F2",
                  }}
                >
                  Этап {step.stepNumber}
                </Text>
                <TextInput
                  placeholder="Опишите этап приготовления"
                  value={step.stepDescription}
                  onChangeText={(text) => {
                    const newSteps = [...steps];
                    newSteps[index].stepDescription = text;
                    setSteps(newSteps);
                  }}
                  style={styles.input}
                />
              </View>
              <TouchableOpacity
                onPress={() => removeStep(index)}
                style={{ padding: 8 }}
              >
                <Image
                  source={trashIcon}
                  style={{ marginTop: 10, width: 24, height: 24, opacity: 0.5 }}
                />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity onPress={addStep} style={styles.addStep}>
            <Text
              style={{
                color: "#E8B536",
                fontWeight: "600",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Добавить этап
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.doneButton} onPress={saveRecipe}>
            <Text style={styles.doneText}>Сохранить рецепт</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
