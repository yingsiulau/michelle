import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonDatetime, IonLabel, IonInput, IonItem, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonContent, IonButton,
  IonButtons,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonActionSheet,
  IonFab, IonFabButton, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, ellipse } from 'ionicons/icons';

import { OverlayEventDetail } from '@ionic/core/components';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  imports: [CommonModule, FormsModule, IonDatetime, IonLabel, IonInput, IonItem, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonContent, IonModal, IonHeader, IonTitle, IonToolbar, IonButtons, IonActionSheet, IonFab, IonFabButton, IonIcon]
})
export class CalendarComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Share',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  highlightedDates = [
    { "date": "2023-04-15", "textColor": "#ffffff", "backgroundColor": "#ff5722" },
    { "date": "2023-08-22", "textColor": "#ffffff", "backgroundColor": "#4caf50" },
    { "date": "2024-01-12", "textColor": "#ffffff", "backgroundColor": "#2196f3" },
    { "date": "2024-05-30", "textColor": "#000000", "backgroundColor": "#ffc107" },
    { "date": "2024-09-05", "textColor": "#ffffff", "backgroundColor": "#ff5722" }
  ];

  constructor() { addIcons({ add, ellipse }); }

  ngOnInit() { }


  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.message = `Hello, ${event.detail.data}!`;
    }
  }

}
