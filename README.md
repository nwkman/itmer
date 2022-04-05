# itmer
## Why this name?
Try type "timer" quickly on your keyboard. Plus, this could be an interesting name of a project which is going to take part in a competition.
## How to configure?
Users may configure their errands by editing `errands.json` in the same directory as `app.html`.
An entry of errand may have the following properties:
### `title` (`string`)
The title of the errand. A `title` property must be defined for every errand entry.
### `on` (`string`)
The specific date of the errand in a form that can be parsed by Javascript such as `Jan 28, 2022`. An `on` property is required for every errand entry.
### `every` (`string`)
A value in the following format: `*year` (where * could be replaced with an integer, such as `1year`),
`*month`, `*day`, `*hour`, `*minute`, `*second`. Must come with an `on` tag to define the start of the timing. Such as
```json
{
    "title": "My Birthday",
    "on": "January 28, 2006",
    "every": "1year"
}
```
will define an errand `My birthday` which first happened on January 28, 2006 and repeats every year.
