import { StyleSheet } from 'react-native';
    const styles = StyleSheet.create({
        container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
        },
        form: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        },
        inputContainer: {
        marginBottom: 15,
        },
        label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
        },
        input: {
        height: 45,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        },
        userTypeContainer: {
        marginBottom: 20,
        },
        chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        },
        chip: {
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginRight: 10,
        marginBottom: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        },
        chipSelected: {
        backgroundColor: '#007bff',
        },
        chipText: {
        color: '#333',
        fontSize: 14,
        },
        button: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
        },
        buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        }
        });

export default styles;