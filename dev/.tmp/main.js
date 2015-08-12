'use strict';

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
'use strict';

$(function () {
  // Grab the template script
  var theTemplateScript = $('#example-template').html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // This is the default context, which is passed to the template
  var context = {
    people: [
      { firstName: 'Homer', lastName: 'Simpson' },
      { firstName: 'Peter', lastName: 'Griffin' },
      { firstName: 'Eric', lastName: 'Cartman' },
      { firstName: 'Kenny', lastName: 'McCormick' },
      { firstName: 'Bart', lastName: 'Simpson' }
    ]
  };

  // Pass our data to the template
  var theCompiledHtml = theTemplate(context);

  // Add the compiled html to the page
  $(document.body).append(theCompiledHtml);
});