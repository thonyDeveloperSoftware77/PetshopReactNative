import { responseApiProductos } from "../models/responseApiClientes";
//Obtener todos los productos
export const getData = async () => {
    const res = await fetch('http://192.168.3.56:3000/api/v1/productos')
    const data: responseApiProductos= await res.json()
    return data;
}

//Obtener un producto por id
export const getDataById = async (id: number) => {
    const res = await fetch(`http://192.168.3.56:3000/api/v1/productos${id}`)
    const data : responseApiProductos = await res.json()
    return data;
}

//Crear un producto
export const postData = async (producto: responseApiProductos) => {
    const res = await fetch('http://192.168.3.56:3000/api/v1/productos', {
        method: 'POST',
        body: JSON.stringify(producto),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    console.log(data)
}


//Actualizar un producto

export const putData = async (id: number, producto: responseApiProductos) => {
     
    console.log(producto, id) 
    const res = await fetch(`http://192.168.3.56:3000/api/v1/productos?id=${id}`, {
       
    method: 'PUT',
        body: JSON.stringify(producto),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    console.log(data)
}
//Eliminar un producto
export const deleteData = async (id: number) => {
    const res = await fetch(`http://192.168.3.56:3000/api/v1/productos/${id}`, {
        method: 'DELETE'
    })
   
}