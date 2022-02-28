import { Injectable, OnInit } from '@angular/core';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { Observable } from 'rxjs';
import { DataService } from '../_core/data.service';
import { PartComponent } from '../_shared/model/partComponent';

@Injectable({
  providedIn: 'root'
})
export class DUploadService implements OnInit {
  constructor(private dataService: DataService) { }

  ngOnInit() { }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'Master/DeleteTwistCode';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.dataService
      .postElement(endpoint, formData)
      .map(response => { return response; })
    }  
   
    addFile(file, partNumber, fileTypeCode, userName, userId) {
        return this.dataService
          .UploadFile(
            'Upload/SaveDocument/' +
             partNumber +
            '/' + fileTypeCode +
            '/' + userName +
            '/' + userId,
            file
          )
          .map(response => {
            return response;
          });
      }
  
      getFilesDetailsForUser(plantCode) {
        return this.dataService.getData('Upload/GetFileDetailsForUser/' + plantCode).map(response => {
          return response;
        });
      }

      getFilesDetailsForPart(partNumber) {
        return this.dataService.getData('Upload/GetFileDetailsForPart/' + partNumber).map(response => {
          return response;
        });
      }

      getFilesDetailsForAdmin(partNumber) {
        return this.dataService.getData('Upload/GetFileDetailsForAdmin/' + partNumber).map(response => {
          return response;
        });
      }
    
      getFile(path) {
        return this.dataService.GetFile('Dashboard/GetFileToDownload/' + path).map(response => {
          return response;
        });
      }

      DeActivateFile(fileDetails) {
        return this.dataService.postElement('Upload/DeactivatePartDocument', fileDetails)
          .map(res => {
            return res;
          });
      }

      ActivateFile(fileDetails) {
        return this.dataService.postElement('Upload/ActivatePartDocument', fileDetails)
          .map(res => {
            return res;
          });
      }

  deleteTwistCode(id) {
    return this.dataService.postElement('Master/DeleteTwistCode', id).map(response => {
      return response;
    });
  }


}
