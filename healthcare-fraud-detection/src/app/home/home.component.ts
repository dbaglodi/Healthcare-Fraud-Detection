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
    let isValid: boolean = this.validateData();
    
    if (newIdSection && isValid) {
      const inputs = newIdSection.querySelectorAll('input');
      inputs.forEach((input: HTMLInputElement) => {
        formData[input.id] = input.value;
      });
  
      console.log('Form data:', formData);
      console.log('stringified', JSON.stringify(formData));
      
      // Here you can send the data to a server or process it as needed
      // For example:
      // this.sendDataToServer(formData);
  
      // Or save it to local storage:
      localStorage.setItem('idFormData', JSON.stringify(formData));

      this.loadModel()
  
      alert('ID data saved successfully!');
    } else {
      console.error('Error with submission');
    }
  }

  validateData() {
    const newIdSection = document.getElementById('newIdSection');
    let isValid = true;
  
    if (newIdSection) {
      const inputs = newIdSection.querySelectorAll('input');
      
      inputs.forEach((input: HTMLInputElement) => {
        
        // First check if the input is empty
        if (input.value.trim() === "") {
          // alert("Missing entry for input");
          isValid = false;
          return;  // Exit the loop early if a field is invalid
        }
        
        // Check if input value can be converted to a valid number
        const valueAsNumber = Number(input.value);
        if (isNaN(valueAsNumber)) {
          // alert("Input is not a valid number for input");
          isValid = false;
          return;
        }
      });
    } else {
      // alert("newIdSection not found");
      isValid = false;
    }

    if (!isValid) {
      alert("Invalid Input. Inputs should be non-empty and numerical.");
    }
  
    return isValid;
  }
  

  loadModel() {
    const idFormData = localStorage.getItem('idFormData');
    if (idFormData !== null) {
      const parsedData = JSON.parse(idFormData);

      //process string data to relevant data types
      const processedData = {
        CLM_PMT_AMT: parseFloat(parsedData.CLM_PMT_AMT),
        NCH_PRMRY_PYR_CLM_PD_AMT: parseFloat(parsedData.NCH_PRMRY_PYR_CLM_PD_AMT),
        AT_PHYSN_NPI: parseInt(parsedData.AT_PHYSN_NPI, 10),
        OP_PHYSN_NPI: parseInt(parsedData.OP_PHYSN_NPI, 10),
        OT_PHYSN_NPI: parseInt(parsedData.OT_PHYSN_NPI, 10),
        CLM_PASS_THRU_PER_DIEM_AMT: parseFloat(parsedData.CLM_PASS_THRU_PER_DIEM_AMT),
        NCH_BENE_IP_DDCTBL_AMT: parseFloat(parsedData.NCH_BENE_IP_DDCTBL_AMT),
        NCH_BENE_PTA_COINSRNC_LBLTY_AM: parseFloat(parsedData.NCH_BENE_PTA_COINSRNC_LBLTY_AM),
        NCH_BENE_BLOOD_DDCTBL_LBLTY_AM: parseFloat(parsedData.NCH_BENE_BLOOD_DDCTBL_LBLTY_AM),
        CLM_UTLZTN_DAY_CNT: parseInt(parsedData.CLM_UTLZTN_DAY_CNT, 10),
        PRVDR_NUM_HASH: parseInt(parsedData.PRVDR_NUM_HASH, 10),
        NUM_OCCURENCES: parseInt(parsedData.NUM_OCCURENCES, 10),
      };

      console.log(JSON.stringify(processedData));

      fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: processedData })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Response from Python:', data);
        const result = data['prediction']
        this.fraud = (result == -1)? "Fraud" : "Not Fraud";
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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

