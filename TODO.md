# Database

* Store content in database by type (slave, task, event) or by manifest?

# Import

* Improve Import wizard

* Service to import / store / load Slave manifests

# Framework

## Task Criteria

* Message for when flag is absent and needed, or present and restricted? (generic message that can be overridden per-task?)

* Criteria to show/hide task?

* Check for conditions beyond flags, e.g. value ranges?

    * How to supply value?  e.g. gold, stats, state

    * Message/Trigger for when condition is unmet?

    * Hide if condition is unmet?

* Task partners, and partner criteria?

## Task Schedule menus and execution

* Schedule-building

* City map?

## Events

* Events are random occurences and assigned slave tasks.

    * Morning
    * Evening
    * Pre-Task (e.g. travel)
    * Perform Task
    * Post-Task
    * (Maybe more?)

* Trigger that an event occurs, with a handler to choose what content to display based on the unique trigger key and additional conditions.

* Events chosen from a broad pool, combining multiple core and extension events.  e.g. An extension that adds events to the core "Take a Walk" task using the unique trigger key
