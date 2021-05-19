interface JQuery {
  pluginRange(options: {
    min?: number,
    max?: number,
    step?: number,
    valueLeft?: number,
    valueRight?: number,
    isVertical?: boolean,
    isLabel?: boolean,
    isScale?: boolean,
    isDouble?: boolean,
  }): JQuery
}