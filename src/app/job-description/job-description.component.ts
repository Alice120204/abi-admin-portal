import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {update} from "@angular/fire/database";

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.css']
})
export class JobDescriptionComponent implements OnInit {
  offerings: any = [];
  taskList: any = [];
  qualList: any = [];
  aboutAgenus: string = 'Agenus is a clinical-stage immuno-oncology company focused on the discovery and development of therapies that engage the body\'s immune system to fight cancer. The Company\'s vision is to expand the patient populations benefiting from cancer immunotherapy by pursuing combination approaches that leverage a broad repertoire of antibody therapeutics, adoptive cell therapies (through its subsidiary MiNK Therapeutics), adjuvants, and proprietary cancer vaccine platforms. The Company is equipped with a suite of antibody discovery platforms and a state-of-the-art GMP manufacturing facility with the capacity to support clinical programs. Agenus is headquartered in Lexington, MA.';
  aboutABI: string = 'The Armenian Bioinformatics Institute (ABI) is a recently established scientific-educational foundation aimed at promoting data-driven studies in biomedicine and biotechnologies with international impact. ABI is envisioned as an interdisciplinary and cross-sectoral R&D center aimed at building bioinformatics expertise and infrastructure. ABI focuses on three challenge areas: genomics for health, biotechnology, and ecosystem management. ';
  constructor(private db: AngularFireDatabase, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<JobDescriptionComponent>) {

  }
  ngOnInit(): void {
    this.db.list('misc').valueChanges().subscribe(res => {
      // @ts-ignore
      this.aboutABI = res[0];
      // @ts-ignore
      this.aboutAgenus = res[1];
    });
    this.db.list('Offerings').valueChanges().subscribe(dbo=>{
      for(let i = 0; i< dbo.length; i++){
        // @ts-ignore
        this.offerings.push(dbo[i]);
      }
    });
    this.db.list('Applications/' + this.data.key + '/www_Tasks').valueChanges().subscribe(taskList=>{
      // @ts-ignore
      this.taskList = taskList;
    });
    this.db.list('Applications/' + this.data.key + '/Qualifications').valueChanges().subscribe(qualList=>{
      // @ts-ignore
      this.qualList = qualList;
    });
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }
  saveChanges() {
    this.db.database.ref('misc').update({
      aboutABI: this.aboutABI,
      aboutAgenus: this.aboutAgenus
    });
    this.db.database.ref('Applications/' + this.data.key).update({
      ['Application Deadline']: this.data.appDeadline,
      ww_Status: this.data.wStatus,
      Duration: this.data.duration,
      ['Job Title']: this.data.jobTitle,
      ww_Description: this.data.description,
      Employer: this.data.employer,
      Format: this.data.format,
      ['Listing Title']: this.data.listingTitle,
      ['Working Hours']: this.data.wHours,
      wwww_Renumeration: this.data.renumeration,
    });
    for(let i = 0; i< this.taskList.length; i++){
      this.db.database.ref('Applications/' + this.data.key + '/www_Tasks').update({
        ['t_0'+ (i+1).toString()]: this.taskList[i]
      });
    }
    for(let i = 0; i< this.qualList.length; i++){
      this.db.database.ref('Applications/' + this.data.key + '/Qualifications').update({
        ['q_0'+ (i+1).toString()]: this.qualList[i]
      });
    }
    for(let i = 0; i< this.offerings.length; i++){
      this.db.database.ref('Offerings').update({
        ['o_0'+ (i+1).toString()]: this.offerings[i]
      });
    }
    this.dialogRef.close();
  }

}
