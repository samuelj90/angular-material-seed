# About this Module

Core Module contains code that will be used to instantiate app and load core functionality.

## Module contents

The clearest and most important use of the CoreModule is the place to put your global/HTTP services.
The idea is to make sure only one instance of those services will be created across the entire app.
The CoreModule, by convention, is only included in your entire app once in AppModule

- Core
  - Components, directives
  - Pipes
  - Gaurds
  - Filters
  - Services. etc
