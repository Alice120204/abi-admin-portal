import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Candidate} from "../listing-candidates/listing-candidates.component";

export interface DialogData{
  data: object;
}
@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})
export class ApplicationDetailsComponent implements OnInit {
  cvUrl: string = '';
  letterUrl: string = 'k';
  questions = {
    Name: 'Your Name',
    Affiliation: 'Your current affiliation (organization, position, and/or university)',
    Email: 'Your Email',
    Phone: 'Your Phone Number',
    ['Future Contact']: 'Would you like to be contacted by ABI in the future?',
    Goals: 'What are your short and long-term career plans?',
    ['Experience with Users']: 'Have you ever interacted with users and provided instructions on how to efficiently use server resources?',
    Motivation: 'What is your motivation to apply for this job?',
    ['How you found out about this opportunity']: 'How did you find out about this opportunity?',
    ['Other Opportunity']: 'OTHER: How did you find out about this opportunity?',
    ['Previous Work Examples']: 'Optional: If you have any previous examples of SM Platform or Website management, please attach the URLs below.',
    ['Professional Background']: 'Describe your professional background.',
    ['Professional and Educational Background']: 'Which of your past experiences will help you successfully complete the summer school? ',
    ['Proposed Changes']: 'Optional: Looking at the ABI website and social media pages, what would you change to optimize the user experience, to engage students, researchers and/or donors?',
    ['Supercomputers in Sweden and Germany']: 'What would you like to learn at the supercomputing centers in Sweden and Germany when given the\n' +
    '              chance?',
    ['Willingness to Learn']: 'Are you willing to learn the peculiarities of bioinformatics software support?',
    ['English Proficiency']: 'On a scale of 1-5, how would you rate your English proficiency?',
    ['Armenian Proficiency']: 'On a scale of 1-5, how would you rate your Armenian proficiency?',
    ['Expectations']: 'Why are you interested in the offered position? What are your expectations from the internship? How does it\n' +
    '              relate to your career goals?',
    ['Topic in Life Science']: 'Describe a topic in life sciences that is of particular interest to you. Have you ever been engaged in a\n' +
    '              research project? If yes, what was it about?',
    ['Why ABI']: 'What do you think is the Armenian Bioinformatics Institute’s mission? Why have you chosen to apply to the Armenian Bioinformatics Institute?',
    ['Anything Else']: 'Is there anything else you would like to tell us about you?',
    ['Attend Bootcamp?']: 'If you get selected for the bootcamp, will you be able to attend it?',
    ['Background Field']: 'What background do you come from?',
    ['Other Background Field']: 'OTHER: What background do you come from?',
    ['Benefit']: 'How do you think you will benefit from this summer school?',
    ['Experience Reading Papers']: 'Do you have experience reading scientific papers?',
    ['']: 'Which of your past experiences will help you successfully complete the summer school?',
     ['Laptop']: 'Can you bring your laptop to school with you?',
    ['Last Degree Acquired']: 'What is the last degree you have acquired? (Degree, Year, Institution)',
    ['Other']: 'Please specify.',
    ['Paper Topics Interested']: 'Which topics are most interesting for you?',
    ['Plans']: 'Describe your educational and career-related plans.',
    ['Programming Language of Choice']: 'What is your programming language of choice?',
    ['Other Programming Language of Choice']: 'OTHER: What is your programming language of choice?',
    ['Time Dedication']: 'Will you be able to dedicate 6-7 hours per day to the school?',
    ['Other Time Dedication']: 'OTHER: Will you be able to dedicate 6-7 hours per day to the school?',
    ['What are you best at']: 'What are you best at?',
    ['Why Bioinformatics']: 'Why are you interested in Bioinformatics?',
    ['Time Commitment']: 'How much time can you commit to the work daily?'
  };
  keys: any = [];
  constructor(public dialogRef: MatDialogRef<ApplicationDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.keys = Object.keys(this.data.data);
    // @ts-ignore
    this.cvUrl = this.data.data.CV;
    this.letterUrl = this.data.data.Letter;
  }
close(){
    this.dialogRef.close();
}
}
