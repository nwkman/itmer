# itmer
## Used open-source projects
[jQuery-Textfill](https://github.com/jquery-textfill/jquery-textfill), licensed under MIT License.
## Why this name?
Try type "timer" quickly on your keyboard. Plus, this could be an interesting name of a project which is going to take part in a competition.
## How to configure?
Users may configure their errands by editing `errands.json` in the same directory as `app.html`.
An entry of errand may have the following properties:
### `title` (`string`)
The title of the errand. A `title` property must be defined for every errand entry.
### `on` (`string`)
The specific date of the errand in a form that can be parsed by Javascript such as `Jan 28, 2022`. An `on` property is required for every errand entry.
### `period` (`integer`)
To make the `period` property work, an `on` property must be defined for this errand entry. This property is measured in days.
The following example
```json
{
    "title": "Class over",
    "on": "April 6, 2022",
    "period": 7
}
```
will define an errand `Class over` which firstly starts on April 6, 2022 and repeats every 7 days.

Users may also configure the quotes to be displayed in the file `quotes.json`. A `quote` entry has and only has **ONE** property: `text`.
The following example
```json
{
    "text": "A quick brown fox jumps over the lazy dog."
}
```
will define a quote `A quick brown fox jumps over the lazy dog.`
p.s. You may use math expressions here since KaTeX is enabled by default.
