import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {OverlayModule} from "@angular/cdk/overlay";
import {AngularFireModule} from "@angular/fire/compat";
import { AngularFireDatabaseModule} from "@angular/fire/compat/database";
import { JobDescriptionComponent } from './job-description/job-description.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AddListingComponent } from './add-listing/add-listing.component';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import { AuthScreenComponent } from './auth-screen/auth-screen.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from "@angular/router";
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { ListingCandidatesComponent } from './listing-candidates/listing-candidates.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import {ExcelService} from "./excel.service";
import { CommentsComponent } from './comments/comments.component';


@NgModule({
  declarations: [
    AppComponent,
    JobDescriptionComponent,
    AddListingComponent,
    AuthScreenComponent,
    HomeScreenComponent,
    CandidatesComponent,
    ListingCandidatesComponent,
    ApplicationDetailsComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    ReactiveFormsModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    FormsModule,
    ScrollingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAP4MUlPcQYHhozNcBFcx87QI5MdU2QD90",
      authDomain: "abi-application-portal-d678a.firebaseapp.com",
      projectId: "abi-application-portal-d678a",
      storageBucket: "abi-application-portal-d678a.appspot.com",
      messagingSenderId: "1024902460995",
      appId: "1:1024902460995:web:0f1665007750c59eef86f6",
      measurementId: "G-0N8N3MLD6Z"
    }),
    AngularFireDatabaseModule,
    AppRoutingModule
  ],
  providers: [DatePipe, ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
