function load(test) {
  Ti.include('tests/' + test);
}

load('base.js');
load('richards.js');
load('deltablue.js');
load('crypto.js');
load('raytrace.js');
load('earley-boyer.js');
load('regexp.js');
load('splay.js');
load('navier-stokes.js');
//load('pdfjs.js');
//load('mandreel.js');
//load('gbemu.js');
load('code-load.js');
load('box2d.js');

var BenchmarkSuiteView = require('benchmarkSuite').BenchmarkSuiteView;

function Runner() {
  var view = this.view = Ti.UI.createView({
    layout: 'vertical',
    height: 'auto',
    top: 0
  });

  var suites = BenchmarkSuite.suites;
  for (var i = 0; i < suites.length; i++) {
    var suite = suites[i];
    var bsv = new BenchmarkSuiteView(suite);
    suite.view = bsv;
    view.add(bsv.view);
  }

  var finalScore = this.finalScore = Ti.UI.createLabel({
    text: 'Final Score:',
    height: 75,
    top: 10,
    left: 5, right: 5,
    font: {fontSize: 18, fontWeight: 'bold'},
    backgroundColor: 'white'
  });
  view.add(finalScore);
}

exports.Runner = Runner;

// Run all the enabled benchmark suites.
Runner.prototype.runSuites = function() {
  var suites = BenchmarkSuite.suites;
  for (var i = 0; i < suites.length; i++) {
    suites[i].view.clear();
  }
  this.finalScore.text = 'Final Score:';
  this.suiteView = suites[0].view;
  this.suiteIndex = 0;

  BenchmarkSuite.RunSuites(this);
}

Runner.prototype._nextSuite = function() {
  this.suiteIndex++;
  var suite = BenchmarkSuite.suites[this.suiteIndex];
  if (suite) {
    this.suiteView = suite.view;
  }
}

// --------------------------------------------------------
// Benchmark notification callbacks
// --------------------------------------------------------

Runner.prototype.NotifyStart = function(name) {
  // Starting a test suite.
  this.suiteView.changeStatus('Running...', 'yellow');
}

Runner.prototype.NotifyStep = function(name) {
  // Finished a single benchmark in current suite.
}

Runner.prototype.NotifyError = function(name, error) {
  // An error occured during benchmark.
  this.suiteView.changeStatus('Error! See the log for details.', 'red');
  Ti.API.error('Suite: ' + name + ' Error: ' + error);
  this._nextSuite();
}

Runner.prototype.NotifyResult = function(name, score) {
  // A suite has finished and score is ready.
  this.suiteView.changeStatus('Score: ' + score, 'green');
  this._nextSuite();
}

Runner.prototype.NotifyScore = function(score) {
  // Final benchmark score is ready.
  this.finalScore.text = 'Final Score: ' + score;
}

