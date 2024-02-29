<template>
  <v-app>
    <!-- Header -->
    <v-app-bar app>
      <!-- Menú desplegable  -->
      <v-btn
        @click.stop="drawer = !drawer"
        id="menu-activator"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title>Facturación</v-toolbar-title>
    </v-app-bar>

    <!-- Body -->
    <v-main>
      <v-container>
        <!-- Menú lateral -->
        <v-navigation-drawer
          v-model="drawer"
          temporary
        >
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
            title="John Leider"
          ></v-list-item>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="navigateTo(item.path)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
            <v-list-item-title>Cerrar sesión</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <!-- Primera sección  -->
        <label for="">Datos de Factura</label>
        <v-row style="margin-top: 5px;">
            <v-col cols="6"> 
              <!-- <label>Folio</label> -->
              <v-text-field label="Folio" clearable></v-text-field>
            </v-col>
            <v-col cols="6"> 
              <!-- <label>Tipo de documento</label> -->
              <v-combobox
                label="Tipo de Documento"
                :items="['Nota de Venta', 'Factura', 'Etc', 'Etc']"
                variant="outlined"
              ></v-combobox>
            </v-col>
          </v-row>
        <!-- Segunda sección con combobox -->
        <label for="">Datos de Comprobante</label>
        <v-row style="margin-top: 5px;">
          <v-col cols="2">
            <v-combobox
                label="Regimen fiscal"
                :items="['General de Ley Personas Morales', 'Demás ingresos', 'Etc', 'Etc']"
                variant="outlined"
              ></v-combobox>
          </v-col>
          <v-col cols="2">
            <v-text-field label="CP" clearable></v-text-field>
          </v-col>
          <v-col cols="2"><v-row>
            <label for="">Fecha de emision</label></v-row>
            <v-text-field
              readonly
              :value="getCurrentDate()"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-combobox
                label="Tipo de Factura"
                :items="['Ingreso', 'Egreso', 'Etc', 'Etc']"
                variant="outlined"
              ></v-combobox>
          </v-col>
          <v-col cols="2">
            <v-combobox
                label="Forma de Pago"
                :items="['Efectivo', 'Transferencia', 'Etc', 'Etc']"
                variant="outlined"
              ></v-combobox>
          </v-col>
          <v-col cols="2">
            <v-combobox
                label="Metodo de Pago"
                :items="['PUE', 'PPD']"
                variant="outlined"
              ></v-combobox>
          </v-col>
        </v-row>
        <!-- Tercera sección -->
        <label for="">Datos del Cliente</label>
        <v-row style="margin-top: 5px;">
          <v-col>
            <v-combobox
              v-model="selectedItem"
              label="Cliente"
              
              :items="clientes"
              variant="outlined"
              hide-selected
            ></v-combobox>
          </v-col>
        </v-row>
        <!-- Tarjeta para mostrar los detalles del cliente -->
        <v-row style="margin-bottom: 5px;">
          <v-col>
            <v-card color="#E6E6E6" v-if="clienteDetalle">
              <v-card-title>{{ clienteDetalle.nombre }}</v-card-title>
              <v-card-text>
                <p>RFC: {{ clienteDetalle.rfc }}</p>
                <p>Contacto: {{ clienteDetalle.contacto }}</p>
                <p>Dirección: {{ clienteDetalle.direccion }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <!-- Cuarta sección -->
        <label for="">Producto/Servicio</label>
        <v-row style="margin-top: 5px;">
          <v-col cols="2">
            <!-- Textfield con botón para abrir el modal -->
            <v-text-field v-model="selectedClaveInterna" label="Clave Interna" variant="outlined" readonly>
              <template v-slot:append>
                <v-btn @click="modalActivo = true" icon size="small">
                  <v-icon>mdi-folder-open</v-icon>
                </v-btn>
              </template>
            </v-text-field>

            <!-- Modal para mostrar las opciones -->
            <v-dialog v-model="modalActivo" max-width="500px">
              <v-card>
                <v-card-title>Seleccione una Clave Interna</v-card-title>
                <v-card-text>
                  <v-list>
                    <!-- Iterar sobre las opciones y mostrarlas en una lista -->
                    <v-list-item v-for="clave in productos" :key="clave[0]" @click="seleccionarClaveInterna(clave[0])">
                      <v-list-item-title>{{ clave[0] }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="modalActivo = false">Cerrar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="unidades" label="Unidades" variant="outlined" clearable ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="selectedClaveProducto" label="Clave Producto" variant="outlined" readonly></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="selectedClaveUnidad" label="Clave unidad" variant="outlined" readonly></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="descripcion" label="Descripción" variant="outlined" readonly></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="precio" label="Precio" prefix="$" variant="outlined" readonly></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="importe" label="Importe" prefix="$" readonly></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field label="IVA" prefix="$" variant="outlined" ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field label="Descuento" prefix="$" variant="outlined" ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-card color="#D0E0F4">
              <v-card-text>
                <p>Subtotal:</p>
                <p>Descuento:</p>
                <p>IVA:</p>
                <p>Total:</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { router } from '../router.js';

export default {
  data() {
    return{
    selectedItem: null,
    drawer: false,
    modalActivo: false,
    items: [
      { title: 'Inicio', path: '/'},
      { title: 'Inventario', path: '/'},
      { title: 'Facturación', path: '/MenuFactura' },
      { title: 'Configuración', path: '/'},
    ],
    clientes: ['Jaime', 'Pedro', 'Humberto', 'Etc'
    ],
    clienteDetalle: null,
    detallesClientes: {
        Jaime: {
          nombre: 'Jaime',
          rfc: 'XXXXXXXXX',
          contacto: '1234567890',
          direccion: 'Calle 123, Ciudad'
        },
        Pedro: {
          nombre: 'Pedro',
          rfc: 'YYYYYYYYY',
          contacto: '0987654321',
          direccion: 'Avenida 456, Pueblo'
        },
        Humberto: {
          nombre: 'Humberto',
          rfc: 'ZZZZZZZZZ',
          contacto: '5555555555',
          direccion: 'Carretera 789, Villa'
        },
        Etc: {
          nombre: 'Etc',
          rfc: 'WWWWWWWWW',
          contacto: '9999999999',
          direccion: 'Calle Principal, Lugar'
        }
    },
    productos: [
      ['001', '01010101', 'ACT', 'Procesador AMD', 100],
      ['002', '10101500', 'H87', 'Limpieza y actualización', 200],
      ['Etc', 'Etc', 'Etc', 'Etc', 10]
    ],
    selectedClaveInterna: null,
    selectedClaveProducto: null,
    selectedClaveUnidad: null,
    descripcion: '',
    unidades: null,
    precio: null,
    importe: null 
    };
  },
  watch: {
    selectedItem(newValue) {
      if (newValue) {
        this.clienteDetalle = this.detallesClientes[newValue];
      } else {
        this.clienteDetalle = null;
      }
    },
    /* selectedClaveInterna(newValue) {
      if (newValue) {
        const productoSeleccionado = this.productos.find(producto => producto[0] === newValue);
        if (productoSeleccionado) {
          // Actualizar los campos con los detalles del producto seleccionado
          this.unidades = '1';
          this.selectedClaveProducto = productoSeleccionado[1];
          this.selectedClaveUnidad = productoSeleccionado[2];
          this.descripcion = productoSeleccionado[3];
          this.precio = productoSeleccionado[4].toString();
        }
      }
    }, */
    //Recalcular valores de moni moni
    unidades(newValue) {
      this.calcularImporte(newValue);
    },
    precio() {
      this.calcularImporte(this.unidades);
    }
  },
  methods: {
    navigateTo(path) {
      router.push(path);
    },
    logout() {
      // Agrega la lógica para cerrar sesión
    },
    getCurrentDate() {
      // Obtiene la fecha actual y la formatea como deseado
      const currentDate = new Date().toISOString().substr(0, 10);
      return currentDate;
    },
    calcularImporte(unidades) {
      const importe = parseFloat(this.precio) * parseFloat(unidades);
      this.importe = isNaN(importe) ? '' : importe.toFixed(2);
    },
        seleccionarClaveInterna(claveInterna) {
      // Ejecutar la misma lógica que en el watcher del ComboBox
      this.selectedClaveInterna = claveInterna;
      // También podrías cerrar el modal aquí si lo deseas
      this.modalActivo = false;
      // Llamar a la función que maneja el cambio en la clave interna
      this.actualizarDetallesProducto(claveInterna);
    },
    actualizarDetallesProducto(claveInterna) {
      // Lógica para actualizar los detalles del producto
      const productoSeleccionado = this.productos.find(producto => producto[0] === claveInterna);
      if (productoSeleccionado) {
        // Actualizar los campos con los detalles del producto seleccionado
        this.unidades = '1';
        this.selectedClaveProducto = productoSeleccionado[1];
        this.selectedClaveUnidad = productoSeleccionado[2];
        this.descripcion = productoSeleccionado[3];
        this.precio = productoSeleccionado[4].toString();
        // Recalcular el importe
        this.calcularImporte(this.unidades);
      }
    }
  }
}
</script>

<style>
/* Estilos personalizados */
</style>
