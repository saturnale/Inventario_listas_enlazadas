class Nodo {
    constructor(producto) {
        this.producto = producto;  // El producto que guarda el nodo
        this.siguiente = null;     // Referencia al siguiente nodo
    }
}

class InventarioOrdenado {
    constructor() {
        this.primero = null;  // El primer nodo de la lista enlazada
    }
    
    agregar(producto) {
        let nuevoNodo = new Nodo(producto);
        
        if (!this.primero || producto.codigo < this.primero.producto.codigo) {
            nuevoNodo.siguiente = this.primero;
            this.primero = nuevoNodo;
            return true;
        }
        
        let actual = this.primero;
        while (actual.siguiente && actual.siguiente.producto.codigo < producto.codigo) {
            actual = actual.siguiente;
        }
        
        if (actual.producto.codigo === producto.codigo) {
            return false;  // Código ya existe
        }
        
        nuevoNodo.siguiente = actual.siguiente;
        actual.siguiente = nuevoNodo;
        return true;
    }
    
    buscar(codigo) {
        let actual = this.primero;
        while (actual) {
            if (actual.producto.codigo === codigo) {
                return actual.producto;
            }
            actual = actual.siguiente;
        }
        return null;
    }
    
    eliminar(codigo) {
        if (!this.primero) return null;
        
        if (this.primero.producto.codigo === codigo) {
            let eliminado = this.primero.producto;
            this.primero = this.primero.siguiente;
            return eliminado;
        }
        
        let actual = this.primero;
        while (actual.siguiente) {
            if (actual.siguiente.producto.codigo === codigo) {
                let eliminado = actual.siguiente.producto;
                actual.siguiente = actual.siguiente.siguiente;
                return eliminado;
            }
            actual = actual.siguiente;
        }
        return null;
    }
    
    extraerPrimero() {
        if (!this.primero) return null;
        let producto = this.primero.producto;
        this.primero = this.primero.siguiente;
        return producto;
    }
    
    insertarEnPosicion(producto, posicion) {
        if (posicion <= 0) return false;
        
        let nuevoNodo = new Nodo(producto);
        
        if (posicion === 1) {
            nuevoNodo.siguiente = this.primero;
            this.primero = nuevoNodo;
            return true;
        }
        
        let actual = this.primero;
        let index = 1;
        while (actual && index < posicion) {
            if (index === posicion - 1) {
                nuevoNodo.siguiente = actual.siguiente;
                actual.siguiente = nuevoNodo;
                return true;
            }
            actual = actual.siguiente;
            index++;
        }
        return false;  // Posición no encontrada
    }
    
    agregarAlInicio(producto) {
        return this.insertarEnPosicion(producto, 1);
    }
    
    infoTexto() {
        let actual = this.primero;
        let texto = '';
        while (actual) {
            texto += actual.producto.info() + '<br>';
            actual = actual.siguiente;
        }
        return texto;
    }
    
    listar() {
        let html = "<h3>Listado de Productos (Orden Normal):</h3>";
        let actual = this.primero;
        while (actual) {
            html += actual.producto.infoHtml();
            actual = actual.siguiente;
        }
        if (!this.primero) html += "<p>No hay productos.</p>";
        return html;
    }
    
    listarInverso() {  // Implementación recursiva sin auxiliar
        let html = "";  // String para construir el HTML
        function recorrerInverso(actual) {
            if (actual === null) return "";  // Base de la recursión
            let resto = recorrerInverso(actual.siguiente);  // Ve al final primero
            return resto + actual.producto.infoHtml();  // Agrega en el camino de regreso
        }
        html = "<h3>Listado de Productos (Orden Inverso):</h3>" + recorrerInverso(this.primero);
        if (!this.primero) html += "<p>No hay productos.</p>";
        return html;
    }
}
