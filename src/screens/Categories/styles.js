import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  categoriesItemContainer: {
    flex: 1,
    marginLeft: 17,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center',
    height: 107,
    width: 170,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 8,
  },
  categoriesPhoto: {
    width: '100%',
    height: 107,
    width: 170,
    borderRadius: 8,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 3
  },
  categoriesName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginTop: 8
  },
  categoriesInfo: {
    marginTop: 3,
    marginBottom: 5
  }
});

export default styles;
