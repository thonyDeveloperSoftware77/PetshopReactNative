import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { getData } from '../controllers/producto';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Modal, FlatList, TextInput } from 'react-native';
import { storage } from '../firebase';
import { verificarEmailAndPassword } from '../controllers/user';
import { postData } from '../controllers/venta';
import { postDataVentaProducto } from '../controllers/ventaProducto';

export default function Principal({ navigation }) {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);
    const [usuario, setUsuario] = useState(null);

    const [isLoginModalVisible, setIsLoginModalVisible] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Lógica para validar el inicio de sesión del usuario

        verificarEmailAndPassword(username, password).then((user) => {
            if (user) {
                setUsuario(user);
                setIsLoginModalVisible(false);

                // Si el inicio de sesión es correcto:
            } else {
                alert('Ingreso');
            }
        }).catch((error) => {
            console.error(error);
            alert('Usuario o contraseña incorrectos');
        });



    };


    const handleAddToCart = (item) => {
        // Check if the item is already in the cart
        const index = cart.findIndex((cartItem) => cartItem.id === item.id);
        if (index !== -1) {
            // If the item is already in the cart, update the quantity
            const newCart = [...cart];
            newCart[index].quantity += 1;
            setCart(newCart);
        } else {
            // If the item is not in the cart, add it with a quantity of 1
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const [isCartModalVisible, setIsCartModalVisible] = useState(false);

    const handleViewCart = () => {
        setIsCartModalVisible(true);
    };

    const handleCloseCart = () => {
        setIsCartModalVisible(false);
    };
    const handleConfirmPurchase = async () => {
        // Lógica para confirmar la compra
        const id = usuario.id;
        const total = cartTotal.toFixed(2);

        //crear arreglo de venta
        const venta = {
            id: null,
            id_cliente: id,
            fecha: null,
            precio_total: total,
        };
        await postData(venta).then((response) => {
            if (response) {
                console.log(response);
                console.log(response.venta);
                cart.forEach((item) => {
                    postDataVentaProducto({
                        id: null,
                        id_venta: response.venta.id,
                        id_producto: item.id,
                        cantidad: item.quantity,

                    });
                });
                alert('Compra realizada con éxito');
                setCart([]);
                setIsCartModalVisible(false);
            } else {
                alert('Error al realizar la compra');
            }
        });
        console.log(id);


    }

    const handleGetImage = (id) => {
        var storageRef = ref(storage, `Productos/Producto${id}`);
        return getDownloadURL(storageRef)
            .then((url) => {
                return url;
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const dataByCategory = data.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});

    const handleRemoveFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Text style={styles.cartItemName}>{item.nombre}</Text>
            <Text style={styles.cartItemQuantity}>Cantidad: {item.quantity}</Text>
            <Text style={styles.cartItemPrice}>Precio: ${item.precio.toFixed(2)}</Text>
            <TouchableOpacity
                style={styles.removeFromCartButton}
                onPress={() => handleRemoveFromCart(item.id)}
            >
                <Text style={styles.removeFromCartButtonText}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    );

    const cartTotal = cart.reduce(
        (total, item) => total + item.precio * item.quantity,
        0
    );

    useEffect(() => {
        getData().then((data) => {
            setData(data);
        });
    }, []);

    const [images, setImages] = useState({});

    useEffect(() => {
        const fetchImages = async () => {
            const newImages = {};
            for (const item of data) {
                const url = await handleGetImage(item.id);
                newImages[item.id] = url;
            }
            setImages(newImages);
        };
        fetchImages();
    }, [data]);
    return (
        <View style={styles.container}>
            <Modal visible={isLoginModalVisible} animationType="slide">
                {/* Contenido del modal de inicio de sesión */}
                <View style={styles.loginModal}>
                    <View style={styles.loginForm}>
                        <Text style={styles.inputLabel}>Nombre de usuario:</Text>
                        <TextInput
                            value={username}
                            onChangeText={setUsername}
                            style={styles.input}
                        />
                        <Text style={styles.inputLabel}>Contraseña:</Text>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            style={styles.input}
                        />
                        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>Iniciar sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <ScrollView>
                <Text style={styles.title}>Bienvenido a la tienda {usuario?.Name}</Text>


                {Object.keys(dataByCategory).map((category) => (
                    <View key={category}>
                        <Text style={styles.categoryTitle}>{category}</Text>
                        {dataByCategory[category].map((item) => (
                            <View key={item.id} style={styles.item}>
                                <Image
                                    source={{ uri: images[item.id] }}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                                <Text style={styles.title}>{item.nombre}</Text>
                                <Text style={styles.description}>{item.escripcion}</Text>
                                <View style={styles.itemFooter}>
                                    <Text style={styles.price}>${item.precio.toFixed(2)}</Text>
                                    <TouchableOpacity
                                        style={styles.addToCartButton}
                                        onPress={() => handleAddToCart(item)}
                                    >
                                        <Text style={styles.addToCartButtonText}>Añadir al carrito</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity
                style={styles.cartButton}
                onPress={handleViewCart}
            >
                <Text style={styles.cartButtonText}>Ver carrito{cart.length}</Text>
            </TouchableOpacity>

            <Modal visible={isCartModalVisible} animationType="slide">
                {/* Contenido del modal de carrito */}
                <View style={styles.cartTotal}>
                    <Text style={styles.cartTotalText}>Productos añadidos al Carrito</Text>
                </View>
                <FlatList
                    data={cart}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
                <View style={styles.cartTotal}>
                    <Text style={styles.cartTotalText}>Total: ${cartTotal.toFixed(2)}</Text>
                    <TouchableOpacity
                        style={styles.confirmPurchaseButton}
                        onPress={handleConfirmPurchase}
                    >
                        <Text style={styles.confirmPurchaseButtonText}>Confirmar compra</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.addToCartButton} onPress={handleCloseCart}>
                    <Text style={{ color: "white" }} >Cerrar</Text>
                </TouchableOpacity>
            </Modal>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    cartButton: {
        position: 'absolute',
        top: 42,
        right: 16,
        backgroundColor: '#A80038',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
        zIndex: 1,
    },
    cartButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    categoryTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 8,
    },
    item: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#A80038'
    },
    addToCartButton: {
        backgroundColor: '#A80038',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20
    },
    addToCartButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }, cartItem: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    cartItemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cartItemQuantity: {
        fontSize: 16,
        color: '#777',
    },
    cartItemPrice: {
        fontSize: 16,
        color: '#777',
    },
    removeFromCartButton: {
        backgroundColor: '#A80038',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginTop: 8,
    },
    removeFromCartButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    }, cartTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    cartTotalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    confirmPurchaseButton: {
        backgroundColor: '#4caf50',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    confirmPurchaseButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    loginModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafafa',
    },
    loginForm: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    loginButton: {
        backgroundColor: '#A80038',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

});
