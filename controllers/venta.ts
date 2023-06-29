import { responseApiVentas } from "../models/responseApiClientes";
//Obtener todos los ventas
export const getData = async () => {
    const res = await fetch('http://192.168.3.56:3000/api/v1/ventas')
    const data: responseApiVentas= await res.json()
    return data;
}

//Obtener un producto por id
export const getDataById = async (id: number) => {
    const res = await fetch(`http://192.168.3.56:3000/api/v1/ventas${id}`)
    const data : responseApiVentas = await res.json()
    return data;
}

//Crear un producto
export const postData = async (producto: responseApiVentas) => {
    const res = await fetch('http://192.168.3.56:3000/api/v1/ventas', {
        method: 'POST',
        body: JSON.stringify(producto),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    return data;
}


//Actualizar un producto

export const putData = async (id: number, producto: responseApiVentas) => {
     
    console.log(producto, id) 
    const res = await fetch(`http://192.168.3.56:3000/api/v1/ventas?id=${id}`, {
       
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
    const res = await fetch(`http://192.168.3.56:3000/api/v1/ventas/${id}`, {
        method: 'DELETE'
    })
   
}