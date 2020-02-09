# Slave Maker 4

This project is to create a framework/platform for running community-created Slave Maker content.

For more info, see https://www.futanaripalace.com/forumdisplay.php?215-Slave-Maker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

## Design Principles

### Browser and offline support

This was created as a Progressive Web App (PWA) so that it can easily run in-browser or installed on most systems as an application accessible offline.

### Extensions

Most content will be provided with extensions.  Extensions are chosen from a `manifest` JSON file, and imported into local storage (Indexed DB using `database.service`).

Extenions can be:

* Avatar set - collection of images used for the slave maker / player character

* Slave - primary content driver, focusing on the slave training of a specific character
    * Images
    * Attributes
    * Intro
    * Ending
    * Stats
    * Tasks
    * Events

* Other Content - appending to or modifying core or slave content
    * Images
    * Stats
    * Tasks
    * Events

(See [Guidelines](GUILDELINES.md) for Fickle Zed's thoughts/recommendations on authoring an extension.)

### UI / UX

UX is following [Material Design](https://material.io/) principles and using [Angular Material](https://material.angular.io/) components.

### Game State

The game state is managed in NGRX Store.  Game state should only include the minimum data to create a save - e.g. route, player stats, owned slave stats, and global flags. It should not include images nor descriptive text.

Game state is saved and loaded using the `SavesService`.

(TODO: Read images and content from Indexed DB, or stage in `sessionStorage` on slave selection / on load for faster/easier access?)

## Development

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
