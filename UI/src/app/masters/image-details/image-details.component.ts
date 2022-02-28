import { Component, OnInit } from '@angular/core';
import { ViewPartService } from '../ViewPart.Service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})
export class ImageDetailsComponent {

  image:any    
    
  constructor(private viewPartService:  ViewPartService,    
  private route: ActivatedRoute) { }  
    
  ngOnInit() {
    this.image = this.viewPartService.getImage(    
      this.route.snapshot.params['id']    
    ) 
  }
}
