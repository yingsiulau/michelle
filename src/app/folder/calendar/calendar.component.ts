import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {
  IonDatetime, IonLabel, IonInput, IonItem, IonContent, IonButton,
  IonButtons,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonFab, IonFabButton, IonIcon, IonList, IonItemOption, IonItemOptions, IonItemSliding, IonToggle, IonPicker, IonPickerColumn, IonPickerColumnOption, IonSelect, IonSelectOption, IonAccordion, IonAccordionGroup, IonText
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
    IonItemOption, IonItemOptions, IonItemSliding, IonToggle, IonPicker, IonPickerColumn, IonPickerColumnOption, IonSelect, IonSelectOption, IonAccordion, IonAccordionGroup, IonText, ReactiveFormsModule
  ]
})
export class CalendarComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;
  multiple = false;
  currentColor = '#9cc2ff';

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
  entries: {
    title: string;
    description: string;
    time: string;
    textColor: string;
    backgroundColor: string;
    author: string[];
    dates: string[];
  }[] = [{ title: 'title', description: 'test', time: '12:00', textColor: '#ffffff', backgroundColor: "#ff5722", author: ['Ying'], dates: ['2025-01-22', '2025-01-21', '2025-01-23'], },
  { title: 'title', description: 'test', time: '12:00', textColor: '#ffffff', backgroundColor: "#0f5722", author: ['Ying'], dates: ['2025-01-27', '2025-01-28', '2025-01-29',] },
  { title: 'title', description: 'test', time: '12:00', textColor: '#ffffff', backgroundColor: "#BBBBBB", author: ['Michelle'], dates: ['2025-01-30',] },
  { title: 'DUBLICATE', description: 'test', time: '12:00', textColor: '#ffffff', backgroundColor: "#BBBBBB", author: ['Michelle'], dates: ['2025-01-30',] }];
  highlightedDates = [
    {},
  ];

  newEntry: {
    title: string;
    description: string;
    time: string;
    textColor: string;
    backgroundColor: string;
    author: string[];
    dates: string[];
  } = {
      title: '', description: '', time: '', textColor: '#000000', backgroundColor: this.currentColor, author: [], dates: [],
    }

  isColorModalOpen = false;
  isTimeModalOpen = false; // Track modal open/close state

  constructor() { addIcons({ add, ellipse }); }

  ngOnInit() {
    this.generateHighlightedDates();
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
    this.entries.push(this.newEntry);
    this.newEntry.dates.forEach(date => {
      this.highlightedDates.push({
        date: date,
        textColor: this.newEntry.textColor,
        backgroundColor: this.newEntry.backgroundColor
      })
    });

    this.newEntry = {
      title: '', description: '', time: '', textColor: '#000000', backgroundColor: '', author: [], dates: [],
    };
    this.selectedDates = {};
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
    this.isSelectedDateInEntry();
    var newDates = Array.isArray(this.selectedDates) ? this.selectedDates : [this.selectedDates];
    this.newEntry.dates = newDates
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

  displayDates() {
    if (Array.isArray(this.selectedDates)) {
      this.selectedDates = this.selectedDates.sort()
      let firstLast = {
        first: this.selectedDates[0],
        last: this.selectedDates[this.selectedDates.length - 1]
      }
      return firstLast
    }
    let firstLast = {
      first: this.selectedDates,
      last: null
    }
    return firstLast
  }

  openColorModal() {
    this.isColorModalOpen = true;
  }

  closeColorModal() {
    this.isColorModalOpen = false;
  }

  confirmColorSelection() {
    // Handle selected color logic here
    this.closeColorModal();
  }

  onColorModalDismiss(event: any) {
    if (event.detail.role === 'cancel') {
      // Optional: handle cancel action
    }
    this.isColorModalOpen = false;
  }

  onIonChange(event: any) {
    this.currentColor = event.detail.value;
  }


  onAuthorChange(event: any) {
    // Update the newEntry.author field with the selected authors
    this.newEntry.author = event.detail.value;
    console.log('Selected Authors for newEntry:', this.newEntry.author);
  }
  onTimeChange(event: any) {
    this.newEntry.time = event.detail.value;
  }
}
