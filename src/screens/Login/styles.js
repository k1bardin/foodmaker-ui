import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
    flex: 1
    },
    formContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)'
    },
    title: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 20,
    textAlign: 'center',
    },
    input: {
    height: 48,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    width: '80%',
    alignSelf: 'center',
    },
    button: {
    height: 48,
    width: '80%',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    alignSelf: 'center',
    backgroundColor: "#235427"
    },
    buttonRegister: {
        height: 48,
        alignSelf: 'center',
        width: '80%',
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        backgroundColor: "#D8E593CC"
        },
    buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: "600",
    },

    buttonRegisterText: {
        color: '#222222B2',
        fontSize: 18,
        fontWeight: "600",
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
    color: '#222222',
    fontSize: 14,
    textAlign: 'center',
    },
    link: {
    color: '#E8B536',
    fontWeight: 'bold',
    }
   });

export default styles;
