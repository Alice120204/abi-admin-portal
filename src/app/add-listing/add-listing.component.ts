import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddListingComponent implements OnInit {
  showButton = false;
  title = 'ABI ADMIN PORTAL';
  newQualification = new FormControl({ value: '', disabled: false, });
  qualificationsForm = new FormGroup({
    qualifications: this.fb.array([])
  });
  tasksForm = new FormGroup({
    tasks: this.fb.array([])
  });
  enableAdd: boolean = false;
  appDeadline = new FormControl('', Validators.required);
  listingTitle = new FormControl('', Validators.required);
  jobTitle = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  employer = new FormControl('', Validators.required);
  duration = new FormControl('', Validators.required);
  format = new FormControl('', Validators.required);
  workingHours = new FormControl('', Validators.required);
  remuneration = new FormControl('', Validators.required);
  imageUrl = new FormControl('', Validators.required);
  qualificationsArray = [];
  qualificationsObect = {};
  tasksObject = {};
  addListingForm = new FormGroup({
    appDeadline: this.appDeadline,
    listingTitle:this.listingTitle,
    jobTitle: this.jobTitle,
    description: this.description,
    employer: this.employer,
    duration: this.duration,
    format: this.format,
    workingHours: this.workingHours,
    remuneration: this.remuneration,
    imageUrl: this.imageUrl
  });
  tasksArray = [];
  deadline = new Date();
  showTaskButton: boolean = false;
  newTask = new FormControl({value: '', disabled: false});

  constructor(public fb: FormBuilder, public datepipe: DatePipe, private db: AngularFireDatabase, public dialogRef: MatDialogRef<AddListingComponent>) { }

  ngOnInit(): void {
  }
  ngDoCheck(): void {
    if(this.tasksArray.length!=0) {
      if(this.qualificationsArray.length!=0){
        if(this.addListingForm.valid){
          this.enableAdd=true;
        }
      }
    }
  }
  addQualFormField(){
    const creds = this.qualificationsForm.controls['qualifications'] as FormArray;
    this.showButton = true;
    creds.push(this.fb.group({
      newQualification: this.newQualification,
    }));
  }
  addTaskFormField(){
    const tasks = this.tasksForm.controls['tasks'] as FormArray;
    this.showTaskButton = true;
    tasks.push((this.fb.group({
      newTask: this.newTask,
    })));
  }
  appendQualification(){
    this.qualificationsArray = this.qualificationsForm.value['qualifications'];
    for(let i=0; i<this.qualificationsArray.length; i++){
      if(this.qualificationsArray[i]['newQualification']==''){
        this.qualificationsArray.splice(i, 1);
      }
    }
    console.log(this.qualificationsArray);
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }
  appendTask(){
    this.tasksArray = this.tasksForm.value['tasks'];
    for(let i=0; i<this.tasksArray.length; i++){
      if(this.tasksArray[i]['newTask']==''){
        this.tasksArray.splice(i, 1);
      }
    }
    console.log(this.tasksArray);
    this.deadline = this.addListingForm.controls['appDeadline'].value;
    this.datepipe.transform(this.deadline, 'yyyy-MM-dd');
    console.log(this.deadline.getFullYear().toString()+(this.deadline.getMonth() + 1).toString()+this.deadline.getDate().toString());
  }
  addListingtoDB(){
    const finalIndex = this.datepipe.transform(this.deadline, 'yyyyMMdd');
    // @ts-ignore
    finalIndex.toString();
    this.db.database.ref('Applications/' + finalIndex).set({
      ['Application Deadline']: this.datepipe.transform(this.deadline, 'dd/MM/yyyy'),
      Duration: this.duration.value,
      Employer: this.employer.value,
      Format: this.format.value,
      ['Job Title']: this.jobTitle.value,
      ['Listing Title']: this.listingTitle.value,
      ['Working Hours']: this.workingHours.value,
      w_Image: this.imageUrl.value,
      w_Visible: true,
      ww_Description: this.description.value,
      ww_Status: 'closed',
      wwww_Renumeration: this.remuneration.value
    });
    for(let i=0; i<this.qualificationsArray.length; i++){
      Object.assign(this.qualificationsObect, {['q_0' + (i+1).toString()]: this.qualificationsArray[i]['newQualification']})
    }

    for(let i=0; i<this.qualificationsArray.length; i++){
      this.db.database.ref('Applications/' + finalIndex+ '/Qualifications').set(
        this.qualificationsObect
      )
    }
    for(let i=0; i<this.tasksArray.length; i++){
      Object.assign(this.tasksObject, {['t_0' + (i+1).toString()]: this.tasksArray[i]['newTask']})

    }

    for(let i=0; i<this.tasksArray.length; i++){
      this.db.database.ref('Applications/' + finalIndex+ '/www_Tasks').set(
        this.tasksObject
      )
    }
    this.dialogRef.close();
  }

}
