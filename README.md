# ![vue-css-percentage-circle](progress-circle.gif)

Vue CSS Percentage Circle
==========================

## Getting Started

```
npm install --save vue-css-percentage-circle
```

### Usage

```
<PercentageCircle :percent="50" />
```


## API

### percentage-circle 

#### props 

- `percent` ***Number*** (*optional*) 

  Percentage of progress (0-100) 

- `size` ***String*** (*optional*) `default: 'small'` 

  Size of percentage circle [small, large, huge] 

- `active-color` ***String*** (*optional*) `default: 'blue'` 

  Color when active. 

- `complete-color` ***String*** (*optional*) `default: ''` 

  Color when complete. 

- `animate` ***Boolean*** (*optional*) `default: false` 

  Animate percentage changes. 

- `refresh-rate` ***Number*** (*optional*) `default: 5` 

  Only applicable when animated is set to true. Speed in which animation changes happen 

#### data 

- `innerPercent` 

**initial value:** `0` 

- `timeout` 

**initial value:** `null` 

#### computed properties 

- `complete` 

   **dependencies:** `innerPercent` 

#### events 

- `success` 

  Click event. 

#### methods 

- `setPercent()` 

- `clearTimeout()` 

- `stepTo()` 

- `onClick(event)` 
