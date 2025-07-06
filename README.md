# Rick & Morty Characters API (TypeScript)

## Descripción

API RESTful desarrollada en Node.js y TypeScript que permite buscar, filtrar y almacenar personajes de la serie Rick & Morty. La API integra datos desde la API pública de Rick & Morty, almacena los resultados en una base de datos local SQLite y optimiza las consultas mediante un sistema de caché en memoria.

## Tecnologías utilizadas

- Node.js (v18+)
- TypeScript
- Express
- SQLite (con Sequelize ORM)
- Axios para peticiones HTTP externas
- Jest y ts-jest para testing

## Estructura del proyecto

```
/src
  /controllers       # Se encarga de la comunicacion con el cliente
  /useCases          # Lógica de negocio de la API
  /routes            # Definición de rutas
  /middlewares       # Middlewares (logging, etc)
  /services          # Servicios externos y utilidades
  /db                # Modelos y configuración de la base de datos
  /tests             # Tests unitarios
  /types             # Tipos e interfaces TypeScript
```

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/homecu/backend-node-test-template.git
   cd backend-node-test-template
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Copia el archivo de configuración de entorno:

   ```bash
   cp .env.example .env
   ```

4. Inicia el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

## Comandos disponibles

- `npm run build` - Compila los archivos TypeScript a JavaScript
- `npm start` - Inicia el servidor en modo producción (requiere build previo)
- `npm run dev` - Inicia el servidor en modo desarrollo con recarga automática
- `npm test` - Ejecuta los tests unitarios

## Uso de la API

### Endpoint principal: `/characters`

Permite buscar personajes por nombre y filtrar por especie y género.

#### Parámetros de consulta

- `name` (obligatorio): Nombre del personaje a buscar.
- `species` (opcional): Filtrar por especie.
- `gender` (opcional): Filtrar por género.

#### Ejemplo de petición

```
GET /characters?name=rick&species=human&gender=male
```

#### Funcionamiento

1. Busca primero en la base de datos local.
2. Si no encuentra resultados, consulta la API pública y guarda los resultados localmente.
3. Utiliza un sistema de caché en memoria para optimizar consultas repetidas.
4. Devuelve los resultados en formato JSON.

#### Respuesta

La API retorna un array de personajes que coinciden con los criterios de búsqueda.

## Arquitectura y componentes

- **Controladores:** Gestionan la comunicación entre el cliente y la aplicación, delegan la lógica de negocio a los casos de uso y coordinan el uso del sistema de caché.
- **Casos de uso (Use Cases):** Contienen la lógica de negocio para la búsqueda, filtrado y almacenamiento de personajes.
- **Servicios:** Encapsulan la lógica de integración con la API pública y el sistema de caché.
- **Middlewares:** Incluyen un middleware de logging para registrar información relevante de cada petición.
- **Base de datos:** Persistencia local de personajes usando SQLite y Sequelize.

## Desarrollo

Para ejecutar el servidor en modo desarrollo con recarga automática:

```bash
npm run dev
```

Para ejecutar el servidor en modo producción:

```bash
npm start
```

## Testing

El proyecto incluye tests unitarios. Para ejecutarlos:

```bash
npm test
```
