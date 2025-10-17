class Producto {
    constructor(codigo, nombre, cantidad, costo) {
        this.codigo = codigo;  // Número entero
        this.nombre = nombre;  // Cadena de texto
        this.cantidad = cantidad;  // Número entero
        this.costo = costo;  // Número decimal
    }
    
    info() {
        // Devuelve la información como texto plano
        return "Código: " + this.codigo + ", Nombre: " + this.nombre + ", Cantidad: " + this.cantidad + ", Costo: " + this.costo;
    }
    
    infoHtml() {
        // Devuelve la información como texto HTML
        return `
            Código: ${this.codigo}<br>
            Nombre: ${this.nombre}<br>
            Cantidad: ${this.cantidad}<br>
            Costo: ${this.costo}<br><br>
        `;
    }
}
