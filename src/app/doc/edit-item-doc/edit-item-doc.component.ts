import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

import { DocService } from '../../shared/services/doc.service';
import { Doc, DocType } from '../../shared/model/doc';
import { SqlListService, ISqlList } from '../../shared/services/sql-list.service';

@Component({
  selector: 'app-edit-item-doc',
  templateUrl: './edit-item-doc.component.html',
  styleUrls: ['./edit-item-doc.component.scss'],
	providers: [ SqlListService ],
})
export class EditItemDocComponent implements OnInit {

	@Input() itemDoc: Doc;
	@Output() itemDocCloseEvent = new EventEmitter<boolean>();

	public docTypes: Array<ISqlList>;
	public doctypeTable: string = 'documentation_type';
	public docTypeIDName: string = 'ID';
	public docTypeColumn: string = 'type';
	public docTypePosition: string = 'position';

	private creation: boolean;
	public doc: Doc;
	public docTypeID: number;
	public docType2ID: number;
	public listTypeSelected: boolean;
	public listType2Selected: boolean;

	public docDisplayID: number;

	public editStyles;


  constructor(
		private sanitizer: DomSanitizer,
		private docService: DocService,
		private docTypeListService: SqlListService) {
	//		console.log("CREATING edit-item-doc");
		}

  ngOnInit() {
		this.docTypeListService.InitList(
			this.doctypeTable,
			this.docTypeIDName,
			this.docTypeColumn,
			this.docTypePosition);
		this.docTypes = this.docTypeListService.GetList();
		this.reset();
		
		if (this.doc.typeID == 4) {
			this.listTypeSelected = true;
		} else {
			this.listTypeSelected = false;
		}
		if (this.doc.type2ID == 4) {
			this.listType2Selected = true;
		} else {
			this.listType2Selected = false;
		}
		this.editStyles = {
			"top": "50px",
			//"left": "50px",
			"width": "80%",
			"height": "70%",
			//"width": "'calc (100vw -50px)'",
		};
		//this.editStyles.width = this.sanitizer.bypassSecurityTrustStyle("800px");
		//console.log("EDITSTYLES: ", this.editStyles);
		console.log("ITEM: ", this.doc);
  }

	cancel() {
		this.itemDocCloseEvent.emit(false);
	}

	validate() {
		if (this.doc.idx == 0){
			this.docService.dsInsertDoc(this.doc);
		} else {
			this.docService.dsUpdateDoc(this.doc);
		}
		this.itemDocCloseEvent.emit(true);
	} 

	docTypeChange() {
		//console.log("doc type change");
		this.doc.typeID = this.docTypeID;
		if (this.docTypeID == 4) {
			this.listTypeSelected = true;
		} else {
			this.listTypeSelected = false;
		}
	}
	docType2Change() {
		//console.log("doc type change");
		this.doc.type2ID = this.docType2ID;
		if (this.docType2ID == 4) {
			this.listType2Selected = true;
		} else {
			this.listType2Selected = false;
		}
	}

	selectedListEvent(listID: number) {
		this.doc.childListID = listID;
	}
	selectedList2Event(listID: number) {
		this.doc.child2ListID = listID;
	}

	reset() {
		if (this.itemDoc !=null){
			this.creation = false;
			this.docTypeID = this.itemDoc.typeID;
			this.docType2ID = this.itemDoc.type2ID;
			this.doc = { ...this.itemDoc};
		} else {
			this.creation = true;
			this.doc = new Doc(0, 0, "", 1, "TEXT", "", 0, 1, "TEXT", "", 0, 1, "Double");
			this.docTypeID = 1;
			this.docType2ID = 1;
		}
	}

	fromFile(file) {
		var loader = new FileReader();
		console.log("FILE: ", file);
		loader.readAsText(file.target.files[0]);
		loader.onload = (e) => {
			this.doc.value = loader.result as string;
		}
	}
}
