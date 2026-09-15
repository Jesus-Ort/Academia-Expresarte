# 🎵 Academia Expresarte

> Sistema web para la gestión administrativa y académica de una academia de música.

**Academia Expresarte** es una aplicación web full-stack desarrollada para centralizar y facilitar la gestión de estudiantes, representantes, profesores, materias, horarios e inscripciones dentro de una academia de música.

El proyecto fue diseñado con una arquitectura desacoplada entre frontend y backend, incorporando autenticación, control de acceso basado en roles y una API REST para la comunicación entre las diferentes capas del sistema.

## 🌐 Demo

**Aplicación:**
https://academia-expresarte.vercel.app

## 📌 Características

* 🔐 Autenticación y gestión de usuarios.
* 👥 Gestión de representantes.
* 🎓 Gestión de estudiantes.
* 👨‍🏫 Gestión de profesores.
* 📚 Gestión de materias.
* 🗓️ Gestión de horarios.
* 📝 Gestión de inscripciones.
* 👤 Sistema de roles y permisos.
* 🔗 Relación entre estudiantes y representantes.
* ♻️ Eliminación lógica de registros.
* 📊 Arquitectura preparada para ampliar los módulos administrativos.
* 📱 Interfaz web responsive.
* 🔌 API REST para la comunicación con el frontend.
* 🗄️ Persistencia de datos mediante PostgreSQL/Supabase.

## 🏗️ Arquitectura

El proyecto utiliza una arquitectura cliente-servidor separando la aplicación en dos componentes principales:

```text
                    ┌──────────────────────┐
                    │       Usuario        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Frontend       │
                    │   Nuxt + Nuxt UI     │
                    └──────────┬───────────┘
                               │
                         HTTP / REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Backend        │
                    │ Express + Supabase   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      PostgreSQL      │
                    │       Supabase       │
                    └──────────────────────┘
```

### Frontend

El frontend está construido con **Nuxt** y **Nuxt UI**, proporcionando una interfaz moderna y componentes reutilizables para los diferentes módulos administrativos.

### Backend

El backend utiliza **Node.js + Express** y funciona como una capa intermedia entre el cliente y la base de datos.

Esta separación permite mantener las responsabilidades claramente definidas y facilita el mantenimiento y crecimiento de la aplicación.

### Base de datos

La persistencia utiliza **PostgreSQL mediante Supabase**, aprovechando sus capacidades de base de datos, autenticación y políticas de seguridad.

## 🛠️ Stack tecnológico

| Capa                 | Tecnologías           |
| -------------------- | --------------------- |
| Frontend             | Nuxt, Vue.js, Nuxt UI |
| Backend              | Node.js, Express.js   |
| Base de datos        | PostgreSQL            |
| Plataforma de datos  | Supabase              |
| Autenticación        | Supabase Auth         |
| API                  | REST                  |
| Estilos / UI         | Nuxt UI               |
| Control de versiones | Git + GitHub          |
| Frontend deployment  | Vercel                |

## 📂 Estructura del proyecto

```
Academia-Expresarte/
├── Backend/                  # API REST (Node.js + Express)
│   └── src/
│       ├── config/           # Configuración (Supabase)
│       ├── controller/       # Controladores de cada recurso
│       ├── middlewares/      # Middlewares (verificación de token)
│       ├── routes/           # Definición de rutas
│       ├── utils/            # Utilidades
│       └── app.js            # Punto de entrada
│
└── Frontend/                 # Nuxt 3 (Vue 3 + TypeScript)
    ├── app/
    │   ├── assets/           # Estilos globales
    │   ├── components/       # Componentes reutilizables (Base/, modales, CRUD)
    │   ├── composables/      # Lógica reactiva (useApi, useAuth, etc.)
    │   ├── crud/             # Definiciones de recursos CRUD
    │   ├── layouts/          # Layouts de la aplicación
    │   ├── middlewares/      # Guardas de navegación (auth, guest)
    │   ├── pages/            # Vistas/rutas (login, students, teachers, etc.)
    │   ├── types/            # Tipos de TypeScript
    │   └── app.vue           # Componente raíz
    ├── public/               # Archivos estáticos e iconos
    ├── nuxt.config.ts
    ├── pnpm-workspace.yaml
    └── tsconfig.json
```

La separación permite desarrollar y desplegar independientemente la interfaz de usuario y la API.

## 👥 Roles del sistema

El sistema contempla diferentes niveles de acceso para adaptar las funcionalidades disponibles según el tipo de usuario.

### Administrador

Permite administrar los principales recursos de la academia:

* Estudiantes
* Representantes
* Profesores
* Materias
* Horarios
* Inscripciones
* Usuarios

### Representante

Permite gestionar la información relacionada con los estudiantes asociados al representante.

La arquitectura está preparada para continuar ampliando las capacidades específicas de cada rol.

## 🗄️ Modelo de datos

Entre las principales entidades contempladas por el sistema se encuentran:

```text
Profiles
   │
   ├───────────────┐
   │               │
   ▼               ▼
Students      Representatives
   │               │
   └───────┬───────┘
           │
           ▼
 Student Representatives

Teachers
   │
   ▼
Teacher Subjects
   │
   ▼
Subjects

Students
   │
   ▼
Enrollments
   │
   ▼
Schedules
```

El modelo utiliza relaciones entre entidades para evitar duplicación de información y mantener la integridad de los datos.

## 🔐 Seguridad

La aplicación utiliza autenticación y autorización para controlar el acceso a los recursos del sistema.

Entre los mecanismos considerados se encuentran:

