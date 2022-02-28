export class FileDetailsModel {
  id: number;
  partNumber: string;
  date: Date;
  Doc_Type: string; 
  Doc_Name: string;
  Doc_Path: string; 
  Doc_Image: any;
  Errors: string;
  uploadedBy: string;
  UploadedById: string;
  LastModifiedDate: Date;
  LastModifiedBy: string;
  LastModifiedById: string;
  isActive: boolean;
  FileDetailsModel() {
    this.partNumber = null;
    this.date = null;
    this.Doc_Type = null;
    this.Doc_Name = null;
    this.Doc_Path = null;
    this.Doc_Image = null;
    this.Errors = null;
    this.uploadedBy = null;
    this.UploadedById = null;
    this.LastModifiedBy = null;
    this.LastModifiedDate = null;
    this.LastModifiedById = null;
    this.isActive = null;
  }
}