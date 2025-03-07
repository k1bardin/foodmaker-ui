import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    formContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    },
    title: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    },
    input: {
    height: 48,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
    },
    button: {
    height: 48,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    color:'#235427'
    },
    buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    },
    error: {
    color: '#f00',
    marginBottom: 12,
    textAlign: 'center',
    },
    footer: {
    marginTop: 20,
    },
    footerText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    },
    link: {
    color: '#4c6ef5',
    fontWeight: 'bold',
    }
   });

export default styles;
