import { Injectable, OnInit } from '@angular/core';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { Observable } from 'rxjs';
import { DataService } from '../_core/data.service';
import { PartComponent } from '../_shared/model/partComponent';

@Injectable({
  providedIn: 'root'
})
export class ViewPartService implements OnInit {
  
  allImages = [];
  
  constructor(private dataService: DataService) { }

  ngOnInit() { }

  getPartDetails(partNumber) {
    return this.dataService.getData('Master/GetPartDetails/' + partNumber).map(response => {
      return response;
    });
  }

  getImages() {    
    return this.allImages = Imagesdelatils.slice(0);    
  }    

  getImage(id: number) {    
      return Imagesdelatils.slice(0).find(Images => Images.id == id)    
  }
}

const Imagesdelatils = [    
  { "id": 1, "brand": "Apple", "url": "assets/img/logo1.png" }]    
