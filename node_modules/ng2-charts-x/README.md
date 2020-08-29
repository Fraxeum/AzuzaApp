# ng2-charts-x [![npm version](https://badge.fury.io/js/ng2-charts-x.svg)](http://badge.fury.io/js/ng2-charts-x) [![npm downloads](https://img.shields.io/npm/dm/ng2-charts-x.svg)](https://npmjs.org/ng2-charts-x)
Beautiful charts for Angular2 based on Chart.js

[![NPM](https://nodei.co/npm/ng2-charts-x.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/ng2-charts-x)
[![NPM](https://nodei.co/npm-dl/ng2-charts-x.png?height=3&months=9)](https://npmjs.org/ng2-charts-x)

**This is a fork of ng2-charts from valor-software that fixes some bugs which were not addressed in the original for a long time.**

# Usage & Demo

Currently only the original demo that is using ng2-charts is available.

Sample in below website uses ng2-charts@1.1.0

[http://valor-software.github.io/ng2-charts/](http://valor-software.github.io/ng2-charts/)
[http://plnkr.co/edit/7fGsiuRjcF0M0Ffeoml2?p=preview](http://plnkr.co/edit/7fGsiuRjcF0M0Ffeoml2?p=preview)


- - -

### Installation (using angular-cli)

1. Install ***ng2-charts-x*** using npm

```bash
npm install ng2-charts-x --save
```

This also installs chart.js and moment.

2. Add to your *app.module.ts*

```typescript
import { ChartsModule } from 'ng2-charts-x';

// In your App's module:
imports: [
   ChartsModule
]
```

3. Enjoy
  
## API

### Chart types
There are one directive for all chart types: `base-chart`, and there are 6 types of charts: , `line`, `bar`, `radar`, `pie`, `polarArea`, `doughnut`.

### Properties

**Note**: For more information about possible options please refer to original [chart.js](http://www.chartjs.org/docs) documentation

- `data` (`Array<number[]> | number[]`) -  set of points of the chart, it should be `Array<number[]>` only for `line`, `bar` and `radar`, otherwise `number[]`;
- `datasets` (`Array<{data: Array<number[]> | number[], label: string}>`) - `data` see about, the `label` for the dataset which appears in the legend and tooltips
- `labels` (`?Array<any>`) - x axis labels. It's necessary for charts: `line`, `bar` and `radar`. And just labels (on hover) for charts: `polarArea`, `pie` and `doughnut`
- `chartType` (`?string`) - indicates the type of charts, it can be: `line`, `bar`, `radar`, `pie`, `polarArea`, `doughnut`
- `options` (`?any`) - chart options (as from [Chart.js documentation](http://www.chartjs.org/docs/))
- `colors` (`?Array<any>`) - data colors, will use default and|or random colors if not specified (see below)
- `legend`: (`?boolean=false`) - if true show legend below the chart, otherwise not be shown

### Events

- `chartClick`: fires when click on a chart has occurred, returns information regarding active points and labels
- `chartHover`: fires when mousemove (hover) on a chart has occurred, returns information regarding active points and labels


### Colors

There are a set several default colors. Colors can be replaced using the `colors` attribute. If there is more data than colors, colors are generated randomly.


## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/donothingloop/ng2-charts-x/issues) board to report bugs and feature requests
2. Please give a short description how to reproduce the error.

### License

The MIT License (see the [LICENSE](https://github.com/donothingloop/ng2-charts-x/blob/master/LICENSE) file for the full text)