* Autenticación mediante Supabase Auth.
* Control de acceso basado en roles.
* Protección de recursos mediante backend.
* Políticas de seguridad de PostgreSQL/Supabase.
* Eliminación lógica de registros.
* Validación de relaciones entre entidades.

La arquitectura evita que el frontend tenga responsabilidad directa sobre operaciones sensibles de la base de datos.

## ♻️ Eliminación lógica

Los registros importantes utilizan un mecanismo de **soft delete** en lugar de eliminar físicamente los datos.

Esto permite conservar información histórica y evitar problemas derivados de la eliminación de registros relacionados.

Conceptualmente:

```text
is_active = true
     │
     │ eliminar
     ▼
is_active = false
deleted_at = fecha
```

Esto también permite recuperar registros o implementar auditorías posteriormente.

## 🧩 Arquitectura del frontend

El frontend busca mantener componentes y lógica reutilizables.

Entre los patrones utilizados se encuentran:

* Componentes reutilizables.
* Tablas genéricas.
* Formularios reutilizables.
* Manejo centralizado de relaciones.
* Modales para operaciones CRUD.
* Separación entre presentación y lógica.
* Layouts y navegación basados en autenticación.

El objetivo es evitar implementar el mismo comportamiento repetidamente para cada módulo.

## 🔌 API

El backend expone una API REST utilizada por el frontend para realizar las operaciones sobre los diferentes recursos.

De forma conceptual:

```text
Frontend
   │
   │ HTTP Request
   ▼
Express API
   │
   ├── Authentication
   ├── Authorization
   ├── Validation
   └── Business Logic
            │
            ▼
        Supabase
            │
            ▼
        PostgreSQL
```

Esto permite mantener al frontend desacoplado de la implementación interna de la base de datos.

## 🚀 Instalación

### Requisitos

Antes de ejecutar el proyecto localmente necesitas:

* Node.js
* npm
* Git
* Una cuenta/proyecto de Supabase

### Clonar el repositorio

```bash
git clone https://github.com/Jesus-Ort/Academia-Expresarte.git

cd Academia-Expresarte
```

## 💻 Frontend

```bash
cd Frontend
npm install
```

Configura las variables de entorno necesarias para el frontend y posteriormente ejecuta:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:3000
```

## ⚙️ Backend

Desde la carpeta del backend:

```bash
cd Backend
npm install
```

Configura las variables de entorno necesarias para conectar el servidor con Supabase.

Posteriormente:

```bash
npm run dev
```

> Los comandos exactos pueden variar según la configuración actual de los respectivos `package.json`.

## 🔑 Variables de entorno

Las credenciales y configuraciones sensibles deben mantenerse fuera del repositorio mediante variables de entorno.

Ejemplo conceptual:

```env
SUPABASE_URL=
SUPABASE_KEY=

API_URL=
```

**No debes subir archivos `.env` con credenciales reales a GitHub.**

## 🌍 Deployment

El frontend está desplegado en **Vercel** y el backend en **Render**.

```text
                    Internet
                       │
                       ▼
              ┌─────────────────┐
              │     Vercel      │
              │    Frontend     │
              └────────┬────────┘
                       │
                       │ REST API
                       ▼
              ┌─────────────────┐
              │     Render     │
              │ Node + Express  │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │    Supabase     │
              │ PostgreSQL/Auth │
              └─────────────────┘
```

## 🎯 Objetivos del proyecto

El proyecto busca resolver problemas habituales de gestión dentro de una academia de música:

* Reducir la dependencia de hojas de cálculo.
* Centralizar la información académica.
* Facilitar la administración de estudiantes.
* Mantener relaciones entre representantes y estudiantes.
* Organizar profesores, materias y horarios.
* Controlar las inscripciones.
* Aplicar diferentes permisos según el usuario.
* Proporcionar una base tecnológica escalable para futuras funcionalidades.

## 📈 Próximas mejoras

Algunas funcionalidades que pueden incorporarse progresivamente:

* [ ] Dashboard administrativo con estadísticas.
* [ ] Sistema de asistencia.
* [ ] Gestión de pagos y mensualidades.
* [ ] Notificaciones.
* [ ] Reportes administrativos.
* [ ] Exportación de información a PDF/Excel.
* [ ] Calendario interactivo.
* [ ] Historial académico del estudiante.
* [ ] Sistema de evaluaciones.
* [ ] Recuperación de contraseña desde la aplicación.
* [ ] Tests automatizados.
* [ ] Documentación completa de la API mediante OpenAPI/Swagger.
* [ ] CI/CD.

## 📚 Aprendizajes

Este proyecto permitió trabajar con diferentes aspectos del desarrollo de aplicaciones web modernas:

* Diseño de APIs REST.
* Arquitectura frontend/backend.
* Desarrollo de aplicaciones con Nuxt.
* Desarrollo de servidores con Express.
* Autenticación y autorización.
* Modelado relacional de bases de datos.
* PostgreSQL y Supabase.
* Row Level Security.
* Relaciones entre entidades.
* Operaciones CRUD.
* Componentización y reutilización.
* Variables de entorno.
* Deployment de aplicaciones web.
* Control de versiones con Git.

## 👨‍💻 Autor

**Jesús Ortega**

Ingeniero Informático orientado al desarrollo de aplicaciones web y sistemas full-stack.

* GitHub: https://github.com/Jesus-Ort
* Proyecto: https://github.com/Jesus-Ort/Academia-Expresarte

## 📄 Licencia

Este proyecto se encuentra destinado principalmente a fines educativos, demostrativos y de portafolio.

Consulta el repositorio para conocer los términos de uso aplicables.
