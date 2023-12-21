const setEnv = () => {
    const fs = require('fs');
    const writeFile = fs.writeFile;
    // Configure Angular `environment.ts` file path
    const targetPath = './src/environments/environment.ts';
    // Load node modules
    const colors = require('colors');
    const appVersion = require('../../package.json').version;
    require('dotenv').config({
      path: 'src/environments/.env'
    });
    // `environment.ts` file structure
    const envConfigFile = `export const environment = {
        KEYCLOAK_URL: '${process.env['KEYCLOAK_URL']}',
        KEYCLOAK_REALM: '${process.env['KEYCLOAK_REALM']}',
        KEYCLOAK_CLIENT_ID: '${process.env['KEYCLOAK_CLIENT_ID']}',
        KEYCLOAK_REDIRECT_URI: '${process.env['KEYCLOAK_REDIRECT_URI']}',
        appVersion: '${appVersion}',
        production: ${process.env['PRODUCTION']},
    };`;
    console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
    writeFile(targetPath, envConfigFile, (err: any) => {
      if (err) {
        console.error(err);
        throw err;
      } else {
        console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
      }
    });
  };
  
  setEnv();
  