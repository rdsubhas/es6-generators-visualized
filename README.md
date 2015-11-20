# ES6 Generators Visualized

## Walkthrough JSON format

```
{
  "panes": [
    {
      "name": "pane name",
      "lines": [
        "line 1 ${variable_substitution}",
        "line 2 ${variable_substitution}",
        /* array of lines with optional variables */
      ],
      "stars": [
        1
        /* array of line numbers which need to be starred */
      ]
    },
    /* array of panes */
  ],

  "vars": {
    "i": null,
    "j": null,
    "k": null,
    /* properties defining variables */
  },

  "steps": [
    [
      0 /* active pane index */,
      0 /* active line index */,
      {} /* updated variable values */,
      "=.+" /* regex of line to highlight */
    ],
    /* array of steps */
  ]
}
```
