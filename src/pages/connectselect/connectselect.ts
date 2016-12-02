import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home'
import { UserService } from '../../services/user.service';
import { PouchDBService } from '../../services/pouchdb.service'; 

@Component({
	selector: 'page-connectselect',
	templateUrl: 'connectselect.html'
})
export class ConnectselectPage 
{
	public userMail; 
	public newUserMail;
	public newUserName; 

	constructor(private pouchdbService: PouchDBService, private userService: UserService, public navCtrl: NavController, public navParams: NavParams) {}

	ngOnInit()
	{
		this.pouchdbService.sync(); 
		console.log()
	}

	public connect(): void
	{
		let connect = this.userService.get(this.userMail).then((response) => 
		{
			this.navCtrl.push(HomePage, 
			{
				userParams: this.userMail
			});
		})
		.catch((error) => 
		{
			console.error(error);
		});
	}

	public signup(): void
	{
		let newUser = 
		{ 
			_id: this.newUserMail,
			type: 'user',
			name: this.newUserName,
			created: Date.now(),
			updated: Date.now(),
			points: 0, 
			isAdmin: false
		};

		this.userService.add(newUser).then((response) => 
		{
			console.log(response);
		}).catch((error) =>
		{
			console.error(error); 
		});
	}
}