```markdown
# EcoTienda - Frontend

EcoTienda es una tienda de ropa de segunda mano que promueve el consumo responsable y sostenible. Este proyecto se centra en la parte del **frontend**, proporcionando una interfaz de usuario moderna y amigable para que los clientes compren ropa de segunda mano mientras ganan puntos y recompensas mediante el uso de un sistema basado en blockchain.

## Descripción

EcoTienda es una tienda en línea que utiliza un sistema de recompensas innovador. Al comprar ropa de segunda mano, los usuarios acumulan puntos que pueden canjear en futuras compras. Los puntos son rastreados a través de un token llamado **ECO** en la blockchain, lo que ayuda a fidelizar y premiar a los clientes a lo largo del tiempo.

### Características principales

- **Navegación fluida** entre las páginas del sitio, como la tienda, el perfil del usuario y la página de contacto.
- **Interfaz moderna** construida con **React**, **TypeScript** y **Tailwind CSS**.
- Integración con el sistema de **recompensas ECO**, donde los usuarios acumulan puntos y tokens con cada compra.
- **Formulario de contacto** para consultas generales.
- **Adaptación móvil** gracias a la flexibilidad de Tailwind CSS.

## Estructura del Proyecto

```plaintext
.
├── eslint.config.js            # Configuración de ESLint para el análisis estático de código
├── index.html                  # Página HTML principal
├── package-lock.json           # Archivo de bloqueo de dependencias
├── package.json                # Archivo de configuración de dependencias
├── postcss.config.js           # Configuración de PostCSS para procesamiento de CSS
├── src
│   ├── App.tsx                 # Componente principal de la aplicación
│   ├── components              # Carpeta para componentes reutilizables
│   ├── context                 # Carpeta para manejo de estado global (si es necesario)
│   ├── data                    # Carpeta para datos estáticos o mock
│   ├── index.css               # Estilos globales
│   ├── main.tsx                # Punto de entrada de la aplicación
│   ├── pages                   # Carpeta con las páginas principales del sitio
│   ├── types                   # Tipos de TypeScript
│   └── vite-env.d.ts           # Configuración de Vite para el entorno de desarrollo
├── tailwind.config.js          # Configuración de Tailwind CSS
├── tsconfig.app.json           # Configuración de TypeScript para la aplicación
├── tsconfig.json               # Configuración general de TypeScript
├── tsconfig.node.json          # Configuración de TypeScript para Node
└── vite.config.ts              # Configuración de Vite para el bundling y desarrollo
```

## Instalación

Para comenzar a trabajar con el proyecto, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/AndresChanchi/DemoFrontendEcoTienda.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd DemoFrontendEcoTienda
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

   La aplicación estará corriendo en local, asi que copia el link que te proporciona vite

## Tecnología Utilizada

- **React**: Para la construcción de la interfaz de usuario.
- **TypeScript**: Para el tipado estático de JavaScript.
- **Tailwind CSS**: Para el diseño y la personalización rápida de la UI.
- **Vite**: Como bundler para un desarrollo más rápido.
- **ESLint**: Para mantener el código limpio y consistente.

## Contribución

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu cambio (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit con mensajes descriptivos.
4. Sube tus cambios a tu repositorio (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request en este repositorio para revisión.

## Licencia

Este proyecto está bajo la **MIT License**. Consulta el archivo `LICENSE` para más detalles.
