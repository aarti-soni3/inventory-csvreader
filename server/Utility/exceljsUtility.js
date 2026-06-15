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

const orderTableColumns = [
    { header: 'Order ID', key: 'orderId', width: 40 },
    { header: 'Product Id', key: 'productId', width: 40 },
    { header: 'Quantity', key: 'quantity', width: 10 },
    { header: 'Price', key: 'price', width: 10 },
    { header: 'Tax percentage', key: 'taxPercentage', width: 15 },
    { header: 'Sub Total (Quantity * Price)', key: 'subTotal', width: 10 },
    { header: 'Grand Total', key: 'grandTotal', width: 12 },
    { header: 'Created At', key: 'createdAt', width: 12 },
    { header: 'Updated At', key: 'updatedAt', width: 12 },
]

const getColumnLetters = (worksheet, colName) => {
    return worksheet.getColumn(colName).letter;
}

const setOrderTotalFormula = (worksheet) => {
    const startRow = 2;
    const endRow = worksheet.lastRow.number;
    const numberFormat = `₹0,000.00`;

    const quantityCol = getColumnLetters(worksheet, 'quantity');
    const priceCol = getColumnLetters(worksheet, 'price');
    const taxPercentageCol = getColumnLetters(worksheet, 'taxPercentage');
    const subTotalCol = getColumnLetters(worksheet, 'subTotal');
    const grandTotalCol = getColumnLetters(worksheet, 'grandTotal');

    for (let i = startRow; i <= endRow; i++) {
        const subTotalCell = worksheet.getCell(`${subTotalCol}${i}`);
        const grandTotalCell = worksheet.getCell(`${grandTotalCol}${i}`);

        subTotalCell.value = {
            formula: `${quantityCol}${i} * ${priceCol}${i}`
        }
        subTotalCell.numFmt = numberFormat;

        grandTotalCell.value = {
            formula: `${subTotalCol}${i} + (${subTotalCol}${i} * (${taxPercentageCol}${i}/${100}))`
        }
        grandTotalCell.numFmt = numberFormat;
    }
}

module.exports = { createWorkbook, orderTableColumns, setOrderTotalFormula }


