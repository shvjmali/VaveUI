import { Injectable } from '@angular/core';
//import { debug } from 'console';
import { DataService } from '../_core/data.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private dataService: DataService) { }

  getPartList(currentUser) {
    return this.dataService.getData('Master/GetPartListCSV/'+ currentUser ).map(response => {
      return response;
    });
  }
 GetProposalList(currentUser) {
   
    return this.dataService.getData('Master/GetProposalListCSV/' + currentUser).map(response => {
      return response;
    });
  }
  

  downloadFile(data: any, filename: string) {
    var labels:any
    const csvData = this.ConvertToCSV(data,['id','YazakiPartNumber','InternalPartNumber','Comodity','Description','SupplierPartNumber','SupplierName','CustomerPartNumber','CustomerName','NoOfPoles','PinRowsLayout','SealedUnSealed','Gender','PlatingColor','Color','Material','Hybrid','Width_mm','Length_mm','Height_mm','UOM','MaxTemp_degree','MinTemp_degree','Outside','ApplicableWireRange','WireInsulationDiaRange','CSA','NoOfStrands','SealDia','BundleDia_W_H','WholeSize','PanelThickNess','Series','Status','Weight','Rank','Remarks']);
    const a: any = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    const isIE = /*@cc_on!@*/ false || !!(<any>document).documentMode;
    // if (window.navigator.msSaveOrOpenBlob) {
    //   const retVal = navigator.msSaveBlob(blob, filename + '.csv');
    // } else {
      a.download = filename + '.csv';
    
    a.click();
  }


ConvertToCSV(objArray,labels) 
    {
      const array =
        typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
      let str = '';
      let row = '';
      if (labels === 'No') {
        for (const index in objArray[0]) {
          row += index + ',';
        }
        row = row.slice(0, -1);
        str += row + '\r\n';
      } else {
        str += labels + '\r\n';
      }
      for (let i = 0; i < array.length; i++) {
        let line = '';
        for (const index in array[i]) {
          if (line !== '') line += ',';
  
  
          if (array[i][index] === '' || array[i][index] === null) {
            line += ' ';
          } else {
            if (/^[0][0-9]/.test(array[i][index])) {
              array[i][index] = "'" + array[i][index];
            } else {
              array[i][index] = array[i][index];
            }
           // debugger;
            //update shivaji 21-01-22 start
                if(line.indexOf('\n') || line.indexOf('.'))
                {
                  line = line.replace(/\n/, '');
                }
//             {
//              // debugger;             
//               //line = line.slice(0, -1);
//               line = line.replace(/\n/, '');
//             }

//             var t = line.indexOf('\n');
// //            if(line.charAt(line.length-1)==='\n')
//             if(t===155)
//             {
//              // debugger;             
//               //line = line.slice(0, -1);
//               line = line.replace(/\n/, '');
//             }
            line += array[i][index];
             //update shivaji 21-01-22 end


          }
        }
        str += line + '\r\n';
      }
      return str;
    }

  // GetProposalList(DetailID) {
  //   return this.dataService.getData('Master/GetProposalList' +DetailID).map(response => {
  //     return response;
  //   });
  // }
  
  proposaldownloadFile(data: any, filename: string) {
    var labels:any
    const csvData = this.ConvertToExcel(data,['proposalID','ProposalNumber', 'ProposalType', 'TeamCode', 'PartList','createdBy','lastUpdatedBy' ]);
    const a: any = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    const isIE = /*@cc_on!@*/ false || !!(<any>document).documentMode;
    // if (window.navigator.msSaveOrOpenBlob) {
    //   const retVal = navigator.msSaveBlob(blob, filename + '.csv');
    // } else {
      a.download = filename + '.csv';
    
    a.click();
  }


  ConvertToExcel(objArray,labels) 
  {
   // debugger;
    const array =
      typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';
    if (labels === 'No') {
      for (const index in objArray[0]) {
        row += index + ',';
      }
      row = row.slice(0, -1);
      str += row + '\r\n';
    } else {
      str += labels + '\r\n';
    }
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (const index in array[i]) {
        if (line !== '') line += ',';

       // debugger;
        if (array[i][index] === '' || array[i][index] === null) {
          line += ' ';
        } else {
          if (/^[0][0-9]/.test(array[i][index])) {
            array[i][index] = "'" + array[i][index];
          } else {
            array[i][index] = array[i][index];
          }
          line += array[i][index];
        }
      }
      str += line + '\r\n';
    }
    return str;
  }
}
