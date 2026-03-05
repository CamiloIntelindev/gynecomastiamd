# GynecomastiadMD

Sitio médico especializado en ginecomastia construido con **Next.js 15** y **TypeScript**, consumiendo datos de la **API REST de WordPress**.

## 📋 Descripción

Este es un frontend moderno que consume el sitio WordPress de GynecomastiadMD a través de la API REST nativa de WordPress, permitiendo una experiencia de usuario rápida y dinámica servida desde Vercel.

## 🚀 Características

- ✅ **Next.js 15** con App Router
- ✅ **TypeScript** para mayor seguridad de tipos
- ✅ **WordPress REST API** integrada para consultas al backend
- ✅ **Autenticación Basic** para acceso a endpoints protegidos
- ✅ **Variables de entorno** seguras
- ✅ Listo para desplegar en **Vercel**

## 📦 Dependencias

- `next@latest` - Framework React
- `react@19` - Biblioteca UI
- `typescript` - Tipado estático
- `dotenv` - Variables de entorno

## 🔧 Configuración

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# WordPress REST API Endpoint
NEXT_PUBLIC_API_ENDPOINT=https://gynecomastiamd.com/wp-json/wp/v2

# Credenciales WordPress (si el endpoint requiere autenticación)
API_USERNAME=tu_usuario_wordpress
API_PASSWORD=tu_password_wordpress
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
│   ├── graphql.ts         # Cliente REST API de WordPress
│   └── queries.ts         # Endpoints y parámetros de la API
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

La página de inicio (`/`) incluye una prueba automática de conexión a WordPress REST API que:

1. Consulta los últimos 5 posts
2. Muestra el estado de conexión en tiempo real
3. Proporciona mensajes de error útiles si algo no funciona

Si ves los posts listados, entonces todo está funcionando correctamente.

## 🔒 Seguridad

- Las credenciales se envían con autenticación Basic desde el servidor
- En Vercel, configura estas variables en el dashboard del proyecto
- No versionees `.env.local` (ya está en `.gitignore`)

## 🚢 Despliegue en Vercel

1. Sube el proyecto a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa el repositorio
4. En la sección de "Environment Variables":
   - Agrega `NEXT_PUBLIC_API_ENDPOINT`
   - Agrega `API_USERNAME`
   - Agrega `API_PASSWORD`
5. Despliega

## 📚 Recursos Útiles

- [Documentación de Next.js 15](https://nextjs.org/docs)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [Endpoints REST API](https://developer.wordpress.org/rest-api/reference/)

## ❓ Endpoints Disponibles

Todos estos endpoints están disponibles en `https://tu-sitio.com/wp-json/wp/v2/`:

- `/posts` - Obtener todos los posts
- `/posts/{id}` - Obtener un post específico
- `/pages` - Obtener todas las páginas
- `/pages/{id}` - Obtener una página específica
- `/categories` - Obtener todas las categorías
- `/tags` - Obtener todos los tags

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
