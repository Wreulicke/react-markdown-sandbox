class Collector {
  constructor(collector) {
    if (this.collector != null)
      this.collector = collector
  }
  collect(node) {
    if (this.collector != null) {
      this.collector.call(this, node)
    }
    return node
  }
}
module.exports = function(processor, option) {
  const collector = option.collector || new Collector(::console.log)
  return ::collector.collect
}

exports.Collector = Collector