import { Component, OnInit } from '@angular/core';
import { PagerService } from '../../_core/pager.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { PartComponent } from '../../_shared/model/partComponent';
import { ManagementdService } from '../managementd.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { Router } from '@angular/router';
import { ListItem, ManagementModel } from '../../_shared/model/ManagementModel';

@Component({
  selector: 'app-partcodes',
  templateUrl: './managementd.component.html'
})
export class ManagementdComponent implements OnInit {
    loading = false;
    reportm: ManagementModel = new ManagementModel();
    listItem: ListItem = new ListItem(); 
    public ChartType:string = 'bar'; 
    public ChartOptions:any = { 'label': 'R', 'backgroundColor': ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED", "#36A2EB"]};

    aproposalTeamType: string[];
    proposalTeamType: string[]=['AE','CAE','FCA','CVBU','TKML','CMBU','PVBU','ALL','CDDC','MSIL','HOND','DLB'];
    proposalTeamTypeValue: Number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    proposalTeamTypeData:any[] = [{ data:this.proposalTeamTypeValue, label: 'Proposal Count'}];
  
    partCType: string[] = ['CONN', 'TERM', 'CAVITY SEAL', 'CAVITY PLUG', 'GROMMET', 'PROTECTOR', 'TUBE', 'WIRE', 'CLIP'];
    partCTypeValue: Number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    partCTypeData:any[] = [{ data:this.partCTypeValue, label: 'Part Count'}];
  
    a = 0;
    b = 0;
    c = 0;
    d = 0;
    e = 0;
    f = 0;
    g = 0;
    h = 0;
    i = 0;

    proposalType:[] = [];
    proposalTypeValue:[] = [];
    constructor(private _reportService: ManagementdService){
    
    }

    ngOnInit(){
        this.loading = true;
        this.GetData();
        this.loading =false;
    }

    GetData(){
        
        debugger;
        this._reportService.getManagementData().subscribe(result => {
            this.reportm.PartCount = result.partCount;
            this.reportm.ProposalCount = result.proposalCount;
            //this.reportm.
            this.reportm.lPartCTypeWise = result.lPartCTypeWise;

             for (const iterator of result.lPartCTypeWise) {
                 if(iterator.sText == 'CONN')
                 {
                    this.partCTypeValue[0] = iterator.nValue;
                    this.a = iterator.nValue;
                 }
                 if(iterator.sText == 'TERM')
                 {
                    this.partCTypeValue[1] = iterator.nValue;
                    this.b = iterator.nValue;
                 }
                 if(iterator.sText == 'CAVITY SEAL')
                 {
                    this.partCTypeValue[2] = iterator.nValue;
                    this.c = iterator.nValue;
                 }
                 if(iterator.sText == 'CAVITY PLUG')
                 {
                    this.partCTypeValue[3] = iterator.nValue;
                    this.d = iterator.nValue;
                 }
                 if(iterator.sText == 'GROMMET')
                 {
                    this.partCTypeValue[4] = iterator.nValue;
                    this.e = iterator.nValue;
                 }
                 if(iterator.sText == 'PROTECTOR')
                 {
                    this.partCTypeValue[5] = iterator.nValue;
                    this.f = iterator.nValue;
                 }
                 if(iterator.sText == 'TUBE')
                 {
                    this.partCTypeValue[6] = iterator.nValue;
                    this.g = iterator.nValue;
                 }
                 if(iterator.sText == 'WIRE')
                 {
                    this.partCTypeValue[7] = iterator.nValue;
                    this.h = iterator.nValue;
                 }
                 if(iterator.sText == 'CLIP')
                 {
                    this.partCTypeValue[8] = iterator.nValue;
                    this.i = iterator.nValue;
                 }           
               }
            
            for(const iterator of result.lProposalTypeWise){
               if(iterator.sText == 'Alternate')
               {
                  this.reportm.AlternateCount = iterator.nValue;
               }
               if(iterator.sText == 'Inline')
               {
                  this.reportm.InlineCount = iterator.nValue;
               }
            }
            debugger;
            this.aproposalTeamType = [];
            this.proposalTeamType = [];
            this.proposalTeamTypeValue = [];
            for(const iterator of result.lProposalTeamWise)
            {
               this.aproposalTeamType.push(iterator.sText);
               this.proposalTeamTypeValue.push(iterator.nValue);
            }
            this.proposalTeamType = this.aproposalTeamType;
            this.proposalTeamTypeData = [{ data:this.proposalTeamTypeValue, label: 'Proposal Count'}]
            this.partCTypeData = [{ data:this.partCTypeValue, label: 'Part Count'}];
        });
    }
}