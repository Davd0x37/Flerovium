# TODO:

- Reorganize api directory
- Move model functionality from SFComponents to separate files
- Add electron support
- Add saving to/reading from file
- Cleanup components
- Fix all commented sections in code
- Add layouts
- Add welcome screen
- Add tests
- Add GitHub Actions
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

For now

Install lerna globally
```
npm install -g lerna
```

Install packages
```
lerna bootstrap
```

Build client and shared packages
```
npm run build:prod
```

## Run dev
Change directory to packages/client
```
npm run dev
```

Or if you prefer snowpack
```
npm run dev:snowpack
````

# Why no electron?

For now it's only ported to browser. Next version will have electron enabled.