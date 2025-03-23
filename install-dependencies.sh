#!/bin/bash

# Eliminar node_modules y lock files
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

# Instalar dependencias
echo "Instalando dependencias..."
npm install

# Instalar lucide-react específicamente
echo "Instalando lucide-react..."
npm install lucide-react@latest --save

# Verificar la instalación
echo "Verificando instalación..."
npm list lucide-react

echo "Instalación completada."

