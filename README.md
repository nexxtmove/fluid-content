# fluid-content

📏 React/Vue component to auto scale content proportionally based on the parent width.

## Install

```bash
npm install fluid-content
```

## React

[React demo](https://stackblitz.com/edit/fluid-content-react?file=src%2FApp.jsx)

```jsx
import { Fluid } from 'fluid-content/react'

<Fluid base={1000}>
  ...
</Fluid>
```

## Vue

[Vue demo](https://stackblitz.com/edit/fluid-content-vue?file=src%2FApp.vue)

```js
import { Fluid } from 'fluid-content/vue'

<Fluid :base="1000">
  ...
</Fluid>
```

## Breakpoints

You can provide an array of `base` values to create responsive breakpoints:

```jsx
import { Fluid } from 'fluid-content/react'

<Fluid base={[400, 800, 1200]}>
  ...
</Fluid>
```

> The first value takes precedence. So in this case if the parent element is 600px wide, the content will scale using `base = 400`. You can flip this behavior by putting the values from high to low (`[1200, 800, 400]`).

You can also pass `Infinity` to indicate that the content shouldn't scale after a given breakpoint:

```jsx
import { Fluid } from 'fluid-content/react'

// Only scale below a parent width of 1200px
<Fluid base={[1200, Infinity]}>
  ...
</Fluid>
```
