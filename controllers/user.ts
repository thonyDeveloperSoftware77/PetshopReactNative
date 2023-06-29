import {responseApiClientes} from '../models/responseApiClientes';
//Obtener todos los productos
export const getData = async () => {
    const res = await fetch('http://192.168.3.56:3000/api/v1/clientes')
    const data: responseApiClientes= await res.json()
    return data;
}

//Verificar correo y contraseña
export const verificarEmailAndPassword = async (email:string, password: string) => {
    const response = await fetch(
      'http://192.168.3.56:3000/api/v1/clientes/verificarEmailAndPassword',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, Contrasena: password }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      // El correo electrónico y la contraseña son correctos
      return data;
    } else {
      // El correo electrónico y/o la contraseña son incorrectos
        throw new Error(data.message);
    }
  };

//Obtener un producto por id
export const getDataById = async (id: number) => {
    const res = await fetch(`http://192.168.3.56:3000/api/v1/clientes${id}`)
    const data : responseApiClientes = await res.json()
    return data;
}

//Crear un producto
export const postData = async (cliente: responseApiClientes) => {
    console.log(cliente)
    const res = await fetch('http://192.168.3.56:3000/api/v1/clientes', {
        method: 'POST',
        body: JSON.stringify(cliente),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    console.log(data)
}


//Actualizar un producto

export const putData = async (id: number, cliente: responseApiClientes) => {
     
    console.log(cliente, id) 
    const res = await fetch(`http://192.168.3.56:3000/api/v1/clientes?id=${id}`, {
       
    method: 'PUT',
        body: JSON.stringify(cliente),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    console.log(data)
}
//Eliminar un producto
export const deleteData = async (id: number) => {
    const res = await fetch(`http://192.168.3.56:3000/api/v1/clientes/${id}`, {
        method: 'DELETE'
    })
   
}