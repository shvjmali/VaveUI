export class RequestModel{
    CurrentD: Date;
    RequesterName: string;
    RequesterID: string;
    CustomerName: string;
    CustomerModel: string;
    Requirement: string;
    ProposalNumber: string;
    RequestModel(){
        this.CurrentD = null;
        this.RequesterName = null;
        this.RequesterID = null;
        this.CustomerName = null;
        this.CustomerModel = null;
        this.Requirement = null;
        this.ProposalNumber = null;        
    }
}