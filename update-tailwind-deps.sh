#!/bin/bash

# Desinstalar versiones anteriores
npm uninstall tailwindcss postcss autoprefixer @tailwindcss/postcss

# Instalar versiones compatibles
npm install -D tailwindcss@3.3.0 postcss@8.4.23 autoprefixer@10.4.14

# Verificar la instalación
echo "Verificando instalación..."
npm list tailwindcss
npm list postcss
npm list autoprefixer

echo "Instalación completada."

