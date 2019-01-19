# WebApplication

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
Requires a previous build of all libraries (projects).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Styling Frameworks

[Angular Material](https://material.angular.io/guide/getting-started)
See [Docs](https://material.angular.io/components/categories)

Responsive and grid using Angular's [Flex Layout](https://github.com/angular/flex-layout)
See [Docs](https://github.com/angular/flex-layout/wiki/API-Documentation)

## Folder Structure

Guideline made by [Marthis Garberg](https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7)

## Generate Docs
Generate the documentation running `npm run compodoc`.
Documentation generated using [Compodoc](https://github.com/compodoc/gulp-compodoc)

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Styling
Without theming angular.json must contain the following property:
 "styles": [
    {
    "input": "node_modules/@angular/material/prebuilt-themes/indigo-pink.css"
    },
    "src/styles.scss"
]

## Manifest
Adapt App manifest and App icons (for PWA) [here](https://app-manifest.firebaseapp.com/)