import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { WebSocketService } from '../../shared/services/websocket.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { GlobalService } from '../../shared/services/global.service';

@Component({
	selector: 'app-server-com',
	templateUrl: './server-com.component.html',
	styleUrls: ['./server-com.component.scss'],
})

export class ServerComComponent {

	private subConnect: Subscription;
	private subDebug: Subscription;
	public connectFlag = false;
	public loginFlag = false;
	public loginDisplayFlag = false;
	public debugFlag: boolean = false;

	constructor(
		private websocketSvc: WebSocketService,
		private globalSvc: GlobalService,
		private authSvc: AuthenticationService) {
		this.subDebug = this.globalSvc.debugFlag$.subscribe( flag => { 
				this.debugFlag = flag; 
		});
	}

	public connect() {
		this.subConnect = this.websocketSvc.connected().subscribe(status => {
			this.connectFlag = status;
	console.log("connect");
		});
		this.websocketSvc.connect(this.globalSvc.getWebSocketUrl());
	}

	public disconnect() {
		if (this.connectFlag) {
			this.logout();
		}
		this.websocketSvc.disconnect();
	}

	public debug(flag: boolean) {
		this.globalSvc.setDebugFlag(flag);
	}

	public login() {
		this.loginDisplayFlag = !this.loginDisplayFlag;
	}
	public logout() {
		this.authSvc.logout();
		this.loginFlag = false;
	}

	public getUserInfo() {
		this.authSvc.getUserInfo(5);
	}

	public loginCloseEvent(value: boolean) {
		this.loginDisplayFlag = false;
		this.loginFlag = value;
	}
}
