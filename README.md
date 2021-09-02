# TODO:

- Fix all commented sections in code
- Add tests and fix web test runner
- Remove JSON Editor
- Add better error handling
- Add GitHub Actions
- Fix dynamic imports in electron
- Add traefik
- Fix docker builds
- Use keytar in electron
- Fix encryption. Don't store unencrypted data in localStorage
- Rewrite some components because they're ugly af
- Add generating forms based on store structure? (Add type in store schema and generate fields based on that schema). <br>
  Or make something like schema for selected components/modules and generate store types/store structure/forms based on that schema? <br>
  Example:

```json
{
  "name": "services",
  "fields": [
    {
      "name": "name",
      "type": "String",
      "pattern": "[a-zA-Z]+",
      "meta": {
        "color": {
          "type": "String",
          "value": "bg-brand"
        }
      }
    },
    {
      "name": "client_id",
      "type": "String",
      "pattern": "[a-zA-Z0-9]{12}",
      "meta": {
        "isImportant": {
          "type": "Boolean",
          "value": true
        }
      }
    }
  ]
}
```

Based on that schema, CLI tool will generate corresponding store types, getters etc. and forms.
Form will be saved in separate js/ts file and can be used to pass it to form component. Changes made in created form will be mirrored in store. <br>
In short: make schema, use tool (or something else, idk) to generate corresponding files, add form to component and pass form file to component, change value in form, changes will be saved in store.

## How to build?

Replace yarn from commands below if you want use other package manager

Install packages

```
yarn install
```

Build web client and electron

```
yarn run build
```

<!-- Using docker

```
./scripts/build.sh
``` -->

## Build dev

Run development version - web

```
yarn run dev
```

Run development version - electron

```
yarn run electron:dev
```

<!-- ## Run

Only web
Run from podman (if image was already been built)

```
./scripts/run.sh
```

Docker version

```
./scripts/run.sh docker
```

Otherwise

```
./scripts/build.sh
./scripts/run.sh
```

Docker version

```
./scripts/build.sh docker
./scripts/run.sh docker
``` -->
