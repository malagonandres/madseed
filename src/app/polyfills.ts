import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');
if (process.env.ENV === 'production') {
  // Production
  console.log('MADSEED PRODUCTTION MODE');
} else {
  // Development
  console.log('MADSEED DEVELOPER MODE');  
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}