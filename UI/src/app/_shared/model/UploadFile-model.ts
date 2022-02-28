export class UploadFile {
  file: FormData;
  description: string;
  plantCode: string;
  UploadFile() {
    this.file = null;
    this.description = null;
    this.plantCode = null;
  }
}
