const moment = require('moment');

var date = moment();
console.log('moment:', date.format()); // 2018-09-22T13:37:48+01:00
console.log('moment MMM:', date.format('MMM')); // Sep
console.log('moment DD MMM YYYY:', date.format('DD MMM YYYY')); // 22 Sep 2018
console.log('moment Do/MM/YYYY h:mm:ss AZ:', date.format('Do/MM/YYYY h:mm:ss AZ')); // 22nd/09/2018 1:44:15 PM+01:00
console.log('manipulation');
console.log(date.add(1,'year').format('YYYY')); // 2019
