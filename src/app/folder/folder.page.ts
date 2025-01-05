import { Component, inject, OnInit, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: false,
})
export class FolderPage implements OnInit {
  public folder!: string;
  public componentToDisplay!: Type<any>;
  private activatedRoute = inject(ActivatedRoute);
  constructor() {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

    if (this.folder === 'calendar') {
      this.componentToDisplay = CalendarComponent;
    }
  }
}
