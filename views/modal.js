import { useState, useEffect } from 'react';
import { Modal, StyleSheet, View, Text, Button, Image, TextInput } from 'react-native';
import { postData } from '../controllers/user';
export default function modal(props) {
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const [textIngresar, setTextIngresar] = useState({
        Name: '',
        email: '',
        Contrasena: '',
        phoneNumber: '',
    });

    const handleAdd = async (textIngresar) => {
        try {
            await postData(textIngresar);
        } catch (error) {
            console.error(error);
        }
    };
    const handleSubmit = () => {

        handleAdd(textIngresar);
    };

    const handlePress = () => {
        console.log(textIngresar.name);
        console.log(textIngresar.email);
        console.log(textIngresar.phoneNumber);
        handleSubmit();

    };

    return (
        <Modal visible={props.visible} animationType='slide' >
            <Button title="Cerrar" onPress={props.closeModal} />
            <View style={styles.container}>

                <Text>Añadir un nuevo Cliente</Text>
                <Text style={styles.color} >Ingrese su Nombre</Text>

                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: 'white' }}
                    onChangeText={(text) => setTextIngresar({ ...textIngresar, Name: text })}
                    value={textIngresar.Name}
                />
                <Text style={styles.color} >Ingrese su Correo</Text>

                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: 'white' }}
                    onChangeText={(text) => setTextIngresar({ ...textIngresar, email: text })}
                    value={textIngresar.email}
                />

                <Text style={styles.color} >Ingrese su Contraseña</Text>

                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: 'white' }}
                    onChangeText={(text) => setTextIngresar({ ...textIngresar, Contrasena: text })}
                    value={textIngresar.Contrasena}
                />
                <Text style={styles.color} >Ingrese su numero celular</Text>

                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: 'white' }}
                    onChangeText={(text) => setTextIngresar({ ...textIngresar, phoneNumber: text })}
                    value={textIngresar.phone_number}
                />
                <Button title="Ingresar Usuario" onPress={() => handlePress()} />
            </View>


        </Modal>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        height: 100,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },

    flexRowAround: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    flexRowBetween: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textBold: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
    textLight: {
        color: 'white',
        fontWeight: '300',
        fontSize: 15,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    }, flexColumnBetween: {
        marginVertical: 20,

    }, container: {
        flex: 1,
        backgroundColor: "black",
    },
    containerBackground: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: "black",
        width: "100%",
        height: 330,
    },
    backgroundTransparency: {
        opacity: 0.9,
    },
    blurBox: {
        //efecto de blur
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
    },
    color: {
        color: 'white',
    },
    imageStyle: {
        width: "90%",
        height: 110,
    },
    flexContainer: {
        flex: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',

        padding: 10,
    },
    flexItems: {
        width: "47%",
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 5,
        borderRadius: 10,
        margin: 5,
    }

});
