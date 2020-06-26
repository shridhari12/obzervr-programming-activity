import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() showMap = false;
  mapButtonText: string = null;
  showInMapForm: FormGroup;

  constructor(private messageService: MessageService,
              private formBuilder: FormBuilder) {
    this.messageService.add('[map] component initialising ...');
    this.mapButtonText = 'Load Component';
   }

  ngOnInit(): void {
    this.buildShowInMapForm();
  }

  buildShowInMapForm() {
    this.showInMapForm = this.formBuilder.group({
      startDt: new FormControl(''),
      endDt: new FormControl('')
    });
  }

  onSubmit() {
    console.log('Form Data: ', this.showInMapForm.value);
    console.log('[startDt] ', this.showInMapForm.get('startDt').value);
    console.log('[endDt] ', this.showInMapForm.get('endDt').value);
  }

  showMapComponent() {
    this.showMap = !this.showMap;
    if (this.showMap) {
      this.mapButtonText = 'Hide Component';
    }
    else {
      this.mapButtonText = 'Show Component';
    }
  }

}
