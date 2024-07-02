# Dev Workflow

This repo is setup as a mono repo. 
Source: https://earthly.dev/blog/setup-typescript-monorepo/ and https://earthly.dev/blog/setup-typescript-monorepo/

This means that it has different apps which share common package dependencies.

## How to create a package
1. Create a folder for you package under /packages/<package_name>
2. Create a package.json with the following contents
```
    {
        "name": "@bdat/<package_name>",
        "version": "1.0.0",
        "description": "<Package description>",
        "main": "./build/index.js",
        "type": "commonjs",
        "scripts": {
            "build": "tsc --build"
        },
        "dependencies": {}
    }
```
3. Add a tsconfig.json file with the following contents
```
    {
        "compilerOptions": {
            "target": "ESNext",
            "module": "commonjs",
            "moduleResolution": "node",
            "declaration": true,
            // "strict": true,
            "incremental": true,
            "esModuleInterop": true,
            "skipLibCheck": true,
            "forceConsistentCasingInFileNames": true,
            "rootDir": "./src",
            "outDir": "./build",
            "composite": true
        }
    }
```
4. Add your code under /packages/<package_name>/src
5. npm init --scope @bdat --workspace ./packages/<package_name> -y
6. Add the package to an existing package by running `npm install @bdat/<package_name> --workspace ./packages/<other_package_name>` at the root directory
7. Add the package to an existing app by running `npm install @bdat/<package_name> --workspace ./apps/<app_name>`  at the root directory
8. Make sure to recompile the package by using step 5 anytime changes are made to it

## How to create an app
1. Create a folder for you package under /apps/<app_name>
2. Create a package.json with the following contents
```
    {
        "name": "<app_name>",
        "version": "1.0.0",
        "description": "<app_description>",
        "main": "build/index.js",
        "scripts": {
            "build": "tsc --build"
        },
        "dependencies": {}
    }

```
3. Add a tsconfig.json file with the following contents
```
    {
        "compilerOptions": {
            "incremental": true,
            "target": "ESNext",
            "module": "commonjs",
            "declaration": true,
            "strict": true,
            "moduleResolution": "node",
            "esModuleInterop": true,
            "skipLibCheck": true,
            "forceConsistentCasingInFileNames": true,
            "rootDir": "./src",
            "outDir": "./build"
        },
        "files": []
    }
```
4. Add your code under /apps/<app_name>/src
5. Add any refernces to packages in the tsconfig.json file
```
    "references": [
            {
                "path": "../../packages/<package_name1>"
            },
            {
                "path": "../../packages/<package_name2>"
            },
            etc...
        ]
```
7. npm init --scope --workspace ./apps/<app_name> -y
8. Install any packages to the app by running `npm install @bdat/<package_name> --workspace ./app/<app_name>` at the root directory

## Gotchas
- Only things exported in index.ts for a package will be accessible by others apps or packages
- You may need to restart the type script server via CRTL + SHIFT + P command if an import doesn't quite work right. 
    - This usually occurs after you install a new package
    - When you make a change to the tsconfig.json
- Your code will not be accessible unless the top level package.json has the folder list under workspaces
    ```
    "workspaces": [
        "packages/*",
        "apps/*"
    ],
    ```
- Install top level packages using npm install


## WTF is this
- package.json has a a "types" property which defines where the typescript compiler should go looking for types. If this doesn't reference a real folder then the compiler will complain. Moreover, if it doesn't reference the src folder then webpack will complain.
- tsconfig.json has a "references" property which is used to allow importing if a local npm package is not linked
- npm allows for local packages to be linked via `npm install @bdat/<package_name> --workspace ./packages/<other_package_name>`. This is all that needs to be done in order for everything to work correctly
- webpack has a setting called "alias". This setting allows you to specificy an alias just like you would in typescript `alias: {"@bdat/core": path.resolve(__dirname, "packages/core/src")}`. You can either use it or you can specifify the alias in typescript tsconfig.json file 