// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ArtisanListComponent } from './artisans/artisan-list/artisan-list.component';
import { ArtisanDetailComponent } from './artisans/artisan-detail/artisan-detail.component';
import { ArtisanFormComponent } from './artisans/artisan-form/artisan-form.component';
import { AppointmentFormComponent } from './appointments/appointment-form/appointment-form.component';
import { ChatComponent } from './chat/chat.component';
import { SearchComponent } from './search/search.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtisanListComponent,
    ArtisanDetailComponent,
    ArtisanFormComponent,
    AppointmentFormComponent,
    ChatComponent,
    SearchComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ArtisanListComponent },
      { path: 'artisans/new', component: ArtisanFormComponent },
      { path: 'artisans/:id', component: ArtisanDetailComponent },
      { path: 'artisans/:id/edit', component: ArtisanFormComponent },
      { path: 'appointments/:artisanId', component: AppointmentFormComponent },
      { path: 'chat/:artisanId', component: ChatComponent },
      { path: 'search', component: SearchComponent },
      { path: 'contact', component: ContactComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }