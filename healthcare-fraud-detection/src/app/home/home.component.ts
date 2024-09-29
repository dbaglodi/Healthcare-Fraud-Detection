import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { PredictionService } from '../prediction.service';
import { VertexAIService } from '../vertex-ai.service';
import { BeneficiariesService } from '../beneficiaries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formVisible = false; // To track visibility of the Create ID form
  isIdSectionVisible = false; // To track visibility of the Create ID section
  beneficiaries:any;
  currentID:any;
  fraud:any = "";

  constructor(private router: Router, private predictionService:PredictionService, private vertexAIService:VertexAIService, private beneficiariesService:BeneficiariesService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData():void {
    this.beneficiariesService.getData().subscribe(data => {
      this.beneficiaries = data;
    })
  }

  // Method for handling 'Find ID' button click
  findIdOld(id:string) {
    console.log(this.beneficiaries.get(id));
    if (this.beneficiaries.has(this.currentID)) {
    this.fraud = (this.beneficiaries.get(id).fraud_prediction == -1)? "Fraud" : "Not Fraud";
    } else {
      this.fraud = "";
    }
  }

  // Method to toggle the Create ID section
  createId() {
    this.isIdSectionVisible = !this.isIdSectionVisible; // Toggle visibility

    if (this.isIdSectionVisible) {
      const newIdSection: HTMLElement | null = document.getElementById('newIdSection');
      if (newIdSection) {
        // Clear existing content if any
        newIdSection.innerHTML = '';

        // Create form section
        const formSection = document.createElement('div');
        formSection.classList.add('create-id-form');

        // Populate form fields
        formSection.innerHTML = `
          <h2>Create ID</h2>
          <div>
            <label>CLM_PMT_AMT</label>
            <input type="text" id="CLM_PMT_AMT" />
          </div>
          <div>
            <label>NCH_PRMRY_PYR_CLM_PD_AMT</label>
            <input type="text" id="NCH_PRMRY_PYR_CLM_PD_AMT" />
          </div>
          <div>
            <label>AT_PHYSN_NPI</label>
            <input type="text" id="AT_PHYSN_NPI" />
          </div>
          <div>
            <label>OP_PHYSN_NPI</label>
            <input type="text" id="OP_PHYSN_NPI" />
          </div>
          <div>
            <label>OT_PHYSN_NPI</label>
            <input type="text" id="OT_PHYSN_NPI" />
          </div>
          <div>
            <label>CLM_PASS_THRU_PER_DIEM_AMT</label>
            <input type="text" id="CLM_PASS_THRU_PER_DIEM_AMT" />
          </div>
          <div>
            <label>NCH_BENE_IP_DDCTBL_AMT</label>
            <input type="text" id="NCH_BENE_IP_DDCTBL_AMT" />
          </div>
          <div>
            <label>NCH_BENE_PTA_COINSRNC_LBLTY_AM</label>
            <input type="text" id="NCH_BENE_PTA_COINSRNC_LBLTY_AM" />
          </div>
          <div>
            <label>NCH_BENE_BLOOD_DDCTBL_LBLTY_AM</label>
            <input type="text" id="NCH_BENE_BLOOD_DDCTBL_LBLTY_AM" />
          </div>
          <div>
            <label>CLM_UTLZTN_DAY_CNT</label>
            <input type="text" id="CLM_UTLZTN_DAY_CNT" />
          </div>
          <div>
            <label>PRVDR_NUM</label>
            <input type="text" id="PRVDR_NUM_HASH" />
          </div>
          <div>
            <label>NUM_OCCURENCES</label>
            <input type="text" id="NUM_OCCURENCES" />
          </div>
          
        `;

        newIdSection.appendChild(formSection);
      }
    } else {
      // Hide the form section
      const newIdSection: HTMLElement | null = document.getElementById('newIdSection');
      if (newIdSection) {
          newIdSection.innerHTML = ''; // Clear the form section
      }
    }

    
  }


  saveIdForm() {
    const formData: { [key: string]: string } = {};
    const newIdSection = document.getElementById('newIdSection');
    
    if (newIdSection) {
      const inputs = newIdSection.querySelectorAll('input');
      inputs.forEach((input: HTMLInputElement) => {
        formData[input.id] = input.value;
      });
  
      console.log('Form data:', formData);
      
      // Here you can send the data to a server or process it as needed
      // For example:
      // this.sendDataToServer(formData);
  
      // Or save it to local storage:
      localStorage.setItem('idFormData', JSON.stringify(formData));
  
      alert('ID data saved successfully!');
    } else {
      console.error('newIdSection not found');
    }
  }

  // saveIdForm() {
  //   // const newIdSection = document.getElementById('newIdSection');

  //   if (document) {
  //     const formData = {
  //       CLM_PMT_AMT: (document.getElementById('CLM_PMT_AMT') as HTMLInputElement).value,
  //       NCH_PRMRY_PYR_CLM_PD_AMT: (document.getElementById('NCH_PRMRY_PYR_CLM_PD_AMT')as HTMLInputElement).value,
  //       AT_PHYSN_NPI: (document.getElementById('AT_PHYSN_NPI') as HTMLInputElement).value,
  //       OP_PHYSN_NPI: (document.getElementById('OP_PHYSN_NPI') as HTMLInputElement).value,
  //       OT_PHYSN_NPI: (document.getElementById('OT_PHYSN_NPI') as HTMLInputElement).value,
  //       CLM_PASS_THRU_PER_DIEM_AMT: (document.getElementById('CLM_PASS_THRU_PER_DIEM_AMT') as HTMLInputElement).value,
  //       NCH_BENE_IP_DDCTBL_AMT: (document.getElementById('NCH_BENE_IP_DDCTBL_AMT') as HTMLInputElement).value,
  //       NCH_BENE_PTA_COINSRNC_LBLTY_AM: (document.getElementById('NCH_BENE_PTA_COINSRNC_LBLTY_AM') as HTMLInputElement).value,
  //       NCH_BENE_BLOOD_DDCTBL_LBLTY_AM: (document.getElementById('NCH_BENE_BLOOD_DDCTBL_LBLTY_AM') as HTMLInputElement).value,
  //       CLM_UTLZTN_DAY_CNT: (document.getElementById('CLM_UTLZTN_DAY_CNT')as HTMLInputElement).value,
  //       PRVDR_NUM_HASH: (document.getElementById('PRVDR_NUM_HASH') as HTMLInputElement).value,
  //       NUM_OCCURENCES: (document.getElementById('NUM_OCCURENCES') as HTMLInputElement).value
  //     };
    
  //     // Here you would typically send this data to a server
  //     // For this example, we'll just log it to the console
  //     console.log('Form data:', formData);
    
  //     // You could also save it to local storage
  //     // localStorage.setItem('idFormData', JSON.stringify(formData));
    
  //     alert('ID data saved successfully!');
  //   }
  // }
  

  // Method for handling 'Detect Fraud' button click
  detectFraud() {
    console.log('Detect Fraud button clicked');
    // Add your logic for detecting fraud here (e.g., navigate to a different page)
  }
}

