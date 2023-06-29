export interface responseApiProductos {
    data: {
        id: number,
        nombre: string,
        escripcion: string,
        precio: number,
        category: string,
    }[];
}

export interface responseApiClientes {
    data: {
        id: number,
        Name: string,
        Contrasea: string,
        email: string,
        phoneNumber: string,
    }[];
}

export interface responseApiVentas {
    data: {
        id: number,
        idCliente: number,
        fecha: string,
        precio_total: number,
    }[];
}

export interface responseApiVentaProducto {
    data: {
        id: number,
        id_venta: number,
        id_producto: number,
        cantidad: number,
    }[];
}