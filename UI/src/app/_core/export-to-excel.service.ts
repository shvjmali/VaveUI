import { Injectable } from '@angular/core';

@Injectable()
export class ExportToExcelService {
  constructor() {}

  // ConvertToCSV(
  //   objArray,
  //   labels //         tula labels pn pathavav lagel ok kr ki
  // ) // tslint:disable-next-line:one-line
  // {
  //   const array =
  //     typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  //   let str = '';
  //   let row = '';
  //   if (labels === 'No') {
  //     // tslint:disable-next-line:forin
  //     for (const index in objArray[0]) {
  //       // Now convert each value to string and comma-separated
  //       row += index + ',';
  //     }
  //     row = row.slice(0, -1);
  //     // append Label row with line break
  //     str += row + '\r\n';
  //   } else {
  //     str += labels + '\r\n';
  //   }
  //   for (let i = 0; i < array.length; i++) {
  //     let line = '';
  //     // tslint:disable-next-line:forin
  //     for (const index in array[i]) {
  //       // tslint:disable-next-line:curly
  //       if (line !== '') line += ',';
  //       if (array[i][index] === '' || array[i][index] === null) {
  //         line += ' ';
  //       } else {
  //         line += array[i][index];
  //       }
  //     }
  //     str += line + '\r\n';
  //   }
  //   return str;
  // }
  
  ConvertToCSV(objArray) // tslint:disable-next-line:one-line
  {
    const array =
      typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';
    // tslint:disable-next-line:forin
    for (const index in objArray[0]) {
      // Now convert each value to string and comma-separated
      row += index + ',';
    }
    row = row.slice(0, -1);
    // append Label row with line break
    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      // tslint:disable-next-line:forin
      for (const index in array[i]) {
        // tslint:disable-next-line:curly
        if (line !== '') line += ',';

        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }
  download(data: any, filename: string) {
    const csvData = this.ConvertToCSV(data);
    const a: any = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    const isIE = /*@cc_on!@*/ false || !!(<any>document).documentMode;
    if (window.navigator.msSaveOrOpenBlob) {
      const retVal = navigator.msSaveBlob(blob, filename + '.csv');
    } else {
      a.download = filename + '.csv';
    }
    // If you will any error in a.download then dont worry about this.
    a.click();
    // // tslint:disable-next-line:prefer-const
    // const csvData = this.ConvertToCSV(data, labels);
    // const a: any = document.createElement('a');
    // a.setAttribute('style', 'display:none;');
    // document.body.appendChild(a);
    // const blob = new Blob([csvData], { type: 'text/csv' });
    // const url = window.URL.createObjectURL(blob);
    // a.href = url;
    // const isIE = /*@cc_on!@*/ false || !!(<any>document).documentMode;
    // if (window.navigator.msSaveOrOpenBlob) {
    //   const retVal = navigator.msSaveBlob(blob, filename + '.csv');
    // } else {
    //   a.download = filename + '.csv';
    // }
    // // If you will any error in a.download then dont worry about this.
    // a.click();
  }

  ConvertToCSVExcel(objArray) // tslint:disable-next-line:one-line
  {
    const array =
      typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';
    // tslint:disable-next-line:forin
    for (const index in objArray[0]) {
      // Now convert each value to string and comma-separated
      row += index + ',';
    }
    row = row.slice(0, -1);
    // append Label row with line break
    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      // tslint:disable-next-line:forin
      for (const index in array[i]) {
        // tslint:disable-next-line:curly
        if (line !== '') line += ',';

        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }
  downloadExcel(data: any, filename: string) {
    // tslint:disable-next-line:prefer-const
    const csvData = this.ConvertToCSVExcel(data);
    const a: any = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    const isIE = /*@cc_on!@*/ false || !!(<any>document).documentMode;
    if (window.navigator.msSaveOrOpenBlob) {
      const retVal = navigator.msSaveBlob(blob, filename + '.csv');
    } else {
      a.download = filename + '.csv';
    }
    // If you will any error in a.download then dont worry about this.
    a.click();
  }
}
