import { Component, OnInit, ViewChild } from '@angular/core';
//import { ToastrService } from 'toastr-ng2';
import { DUploadService } from '../dupload.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { saveAs } from 'file-saver';
import { Router, ActivatedRoute } from '@angular/router';
import { PagerService } from '../../_core/pager.service';
import { FileDetailsModel } from '../../_shared/model/FileDetails-model';
//import { Constants } from '../../_shared/constant';

@Component({
    selector: 'app-dupload',
    templateUrl: './dupload.component.html'
  })

  export class DUploadComponent implements OnInit {
    constants: any;
    allowedFiles = ['png'];
    xmlFiles: File[] = [];
    formData: FormData;
    currentUser: any;
    loading = false;
    fileTypeCode: any = -1;
    nofileTypeCode = false; 
    pager: any = {};
    pagedItems: FileDetailsModel[] = [];
    fileDetails: FileDetailsModel[] = [];
    fileData: FileDetailsModel = new FileDetailsModel();
    partNumber: any;
    file: File = null;

    fileToUpload: File | null = null;

    @ViewChild('customFile') fileInput: any;

    constructor(
        private _route: Router,
        private _aroute: ActivatedRoute,
        private _duploadService: DUploadService,
        private pagerService: PagerService,
        private snotifyService: SnotifyService//,
        //private _toastrService: ToastrService
      ) { }

    ngOnInit(){
        this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.loading = true;
        this._aroute.queryParams.subscribe(params => {
          this.partNumber = params.partNumber;        
        }
      );
    this.getFileData();
    this.loading = false;        
  }

    fileChange(event) {
      debugger;
      //this.file = event.target.files[0];
      //this.formData = new FormData();
      //this.formData.append("file", this.file, this.file.name);
         this.formData = new FormData();
         this.xmlFiles = [];
         const fileList: FileList = event.target.files;
         if (fileList.length > 0) {
             for (let i = 0; i < fileList.length; i++) {
                 this.xmlFiles.push(fileList[i]);
                 this.formData.append('fileCollection', fileList[i]);
             }
         }
    }

    transform(form) {
      debugger;
      if(this.fileTypeCode === -1){
        this.nofileTypeCode = true;
      }else{
          this.loading = true;
          const userName = this.currentUser[0].firstName + ' ' + this.currentUser[0].lastName;
          const userId = this.currentUser[0].accountName;
          this._duploadService
            .addFile(
              this.formData,
              this.partNumber,
              this.fileTypeCode,
              userName,
              userId
            )
            .subscribe(result => {
              form.reset();
              this.fileInput.nativeElement.value = '';
              if (result !== null && result.length > 0) {
                this.loading = false;
                this.snotifyService.info('File added successfully', 'Success', {
                  timeout: 2000,
                  showProgressBar: true,
                  closeOnClick: false,
                  pauseOnHover: true,
                  position: SnotifyPosition.centerTop,
                  backdrop: 0.5
                });
                this.getFileData();
              } else {
                this.loading = false;
                this.snotifyService.info('File is not added ', 'Failed', {
                  timeout: 2000,
                  showProgressBar: true,
                  closeOnClick: false,
                  pauseOnHover: true,
                  position: SnotifyPosition.centerTop,
                  backdrop: 0.5
                });
              }
            });
        }
    }

    Activate(model: any){
      this.fileData = model;
      this.fileData.LastModifiedBy = this.currentUser[0].userName;
      this.fileData.LastModifiedById  = this.currentUser[0].userId;
    
      this._duploadService.ActivateFile(this.fileData)
        .subscribe(result => {
          if(result){
            this.snotifyService.info('Document activated successfully', 'Success', {
              timeout: 2000,
              showProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              position: SnotifyPosition.centerTop,
              backdrop: 0.5
            });
            this.getFileData();
          }else{
                    this.loading = false;
                    this.snotifyService.info('Document activation failed', 'Failed', {
                    timeout: 2000,
                    showProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    position: SnotifyPosition.centerTop,
                    backdrop: 0.5
                });
            }
        });
    }

    DeActivate(model: any){
      debugger;
      this.fileData = model;
      this.fileData.LastModifiedBy = this.currentUser[0].userName;
      this.fileData.LastModifiedById  = this.currentUser[0].userId;
    
      this._duploadService.DeActivateFile(this.fileData)
        .subscribe(result => {
          if(result){
            this.snotifyService.info('Document deactivated successfully', 'Success', {
              timeout: 2000,
              showProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              position: SnotifyPosition.centerTop,
              backdrop: 0.5
            });
            this.getFileData();
          }else{
                    this.loading = false;
                    this.snotifyService.info('Document deactivation failed', 'Failed', {
                    timeout: 2000,
                    showProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    position: SnotifyPosition.centerTop,
                    backdrop: 0.5
                });
            }
        });
    }    

    setPage(page: number) {
      // get pager object from service
      this.pager = this.pagerService.getPager(this.fileDetails.length, page);
  
      // get current page of items
      this.pagedItems = this.fileDetails.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    getFileData() {
      debugger;
      this.fileDetails = [];
      if (this.currentUser[0].role_Code === 'APP_ADMIN' || this.currentUser[0].role_Code === 'SUPER_ADMIN') {
        this._duploadService.getFilesDetailsForPart(this.partNumber).subscribe(result => {
          this.pagedItems = [];
          if (result != null && result.length > 0) {
            result.forEach(item => {
              //const sourceName = item.source.substr(item.source.lastIndexOf('\\') + 1).split('.')[0];
              this.fileData.id = item.id;
              this.fileData.partNumber = item.partNumber;
              this.fileData.Doc_Type = item.doc_Type;
              this.fileData.Doc_Name = item.doc_Name;
              this.fileData.Doc_Path = item.doc_Path;
              this.fileData.Doc_Image = item.doc_Image;
              this.fileData.date = item.date;
              this.fileData.uploadedBy = item.uploadedBy;
              this.fileData.UploadedById = item.uploadedById;
              this.fileData.LastModifiedBy = item.LastModifiedBy;
              this.fileData.LastModifiedById = item.LastModifiedById;
              this.fileData.LastModifiedDate = item.LastModifiedDate;
              this.fileData.isActive = item.isActive;
              this.fileDetails.push(this.fileData);
              this.fileData = new FileDetailsModel();
            });
            console.log(result);
            this.setPage(1);
          }
        });
      } else {
        this._duploadService.getFilesDetailsForUser(this.partNumber).subscribe(result => {
          if (result != null && result.length > 0) {
            result.forEach(item => {
              const sourceName = item.source.substr(item.source.lastIndexOf('\\') + 1).split('.')[0];
              this.fileData.partNumber = item.partNumber;
              this.fileData.Doc_Type = item.Doc_Type;
              this.fileData.Doc_Name = item.Doc_Name;
              this.fileData.Doc_Path = item.Doc_Path;
              this.fileData.Doc_Image = item.Doc_Image;
              this.fileData.date = item.date;
              this.fileData.uploadedBy = item.uploadedBy;
              this.fileData.UploadedById = item.uploadedById;
              this.fileData.LastModifiedBy = item.LastModifiedBy;
              this.fileData.LastModifiedById = item.LastModifiedById;
              this.fileData.LastModifiedDate = item.LastModifiedDate;
              this.fileData.isActive = item.isActive;
              this.fileDetails.push(this.fileData);
              this.fileData = new FileDetailsModel();
            });
            console.log(result);
            this.setPage(1);
          }
        });
      }
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    uploadFileToActivity() {
        this._duploadService.postFile(this.fileToUpload).subscribe(data => {
          // do something, if upload success
          }, error => {
            console.log(error);
          });
      }
  }
