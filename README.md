# ES6 Generators Visualized

## Walkthrough JSON format

```
{
  "panes": [ /* ... array of panes */
    {
      "name": "pane name",
      "lines": [ /* array of lines */
        [
          "line 1", /* line string */
          "i", /* optional name of variable to inspect */
          false /* whether line is a breakpoint or not */
        ],
        [ "line 2" ],
        [ "line 3", "j", true ]
      ]
    }
  ],

  "vars": { /* properties defining variables */
    "i": null,
    "j": null,
    "k": null
  },

  "steps": [ /* array of steps */
    [
      0, /* active pane index */
      0, /* active line index */
      {}, /* updated variable values */
      "=.+" /* regex of line to highlight */
    ]
  ]
}
```
