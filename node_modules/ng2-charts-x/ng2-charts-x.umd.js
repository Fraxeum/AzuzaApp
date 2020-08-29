(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('chart.js'), require('moment')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'chart.js', 'moment'], factory) :
	(factory((global['ng2-charts-x'] = {}),global['@angular/core'],global.chart.js));
}(this, (function (exports,_angular_core,Chart) { 'use strict';

Chart = Chart && Chart.hasOwnProperty('default') ? Chart['default'] : Chart;

var BaseChartDirective = (function () {
    /**
     * @param {?} element
     */
    function BaseChartDirective(element) {
        this.labels = [];
        this.options = {};
        this.chartClick = new _angular_core.EventEmitter();
        this.chartHover = new _angular_core.EventEmitter();
        this.initFlag = false;
        this.element = element;
    }
    /**
     * @return {?}
     */
    BaseChartDirective.prototype.ngOnInit = function () {
        this.ctx = this.element.nativeElement.getContext('2d');
        this.cvs = this.element.nativeElement;
        this.initFlag = true;
        if (this.data || this.datasets) {
            this.refresh();
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    BaseChartDirective.prototype.ngOnChanges = function (changes) {
        if (this.initFlag) {
            // Check if the changes are in the data or datasets
            if (changes.hasOwnProperty('data') || changes.hasOwnProperty('datasets')) {
                if (changes.hasOwnProperty('labels')
                    || changes.hasOwnProperty('options')
                    || changes.hasOwnProperty('chartType')
                    || changes.hasOwnProperty('colors')
                    || changes.hasOwnProperty('legend')) {
                    this.refresh();
                    return;
                }
                if (changes['data']) {
                    // check if the number of series has changed
                    if (changes['data'].currentValue.length
                        !== changes['data'].previousValue.length) {
                        this.refresh();
                        return;
                    }
                    this.updateChartData(changes['data'].currentValue);
                }
                else {
                    // check if the number of series has changed
                    if (changes['datasets'].currentValue.length
                        !== changes['datasets'].previousValue.length) {
                        this.refresh();
                        return;
                    }
                    this.updateChartData(changes['datasets'].currentValue);
                }
                this.chart.update();
            }
            else {
                // otherwise rebuild the chart
                this.refresh();
            }
        }
    };
    /**
     * @return {?}
     */
    BaseChartDirective.prototype.ngOnDestroy = function () {
        if (this.chart) {
            this.chart.destroy();
            this.chart = void 0;
        }
    };
    /**
     * @param {?} ctx
     * @return {?}
     */
    BaseChartDirective.prototype.getChartBuilder = function (ctx /*, data:Array<any>, options:any*/) {
        var _this = this;
        var /** @type {?} */ datasets = this.getDatasets();
        var /** @type {?} */ options = Object.assign({}, this.options);
        if (this.legend === false) {
            options.legend = { display: false };
        }
        // hock for onHover and onClick events
        options.hover = options.hover || {};
        if (!options.hover.onHover) {
            options.hover.onHover = function (active) {
                if (active && !active.length) {
                    return;
                }
                _this.chartHover.emit({ active: active });
            };
        }
        if (!options.onClick) {
            options.onClick = function (event, active) {
                _this.chartClick.emit({ event: event, active: active });
            };
        }
        var /** @type {?} */ opts = {
            type: this.chartType,
            data: {
                labels: this.labels,
                datasets: datasets
            },
            options: options
        };
        return new Chart(ctx, opts);
    };
    /**
     * @param {?} newDataValues
     * @return {?}
     */
    BaseChartDirective.prototype.updateChartData = function (newDataValues) {
        if (Array.isArray(newDataValues[0].data)) {
            this.chart.data.datasets.forEach(function (dataset, i) {
                dataset.data = newDataValues[i].data;
                if (newDataValues[i].label) {
                    dataset.label = newDataValues[i].label;
                }
            });
        }
        else {
            this.chart.data.datasets[0].data = newDataValues;
        }
    };
    /**
     * @return {?}
     */
    BaseChartDirective.prototype.getDatasets = function () {
        var _this = this;
        var /** @type {?} */ datasets = void 0;
        // in case if datasets is not provided, but data is present
        if (!this.datasets || !this.datasets.length && (this.data && this.data.length)) {
            if (Array.isArray(this.data[0])) {
                datasets = ((this.data)).map(function (data, index) {
                    return { data: data, label: _this.labels[index] || "Label " + index };
                });
            }
            else {
                datasets = [{ data: this.data, label: "Label 0" }];
            }
        }
        if (this.datasets && this.datasets.length ||
            (datasets && datasets.length)) {
            datasets = (this.datasets || datasets)
                .map(function (elm, index) {
                var /** @type {?} */ newElm = Object.assign({}, elm);
                if (_this.colors && _this.colors.length) {
                    Object.assign(newElm, _this.colors[index]);
                }
                else {
                    Object.assign(newElm, getColors(_this.chartType, index, newElm.data.length));
                }
                return newElm;
            });
        }
        if (!datasets) {
            throw new Error("ng-charts configuration error,\n      data or datasets field are required to render char " + this.chartType);
        }
        return datasets;
    };
    /**
     * @return {?}
     */
    BaseChartDirective.prototype.refresh = function () {
        // if (this.options && this.options.responsive) {
        //   setTimeout(() => this.refresh(), 50);
        // }
        // todo: remove this line, it is producing flickering
        this.ngOnDestroy();
        this.chart = this.getChartBuilder(this.ctx /*, data, this.options*/);
    };
    return BaseChartDirective;
}());
BaseChartDirective.defaultColors = [
    [255, 99, 132],
    [54, 162, 235],
    [255, 206, 86],
    [231, 233, 237],
    [75, 192, 192],
    [151, 187, 205],
    [220, 220, 220],
    [247, 70, 74],
    [70, 191, 189],
    [253, 180, 92],
    [148, 159, 177],
    [77, 83, 96]
];
BaseChartDirective.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: 'canvas[baseChart]',
                exportAs: 'base-chart'
            },] },
];
/**
 * @nocollapse
 */
BaseChartDirective.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
]; };
BaseChartDirective.propDecorators = {
    'data': [{ type: _angular_core.Input },],
    'datasets': [{ type: _angular_core.Input },],
    'labels': [{ type: _angular_core.Input },],
    'options': [{ type: _angular_core.Input },],
    'chartType': [{ type: _angular_core.Input },],
    'colors': [{ type: _angular_core.Input },],
    'legend': [{ type: _angular_core.Input },],
    'chartClick': [{ type: _angular_core.Output },],
    'chartHover': [{ type: _angular_core.Output },],
};
/**
 * @param {?} colour
 * @param {?} alpha
 * @return {?}
 */
