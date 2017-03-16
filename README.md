# togg
Angular UI directive to end all UI directives. Toggle classes, attributes, properties. Live your toggle dreams.

## [Interactive Examples](https://ryanve.github.io/togg/)

## Attributes

- `togg-scope`: applicable scope
- `togg-event`: event(s) to listen to
- `togg-class`: classes to toggle when event occurs
- `togg-attr`: attribute to toggle when event occurs
- `togg-prop`: property to toggle when event occurs
- `togg-state`: force state `true` or `false` from event target
- `togg-trigger` additional events to trigger when event occurs
- `togg-method`: jQuery method to invoke when event occurs

## Setup

#### [npm](https://www.npmjs.com/package/togg)

```
npm install togg --save
```

#### Declare dependency on your app

```js
angular.module('yourApp', ['togg'])
```

## Related

[Also available as a Vue directive](https://github.com/ryanve/v-togg)
