#!/bin/bash

# Desinstalar bcrypt e instalar bcryptjs
npm uninstall bcrypt
npm install bcryptjs
npm install --save-dev @types/bcryptjs

echo "Instalación completada. Ahora estás usando bcryptjs en lugar de bcrypt."

