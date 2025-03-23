#!/bin/bash

# Instalar dependencias de Tailwind CSS
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest tailwindcss-animate@latest

# Verificar la instalación
echo "Verificando instalación..."
npm list tailwindcss
npm list postcss
npm list autoprefixer
npm list tailwindcss-animate

echo "Instalación completada."

