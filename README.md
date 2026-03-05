# GynecomastiadMD

Sitio médico especializado en ginecomastia construido con **Next.js 15** y **TypeScript**, consumiendo datos de **WPGraphQL** (WordPress GraphQL endpoint).

## 📋 Descripción

Este es un frontend moderno que consume el sitio WordPress de GynecomastiadMD a través de WPGraphQL, permitiendo una experiencia de usuario rápida y dinámica servida desde Vercel.

## 🚀 Características

- ✅ **Next.js 15** con App Router
- ✅ **TypeScript** para mayor seguridad de tipos
- ✅ **WPGraphQL** integrado para consultas al backend WordPress
- ✅ **Autenticación Basic** para acceso a endpoints protegidos
- ✅ **Variables de entorno** seguras
- ✅ Listo para desplegar en **Vercel**

## 📦 Dependencias

- `next@latest` - Framework React
- `react@19` - Biblioteca UI
- `typescript` - Tipado estático
- `@apollo/client` - Cliente GraphQL
- `graphql` - Lenguaje de query
- `dotenv` - Variables de entorno

## 🔧 Configuración

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# WordPress GraphQL Endpoint
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://gynecomastiamd.com/graphql

# Credenciales WordPress (si el endpoint requiere autenticación)
GRAPHQL_USERNAME=tu_usuario_wordpress
GRAPHQL_PASSWORD=tu_password_wordpress
```

**Nota:** El `NEXT_PUBLIC_` hace la variable disponible en el navegador. Las credenciales sin este prefijo solo estarán disponibles en el servidor.

### 2. Estructura del Proyecto

```
gynecomastiamd/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página de inicio
├── components/            # Componentes React reutilizables
├── lib/
│   ├── graphql.ts         # Cliente GraphQL
│   └── queries.ts         # Queries GraphQL
├── .env.local             # Variables de entorno (no versionado)
├── next.config.ts         # Configuración de Next.js
├── tsconfig.json          # Configuración de TypeScript
└── package.json           # Dependencias y scripts
```

## 📝 Scripts Disponibles

```bash
# Desarrollo (http://localhost:3000)
npm run dev

# Construir para producción
npm run build

# Iniciar servidor de producción
npm start

# Linter
npm run lint
```

## 🧪 Prueba de Conexión

La página de inicio (`/`) incluye una prueba automática de conexión a WPGraphQL que:

1. Consulta la información del sitio (`GET_SITE_INFO`)
2. Muestra el estado de conexión en tiempo real
3. Proporciona mensajes de error útiles si algo no funciona

Si ves el mensaje "✅ Conexión exitosa con WPGraphQL", entonces todo está funcionando correctamente.

## 🔒 Seguridad

- Las credenciales se envían con autenticación Basic y deben estar en variables de entorno
- En Vercel, configura estas variables en el dashboard del proyecto
- No versionees `.env.local` (ya está en `.gitignore`)

## 🚢 Despliegue en Vercel

1. Sube el proyecto a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa el repositorio
4. En la sección de "Environment Variables":
   - Agrega `NEXT_PUBLIC_GRAPHQL_ENDPOINT`
   - Agrega `GRAPHQL_USERNAME` (si es requerido)
   - Agrega `GRAPHQL_PASSWORD` (si es requerido)
5. Despliega

## 📚 Recursos Útiles

- [Documentación de Next.js 15](https://nextjs.org/docs)
- [Documentación de WPGraphQL](https://www.wpgraphql.com/)
- [Apollo Client](https://www.apollographql.com/docs/react/)

## ❓ Próximas Tareas

- [ ] Crear componentes para mostrar posts
- [ ] Implementar sistema de páginas
- [ ] Crear rutas dinámicas para posts individuales
- [ ] Agregar búsqueda
- [ ] Implementar paginación
- [ ] Agregar estilos (Tailwind CSS)
- [ ] Optimizar imágenes desde WordPress

## 📄 Licencia

ISC

---

**Autor:** Camilo Contreras  
**Fecha de creación:** Marzo 2026