function rgba(colour, alpha) {
    return 'rgba(' + colour.concat(alpha).join(',') + ')';
}
/**
 * @param {?} min
 * @param {?} max
 * @return {?}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * @param {?} colors
 * @return {?}
 */
function formatLineColor(colors) {
    return {
        backgroundColor: rgba(colors, 0.4),
        borderColor: rgba(colors, 1),
        pointBackgroundColor: rgba(colors, 1),
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: rgba(colors, 0.8)
    };
}
/**
 * @param {?} colors
 * @return {?}
 */
function formatBarColor(colors) {
    return {
        backgroundColor: rgba(colors, 0.6),
        borderColor: rgba(colors, 1),
        hoverBackgroundColor: rgba(colors, 0.8),
        hoverBorderColor: rgba(colors, 1)
    };
}
/**
 * @param {?} colors
 * @return {?}
 */
function formatPieColors(colors) {
    return {
        backgroundColor: colors.map(function (color) { return rgba(color, 0.6); }),
        borderColor: colors.map(function () { return '#fff'; }),
        pointBackgroundColor: colors.map(function (color) { return rgba(color, 1); }),
        pointBorderColor: colors.map(function () { return '#fff'; }),
        pointHoverBackgroundColor: colors.map(function (color) { return rgba(color, 1); }),
        pointHoverBorderColor: colors.map(function (color) { return rgba(color, 1); })
    };
}
/**
 * @param {?} colors
 * @return {?}
 */
function formatPolarAreaColors(colors) {
    return {
        backgroundColor: colors.map(function (color) { return rgba(color, 0.6); }),
        borderColor: colors.map(function (color) { return rgba(color, 1); }),
        hoverBackgroundColor: colors.map(function (color) { return rgba(color, 0.8); }),
        hoverBorderColor: colors.map(function (color) { return rgba(color, 1); })
    };
}
/**
 * @return {?}
 */
function getRandomColor() {
    return [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
}
/**
 * Generate colors for line|bar charts
 * @param {?} index
 * @return {?}
 */
function generateColor(index) {
    return BaseChartDirective.defaultColors[index] || getRandomColor();
}
/**
 * Generate colors for pie|doughnut charts
 * @param {?} count
 * @return {?}
 */
function generateColors(count) {
    var /** @type {?} */ colorsArr = new Array(count);
    for (var /** @type {?} */ i = 0; i < count; i++) {
        colorsArr[i] = BaseChartDirective.defaultColors[i] || getRandomColor();
    }
    return colorsArr;
}
/**
 * Generate colors by chart type
 * @param {?} chartType
 * @param {?} index
 * @param {?} count
 * @return {?}
 */
function getColors(chartType, index, count) {
    if (chartType === 'pie' || chartType === 'doughnut') {
        return formatPieColors(generateColors(count));
    }
    if (chartType === 'polarArea') {
        return formatPolarAreaColors(generateColors(count));
    }
    if (chartType === 'line' || chartType === 'radar') {
        return formatLineColor(generateColor(index));
    }
    if (chartType === 'bar' || chartType === 'horizontalBar') {
        return formatBarColor(generateColor(index));
    }
    return generateColor(index);
}

var ChartsModule = (function () {
    function ChartsModule() {
    }
    return ChartsModule;
}());
ChartsModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                declarations: [
                    BaseChartDirective
                ],
                exports: [
                    BaseChartDirective
                ]
            },] },
];
/**
 * @nocollapse
 */
ChartsModule.ctorParameters = function () { return []; };

exports.ChartsModule = ChartsModule;
exports.BaseChartDirective = BaseChartDirective;

Object.defineProperty(exports, '__esModule', { value: true });

})));
