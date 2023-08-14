
# Scripts disponibles

En el root del proyecto se puedes ejecutar los siguientes scripts:

### `npx react-native run-android`

Ejecuta la aplicación en android
Se abre en el dispositivo que tenga disponible (emulador o dispositivo físico)

### `npm install`

Instala las dependencias del proyecto

### `./gradlew assembleDebug`

Despliegue del proyecto:

    -Añadir en la dependencia de /node-modules/react-native el fichero react.gradle con el contenido para aceptar la iconografía

codigo añadido en el fichero react.gradle, en la función def currentBundleTask:
	doLast {
                def moveFunc = { resSuffix ->
                    File originalDir = file("$buildDir/generated/res/react/release/drawable-${resSuffix}");
                    if (originalDir.exists()) {
                        File destDir = file("$buildDir/../src/main/res/drawable-${resSuffix}");
                        ant.move(file: originalDir, tofile: destDir);
                    }
                }
                moveFunc.curry("ldpi").call()
                moveFunc.curry("mdpi").call()
                moveFunc.curry("hdpi").call()
                moveFunc.curry("xhdpi").call()
                moveFunc.curry("xxhdpi").call()
                moveFunc.curry("xxxhdpi").call()
            }

-Borrar la carpeta .gradle de /android

-Lanzar en el root del proyecto
	react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

-Lanzar en la carpeta android para generar el apk
	./gradlew assembleDebug


# Estructura del proyecto

|- src
    |- components
        |- commons

        |- features

    |- context

    |- hooks

    |- screens
    |- redux
    |- slices

    |- services

    store

|- types

|- utils

### Redux
Carpeta para el manejo del estado global con redux y los servicios de llamada a Api mediante
el uso de Rtk Query.

### Types
Incluye algunos tipos de objetos a destacar, beneficiándose del uso de typescript para defininir interfaces.

### Utils
Utilidades que no estén relacionadas con el contenido del proyecto.

## View

### Components
Incluirá los componentes comunes y específicos a toda la aplicación y se puede divir entre:
    -Commons estarán aquellos componentes reutilizables a lo largo del proyecto.

    -Features estarán los distintos módulos de funcionalidades del proyecto como puede ser el de autenticación, el mapa o planificación.

### Context
Elmentos de contexto global a toda la aplicación, como es la carga inicial de iconos y marcadores.

### Screens
Todas las pantallas visuales que componen la app.

# Sonarqube

### Despligue
En windows lanzar los siguientes comandos:

    - wsl -d docker-desktop (en el powershell)
    - sysctl -w vm.max_map_count=262144 (en el powershell)
    - docker-compose up

### Lanzar analisis

Lanzar en el terminal el comando npm run sonar

Abrir http://localhost:9000/ para visualizar la información acerca del analisis.
