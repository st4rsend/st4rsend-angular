import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// We don't intend to declare any component as part of the routing module so:
//import { CommonModule } from '@angular/common';
import { ListTodoComponent } from './todo/list-todo/list-todo.component';
import { CreateTodoComponent } from './todo/create-todo/create-todo.component';
import { UpdateTodoComponent } from './todo/update-todo/update-todo.component';

const appRoutes: Routes = [

	{ path: '', redirectTo: '/', pathMatch: 'full' },
	{ path: 'todo/list', component: ListTodoComponent },
	{ path: 'todo/create', component: CreateTodoComponent },
	{ path: 'todo/update/:idx', component: UpdateTodoComponent },
];


@NgModule({
  imports: [
//    CommonModule
		RouterModule.forRoot(appRoutes),
  ],
	exports: [
		RouterModule
	],
  declarations: []
})
export class AppRoutesModule { }