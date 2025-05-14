Prueba se servidor creado con Node.js y Express

se inicia con "npm init -y"
se agrega esto para definir el comando para ejecutar un archivo 
al iniciar el programa:
    "start":"node index.js",
en el archivo index se define la estructura del servidor

EXPRESS:
    Express ayuda a la creación del servidor, este viene implementado en
        Nodejs, para esto se instala con "npm install express", y se agrega
        esto en package:
                                    {
                    // ...
                    "dependencies": {
                        "express": "^4.18.2"
                    }
                    }
        con esto ahor apara crear el servidor se  puede hacer implementado
            "const express = require('express')"

        

