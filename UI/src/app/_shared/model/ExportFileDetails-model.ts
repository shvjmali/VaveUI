
export class ExportFileDetailsModel {
    plantCode: string;
    date: string;
    sourceFileName: string;
    // status: string;
    uploadedBy: string;
    // UploadedById: string;
    // FileUploadCount: number;

    ExportFileDetailsModel() {
        this.plantCode = null;
        this.date = null;
        this.sourceFileName = null;
        // this.status = null;
        this.uploadedBy = null;
        // this.UploadedById = null;
        // this.FileUploadCount = null;
    }
}
