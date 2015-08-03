var ipc = require('ipc');

document.addEventListener('DOMContentLoaded', function () {
  var source = document.getElementById('source');
  var result = document.getElementById('result_box');
  ipc.on('translate', function (input) {
    source.value = input;
  });

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'childList') {
        var content = mutation.target.textContent;
        if (!!!content.match(/\.\.\.$/)) {
          ipc.sendToHost('translate-result', content);
        }
      }
    });
  });

  var config = {
    attributes: false,
    childList: true,
    characterData: true,
    subtree: false,
  };
  observer.observe(result, config);
});
