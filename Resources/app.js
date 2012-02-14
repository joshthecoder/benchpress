var Runner = require('runner').Runner;

var win = Ti.UI.createWindow({
  title: 'benchpress',
  backgroundColor: 'black'
});

var scrollView = Ti.UI.createScrollView({
  top: 60,
  contentHeight: 'auto'
});
win.add(scrollView);

var runBenchmarks = Ti.UI.createButton({
  title: 'Run Benchmarks',
  top: 5,
  width: 150,
  height: 50
});
win.add(runBenchmarks);

var runner = new Runner();
scrollView.add(runner.view);

runBenchmarks.addEventListener('click', function () {
  // Disable 'run' button until tests finish.
  runBenchmarks.enabled = false;

  // Work out time!
  runner.runSuites();

  // Done benchmarking, re-enable start button.
  runBenchmarks.enabled = true;
});

win.open();

