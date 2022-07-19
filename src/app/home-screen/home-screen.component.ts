import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {JobDescriptionComponent} from "../job-description/job-description.component";
import {AddListingComponent} from "../add-listing/add-listing.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  showButton = false;
  title = 'ABI ADMIN PORTAL';
  openPositions: Array <any> = [
    {listingTitle: '',
      jobTitle: '',
      appDeadline: '',
      description: '',
      employer: '',
      duration: '',
      format: '',
      qualifications: [],
      w_Image: '',
      w_Visible: false,
      wHours: '',
      wStatus: '',
      tasks: {},
      keys: [],
      renumeration: '',
      key: ''},
    {listingTitle: '',
      jobTitle: '',
      appDeadline: 'DD/MM/YYYY',
      employer: 'ABI + a US-based company',
      duration: '6 months',
      format: 'paid internship',
      qualifications: ['Excellent knowledge of Molecular Biology/Molecular Genetics (priority) or Chemistry/Physics',
        'Basic programming and statistics skills',
        'Good writing/reporting skills',
        'High level of English proficiency',
        'Ability to learn quickly, easily read and comprehend scientific literature, motivation to learn bioinformatics',
        'Good communication skills',
        'Responsibility and time management'],
      w_Image: ''},
    {listingTitle: 'Systems biology analysis of liver metastases',
      jobTitle: 'Bioinformatics Researcher',
      appDeadline: 'DD/MM/YYYY',
      employer: 'ABI + a US-based company',
      duration: '6 months',
      format: 'paid internship',
      qualifications: ['Excellent knowledge of Molecular/Cancer Biology and Genomics',
        'Ability to read and comprehend scientific papers, extract data',
        'Experience with spreadsheet editors',
        'Beginner/intermediate programming skills in R (preferable) or Python',
        'Desired familiarity with genomic databases (NCBI, UCSC,GEO)']},
    {listingTitle: 'Linux System Administrator',
      jobTitle: 'System Administrator',
      appDeadline: 'DD/MM/YYYY',
      employer: 'ABI + a US-based company',
      format: 'part-time/full-time',
      qualifications: ['Experience working with Linux OS, command-line and shell',
        'Experience with installation of software for various user groups',
        'Experience with SLURM resource distribution system',
        'Good command of English',
        'Good communication skills']},
    {listingTitle: 'Linux System Administrator',
      jobTitle: 'System Administrator',
      appDeadline: 'DD/MM/YYYY',
      employer: 'ABI + a US-based company',
      format: 'part-time/full-time',
      qualifications: ['Experience working with Linux OS, command-line and shell',
        'Experience with installation of software for various user groups',
        'Experience with SLURM resource distribution system',
        'Good command of English',
        'Good communication skills']}
  ];
  newQualification = new FormControl({ value: '', disabled: false, });
  qualificationsForm = new FormGroup({
    qualifications: this.fb.array([])
  });
  tasksForm = new FormGroup({
    tasks: this.fb.array([])
  });
  appDeadline = new FormControl('', Validators.required);
  qualificationsArray = [];
  addListingForm = new FormGroup({
    appDeadline: this.appDeadline
  });
  tasksArray = [];
  keyArray = [];
  deadline = new Date();
  reversedArr = [];
  addIsClicked: boolean = false;
  showTaskButton: boolean = false;
  newTask = new FormControl({value: '', disabled: false});
  constructor(private db: AngularFireDatabase, public dialog: MatDialog, private fb: FormBuilder, public datepipe: DatePipe, public router: Router){
  }

  ngOnInit(): void{
    this.db.list('Applications').snapshotChanges().subscribe(res => {
      for (let i=0; i<res.length; i++){
        // @ts-ignore
        this.keyArray.push(res[i].key);
      }
      this.keyArray.reverse();
      this.db.list('Applications').valueChanges().subscribe(res=>{
        for(let i = 0; i<res.length; i++){
          // @ts-ignore
          this.db.list('Applications/' + this.keyArray[i].toString()).valueChanges()
            .subscribe((val: Array<any>)=> {
              // @ts-ignore
              this.openPositions[i].appDeadline = val[0].toString();
              // @ts-ignore
              this.openPositions[i].duration = val[1].toString();
              // @ts-ignore
              this.openPositions[i].employer = val[2].toString();
              // @ts-ignore
              this.openPositions[i].format = val[3].toString();
              // @ts-ignore
              this.openPositions[i].jobTitle = val[4];
              // @ts-ignore
              this.openPositions[i].listingTitle = val[5];
              // @ts-ignore
              this.openPositions[i].qualifications = val[6];
              // @ts-ignore
              this.openPositions[i].w_Image = val[8];
              // @ts-ignore
              this.openPositions[i].w_Visible = val[9];
              // @ts-ignore
              this.openPositions[i].wHours = val[7];
              // @ts-ignore
              this.openPositions[i].description = val[10];
              // @ts-ignore
              this.openPositions[i].wStatus = val[11];
              // @ts-ignore
              this.openPositions[i].tasks = val[12];
              // @ts-ignore
              this.openPositions[i].renumeration = val[13];
            });
        }
        // this.openPositions = this.openPositions.slice().reverse();
      });
    });
  }
  openDialog(index:number): void{
    console.log(this.reversedArr);
    let idx = index;
    const temp = this.openPositions[idx].qualifications;
    let taskArr: any[] = [];
    if(this.openPositions[idx].tasks !=''){
      const tasks = this.openPositions[idx].tasks;
      // @ts-ignore
      Object.keys(tasks).map(index => {
        //@ts-ignore
        taskArr.push(tasks[index]);
        return taskArr;
      })
    }

    let arr: any[] = [];
    Object.keys(temp).map(index => {
      //@ts-ignore
      arr.push(temp[index]);
      return arr;
    });
    this.dialog.open(JobDescriptionComponent, {
      width: '700px',
      height: '750px',
      data: {listingTitle: this.openPositions[idx].listingTitle,
        jobTitle: this.openPositions[idx].jobTitle,
        qualifications: arr,
        employer: this.openPositions[idx].employer,
        duration: this.openPositions[idx].duration,
        appDeadline: this.openPositions[idx].appDeadline,
        format: this.openPositions[idx].format,
        index: idx,
        wHours: this.openPositions[idx].wHours,
        wStatus: this.openPositions[idx].wStatus,
        description: this.openPositions[idx].description,
        tasks: taskArr,
        keys: this.keyArray,
        renumeration: this.openPositions[idx].renumeration,
        key: this.keyArray[idx]},
      autoFocus: false
    });
  }
  removeListing(index: number){
    alert('This action can not be undone. Do you wish to proceed?');
    this.db.database.ref('Applications/' + this.keyArray[index]).remove();
    location.reload();
  }

  addListing(){
    this.dialog.open(AddListingComponent, {
      width: '650px',
      height: '750px'
    });
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
    console.log(this.qualificationsArray);
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }
  appendTask(){
    this.tasksArray = this.tasksForm.value['tasks'];
    console.log(this.tasksArray);
    this.deadline = this.addListingForm.controls['appDeadline'].value;
    this.datepipe.transform(this.deadline, 'yyyy-MM-dd');
    console.log(this.deadline.getFullYear().toString()+(this.deadline.getMonth() + 1).toString()+this.deadline.getDate().toString());
  }
}
