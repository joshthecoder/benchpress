var Runner = require('runner').Runner;

var win = Ti.UI.createWindow({
  title: 'benchpress',
  backgroundColor: 'black',
  layout: 'vertical'
});

var scrollView = Ti.UI.createScrollView({
  top: 0,
  height: "85%",
  contentHeight: 'auto'
});
win.add(scrollView);

var runBenchmarks = Ti.UI.createButton({
  title: 'Run Benchmarks',
  top: 10, bottom:10,
  left: 25, right: 25
});
win.add(runBenchmarks);

var runner = new Runner();
scrollView.add(runner.view);

runBenchmarks.on('click', function () {
  // Disable 'run' button until tests finish.
  runBenchmarks.enabled = false;

  // Work out time!
  runner.runSuites();

  // Done benchmarking, re-enable start button.
  runBenchmarks.enabled = true;
});

win.open();

