import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonDatetime, IonLabel, IonInput, IonItem, IonContent, IonButton,
  IonButtons,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonFab, IonFabButton, IonIcon, IonList, IonItemOption, IonItemOptions, IonItemSliding, IonToggle
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, ellipse } from 'ionicons/icons';

import { OverlayEventDetail } from '@ionic/core/components';


@Component({
  standalone: true,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  imports: [IonList, CommonModule, FormsModule, IonDatetime, IonLabel, IonInput, IonItem, IonButton, IonContent, IonModal, IonHeader, IonTitle, IonToolbar, IonButtons, IonFab, IonFabButton, IonIcon,
    IonItemOption, IonItemOptions, IonItemSliding, IonToggle]
})
export class CalendarComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;
  multiple = false;

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

  selectedDates: any = null; // null for single mode, [] for multiple mode
  entries = [{ title: 'title', description: 'test', time: '12:00', textColor: '#ffffff', backgroundColor: "#ff5722", dates: ['2025-01-22', '2025-01-21', '2025-01-23'] },
  { title: 'title', description: 'test', time: '12:00', textColor: '#ffffff', backgroundColor: "#0f5722", dates: ['2025-01-27', '2025-01-28', '2025-01-29',] },
  { title: 'title', description: 'test', time: '12:00', textColor: '#ffffff', backgroundColor: "#BBBBBB", dates: ['2025-01-30',] },
  { title: 'DUBLICATE', description: 'test', time: '12:00', textColor: '#ffffff', backgroundColor: "#BBBBBB", dates: ['2025-01-30',] }];
  highlightedDates = [
    {},
  ];

  constructor() { addIcons({ add, ellipse }); }

  ngOnInit() {
    this.generateHighlightedDates();
    this.isSelectedDateInEntry();
  }

  private generateHighlightedDates(): void {
    this.entries.forEach(item => {
      item.dates.forEach(date => {
        this.highlightedDates.push({
          date: date,
          textColor: item.textColor,
          backgroundColor: item.backgroundColor,

        });
      });
    });
  }

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

  toggleSelectionMode() {
    if (!this.multiple) {
      this.selectedDates = this.selectedDates?.[0] || null;
    } else {
      this.selectedDates = this.selectedDates ? [this.selectedDates] : [];
    }
  }

  onDateChange(event: any) {
    if (this.selectedDates.indexOf('T') > -1) {
      this.selectedDates = this.selectedDates.split('T')[0];
    }
    this.isSelectedDateInEntry()
  }

  isSelectedDateInEntry(): number[] | null {
    const matchingIndices: number[] = []; // Collect indices of matching entries

    for (const [entryIndex, entry] of this.entries.entries()) {
      for (const date of entry.dates) {
        if (this.selectedDates === date) {
          matchingIndices.push(entryIndex); // Add the index to the array
        }
      }
    }

    // Return the array of indices if there are matches, or null if no matches
    return matchingIndices.length > 0 ? matchingIndices : null;
  }

}
