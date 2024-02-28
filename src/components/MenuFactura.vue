<template>
  <v-app>
    <!-- Header -->
    <v-app-bar app>
      <!-- Menú desplegable  -->
      <v-app-bar-nav-icon id="menu-activator"></v-app-bar-nav-icon>
      <v-menu activator="#menu-activator">
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="navigateTo(item.path)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-toolbar-title>Facturación</v-toolbar-title>
      <!-- Botón de usuario -->
      <v-btn icon id="account-activator"><v-icon>mdi-account</v-icon></v-btn>
      <v-menu right offset-y activator="#account-activator" location="start">
        <v-list>
          <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
            title="Usuario"
          ></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-item @click="navigateTo('/datos')">
            <v-list-item-title>Datos de perfil</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Body -->
    <v-main>
      <v-container>
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
              v-model="clienteSeleccionado"
              label="Cliente"
              :items="clientes"
              @input="mostrarDetalleCliente"
              variant="outlined"
            ></v-combobox>
          </v-col>
        </v-row>
        <!-- Tarjeta para mostrar los detalles del cliente -->
        <v-row style="margin-bottom: 5px;">
          <v-col>
            <v-card>
              <v-card-title><!-- {{ clienteDetalle.nombre }} -->Nombre:</v-card-title>
              <v-card-text>
                <p><!-- RFC: {{ clienteDetalle.rfc }} -->RFC:</p>
                <p><!-- Contacto: {{ clienteDetalle.contacto }} -->Contacto:</p>
                <p><!-- Dirección: {{ clienteDetalle.direccion }} -->Dirección:</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <!-- Cuarta sección -->
        <label for="">Producto/Servicio</label>
        <v-row style="margin-top: 5px;">
          <v-col cols="2">
            <v-combobox
                label="Clave Interna"
                :items="['001', '002', 'Etc', 'Etc']"
                variant="outlined"
              ></v-combobox>
          </v-col>
          <v-col cols="2">
            <v-text-field label="Unidades" clearable></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-combobox
                label="Clave Producto"
                :items="['01010101', '10101500', 'Etc', 'Etc']"
                variant="outlined"
              ></v-combobox>
          </v-col>
          <v-col cols="2">
            <v-combobox
                label="Clave unidad"
                :items="['ACT', 'H87', 'Etc', 'Etc']"
                variant="outlined"
              ></v-combobox>
          </v-col>
          <v-col cols="4">
            <v-text-field label="Descripción" clearable></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <v-text-field label="Precio"  prefix="$" clearable></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field label="Importe" prefix="$" clearable></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field label="IVA" prefix="$" clearable></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field label="Descuento" prefix="$" clearable></v-text-field>
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
    items: [
      { title: 'Inicio', path: '/'},
      { title: 'Inventario', path: '/'},
      { title: 'Facturación', path: '/MenuFactura' },
      { title: 'Configuración', path: '/'},
    ],
    clientes: ['Jaime', 'Pedro', 'Humberto', 'Etc'],
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
      clienteSeleccionado: null,
      clienteDetalle: null
    };
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
    mostrarDetalleCliente() {
      if (this.clienteSeleccionado) {
        this.clienteDetalle = this.detallesClientes[this.clienteSeleccionado];
        this.mostrarTarjeta = true;
      } else {
        this.clienteDetalle = null;
      }
    }
  } 
}
</script>

<style>
/* Estilos personalizados */
</style>
