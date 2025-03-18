# Prueba Técnica de Front-end con Next.js + Next-Auth “El Santuario”

Este proyecto es una aplicación web desarrollada con [Next.js](https://nextjs.org), que permite a los usuarios gestionar su colección personal de criaturas mágicas. Los usuarios pueden registrarse, iniciar sesión y realizar operaciones CRUD en sus criaturas mágicas. Hay dos tipos de usuarios: Cuidadores y Maestros, cada uno con permisos específicos.

## Funcionalidades

### Tipos de Usuario
- **Cuidadores**:
  - Pueden crear, leer y actualizar criaturas mágicas.
  - No pueden eliminar criaturas.
  
- **Maestros de Criaturas**:
  - Tienen todos los permisos de cuidadores.
  - Pueden eliminar criaturas.

### Funcionalidades de la Aplicación

- **Autenticación de usuario**:
  - Implementación de autenticación usando [NextAuth](https://next-auth.js.org).
  - Los usuarios pueden registrarse como Cuidador o Maestro.
  - Redirección automática a la página correspondiente según el rol del usuario.

- **Gestión de Criaturas Mágicas**:
  - CRUD completo para las criaturas.
  - Cada criatura tiene los siguientes atributos:
    - Nombre
    - Tipo (Dragón, Fénix, Golem, Vampiro, Unicornio)
    - Nivel de poder
  - Los usuarios solo pueden gestionar sus propias criaturas.

- **Interfaz de Usuario**:
  - La aplicación utiliza SASS para los estilos.
  - Implementación de una página de inicio de sesión.
  - Implementación de una página de registro.
  - Página principal muestra una lista de criaturas mágicas después de iniciar sesión.
  - Formulario para crear y editar criaturas (disponible tanto para Maestros como para Cuidadores).
  - Opción para eliminar criaturas (solo para Maestros).

- **Sección Especial para Maestros**:
  - Los Maestros pueden ver información adicional, como el total de criaturas creadas.

- **Protección de Rutas**:
  - Rutas protegidas que solo permiten el acceso a usuarios autenticados.
  - Redirección automática a la página de inicio de sesión si un usuario intenta acceder a una página protegida sin estar autenticado.
  - Diferenciación de funcionalidades basadas en el tipo de usuario.

### Requisitos Técnicos
- **Next.js + TypeScript**
- **NextAuth**
- **SCSS**

### Aspectos que se valorarán de forma positiva
- Implementación de una aplicación web multilenguaje usando [i18n](https://nextjs.org/docs/advanced-features/i18n-routing).
- Arquitectura de estilos utilizada.
- Arquitectura del proyecto.
- Legibilidad y mantenibilidad del código.
- Definición correcta de variables y endpoints.
- Uso correcto de estados e información devuelta en las peticiones.
- Diseño.

## Diseño y Assets

Los archivos de diseño, junto con las imágenes necesarias, se encuentran en la carpeta `assets`. Los colores y tipografías utilizados son los siguientes:

### Colores
- **Primary**: `#9C5CE1`
- **Secondary**: `#C77E01`
- **Dark**: `#222222`
- **Light**: `#777777`

### Tipografías
- **Sedan SC**
- **Sedan**

## Getting Started

Para iniciar el servidor de desarrollo, ejecuta uno de los siguientes comandos:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
