import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  z_comment: string = '';
  isCommented = false;
  constructor(public dialogRef: MatDialogRef<Comment>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.db.list('Applications/' + this.data.type + '/wwww_Responses/' + this.data.index).snapshotChanges()
      .subscribe(comm => {

        for(let i = 0; i< comm.length; i++){
          if(comm[i].key=='z_Comment'){
            // @ts-ignore
            this.isCommented = true;
          } else {
            this.isCommented = false;
          }
        }
        if(this.isCommented){
          this.db.list('Applications/' + this.data.type + '/wwww_Responses/' + this.data.index).valueChanges()
            .subscribe(res => {
              // @ts-ignore
              this.z_comment = res[res.length-1];
            })
        }
      });


  }
  addComment(){
    this.db.database.ref('Applications/' + this.data.type + '/wwww_Responses/' + this.data.index).update({
      z_Comment: this.z_comment
    });
    this.dialogRef.close();
  }
}
