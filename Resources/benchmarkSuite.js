function BenchmarkSuiteView(suite) {
  var view = this.view = Ti.UI.createView({
    backgroundColor: 'white',
    height: 75,
    top: 5,
    left: 5, right: 5
  });

  view.add(Ti.UI.createLabel({
    text: suite.name,
    height: 'auto',
    width: 'auto',
    left: 15
  }));

  var statusLabel = this.statusLabel = Ti.UI.createLabel({
    text: '',
    height: 'auto',
    width: 'auto',
    right: 15,
    font: {fontSize: 14, fontWeight: 'bold'},
    color: 'black'
  });
  view.add(statusLabel);
}

BenchmarkSuiteView.prototype.clear = function() {
  this.statusLabel.text = "";
  this.view.backgroundColor = 'white';
}

BenchmarkSuiteView.prototype.changeStatus = function(msg, color) {
  if (color) {
    this.view.backgroundColor = color;
  }
  this.statusLabel.text = msg;
}

exports.BenchmarkSuiteView = BenchmarkSuiteView;

