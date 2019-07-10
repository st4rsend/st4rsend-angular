import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { DocService } from '../../shared/services/doc.service';
import { Subscription } from 'rxjs';

import { ListSelectComponent } from '../../shared/component/list-select/list-select.component';

@Component({
  selector: 'app-menu-doc',
  templateUrl: './menu-doc.component.html',
  styleUrls: ['./menu-doc.component.css'],
})
export class MenuDocComponent implements OnInit {

	@ViewChild('docList', {static: true}) docList: ListSelectComponent;

	@Output() editModeEvent = new EventEmitter<boolean>();
	public docEditMode: boolean = false;
	@Output() viewModeEvent = new EventEmitter<string>();
	public viewMode: string = 'normal';

	public docListEditMode: boolean = false;
	public docListTable: string = 'documentation_list';
	public docListIDName: string = 'ID';
	public docListColumn = 'description';
	public docListPosition = 'position';
	public docListFilter = 'themeID';

	public docThemeEditMode: boolean = false;
	public docThemeTable: string = 'documentation_theme';
	public docThemeIDName: string = 'ID';
	public docThemeColumn = 'description';
	public docThemePosition = 'position';

  constructor(
		private docService: DocService,
	) { }

  ngOnInit() {
		this.docList.isReady$.subscribe(
			ready => {
				if ( ready ) {
					this.docList.listID = this.docList.list[0].idx;
					this.docService.dsSetDocListID(this.docList.listID);
				}
			});
  }

	docThemeChange(themeID: number) {
		this.docList.SetFilter(this.docListFilter, themeID.toString());
	}

	docListChange(listID: number) {
		this.docService.dsSetDocListID(listID);
	}
	docRefresh() {
		this.docService.dsSetDocListID(this.docList.listID);
	}	


	editModeChange() {
		this.editModeEvent.emit(this.docEditMode);
	}

	viewModeChange() {
		this.viewModeEvent.emit(this.viewMode);
	}

	docListEdit() {
		this.docListEditMode = !this.docListEditMode;
	}

	listCloseEvent(value: boolean) {
		this.docListEditMode = value;
	}
}
