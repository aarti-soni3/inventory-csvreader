// polyfills required by exceljs
// require('core-js/modules/es.promise');
// require('core-js/modules/es.string.includes');
// require('core-js/modules/es.object.assign');
// require('core-js/modules/es.object.keys');
// require('core-js/modules/es.symbol');
// require('core-js/modules/es.symbol.async-iterator');
// require('regenerator-runtime/runtime');

const ExcelJS = require('exceljs/dist/es5');

const createWorkbook = (sheetName) => {
    const workbook = new ExcelJS.Workbook();
    workbook.created = new Date();
    workbook.creator = 'aarti';
    const sheet = workbook.addWorksheet(sheetName, { views: [{ state: 'frozen', xSlipt: 1 }] });

    // sheet.properties.outlineLevelCol=1;
    // sheet.properties.defaultRowHeight=15
    return workbook;
}


module.exports = { createWorkbook }


