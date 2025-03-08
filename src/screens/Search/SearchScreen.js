import React, { useState, useEffect, useLayoutEffect } from "react";
import styles from "./styles";
import heartDisabled from "../../../assets/icons/heartDisabled.png";
import heartEnabled from "../../../assets/icons/heartEnabled.png";
import { useAuth } from "../../services/AuthContext";
import Modal from "react-native-modal";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import searchInput from "../../../assets/icons/searchInput.png";
import filter from "../../../assets/icons/filter.png";

export default function SearchScreen(props) {
  const { user } = useAuth();
  const { navigation, route } = props;
  const item = route?.params?.category;
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [typeMeals, setTypeMeals] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [ingredientQuantities, setIngredientQuantities] = useState({});
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTypeMeal, setSelectedTypeMeal] = useState(null);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [favourites, setFavourites] = useState({});
  const [recipesArray, setRecipesArray] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [ingredientsModalVisible, setIngredientsModalVisible] = useState(false);
  const [countriesModalVisible, setCountriesModalVisible] = useState(false);
  const [typeMealsModalVisible, setTypeMealsModalVisible] = useState(false);
  const [holidaysModalVisible, setHolidaysModalVisible] = useState(false);
  const [categoriesModalVisible, setCategoriesModalVisible] = useState(false);

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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerRight: () => <View />,
    });
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`http://192.168.88.249:8080/recipes`);
        const data = await response.json();
        setRecipesArray(data);
        setFilteredRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    if (user && recipesArray.length > 0) {
      const fetchFavourites = async () => {
        try {
          const response = await fetch(
            `http://192.168.88.249:8080/favouriteRecipes/${user.userId}`
          );
          const data = await response.json();

          const favouritesObj = data.reduce((acc, favourite) => {
            acc[favourite.recipeId] = true;
            return acc;
          }, {});

          setFavourites(favouritesObj);
        } catch (error) {
          console.error("Error fetching favourites:", error);
        }
      };

      fetchFavourites();
    }
  }, [user, recipesArray]);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { recipeId: item.recipeId });
  };

  const toggleFavourite = async (recipeId) => {
    if (!user) return;
    const isFavourite = favourites[recipeId];
    const method = isFavourite ? "DELETE" : "POST";

    try {
      const response = await fetch(
        `http://192.168.88.249:8080/user/favouriteRecipe`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipeId,
            userId: user.userId,
          }),
        }
      );

      if (response.ok) {
        setFavourites((prevFavourites) => ({
          ...prevFavourites,
          [recipeId]: !isFavourite,
        }));
      }
    } catch (error) {
      console.error("Error toggling favourite:", error);
    }
  };

  const renderRecipes = ({ item }) => {
    const isFavourite = favourites[item.recipeId] || false;
    return (
      <TouchableHighlight
        underlayColor="rgba(196, 196, 196, 0.9)"
        onPress={() => onPressRecipe(item)}
      >
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.imageLinkPreview }} />
          <Text style={styles.title}>{item.recipeTitle}</Text>

          {user && (
            <TouchableOpacity
              style={styles.heartIcon}
              onPress={() => toggleFavourite(item.recipeId)}
            >
              <Image
                source={
                  favourites[item.recipeId] ? heartEnabled : heartDisabled
                }
                style={styles.heartImage}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableHighlight>
    );
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = recipesArray.filter((recipe) =>
      recipe.recipeTitle.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.searchContainer}>
        <View style={{ position: "relative" }}>
          <TextInput
            style={[styles.searchInput, { paddingLeft: 40 }]}
            placeholder="Найти рецепт"
            placeholderTextColor="#21212195"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <View
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: [{ translateY: -10 }],
            }}
          >
            <Image source={searchInput} style={{ width: 20, height: 20 }} />
          </View>
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: [{ translateY: -10 }],
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setIsModalVisible(true)}
          >
            <Image source={filter} style={{ width: 24, height: 20 }} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        onBackdropPress={() => setIsModalVisible(false)}
        style={styles.mainModal}
      >
        <ScrollView style={{ marginTop:320 }}>
          <View>
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
            <TouchableOpacity
              style={styles.selector}
              onPress={() => setHolidaysModalVisible(true)}
            >
              <Text style={styles.selectorText}>
                {selectedHoliday
                  ? holidays.find((h) => h.value === selectedHoliday)?.label
                  : "Выберите праздник"}
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

          {/* Кнопка закрытия */}
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "transparent",
            }}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={{ color: "#999", fontSize: 18 }}>×</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      <FlatList
        style={{ flex: 1 }}
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={filteredRecipes}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.recipeId}`}
      />
    </View>
  );
}
