import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  formVisible = false; // To track visibility of the Create ID form
  isIdSectionVisible = false; // To track visibility of the Create ID section

  constructor(private router: Router) {}

  // Method for handling 'Find ID' button click
  findIdOld() {
    console.log('Find ID button clicked');
  }

  // Method to toggle the Create ID section
  createId() {
    this.isIdSectionVisible = !this.isIdSectionVisible; // Toggle visibility

    if (this.isIdSectionVisible) {
      const newIdSection = document.getElementById('newIdSection');
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
            <label>PRVDR_NUM_HASH</label>
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
      const newIdSection = document.getElementById('newIdSection');
      if (newIdSection) {
        newIdSection.innerHTML = ''; // Clear the form section
      }
    }
  }

  // Method for handling 'Detect Fraud' button click
  detectFraud() {
    console.log('Detect Fraud button clicked');
    // Add your logic for detecting fraud here (e.g., navigate to a different page)
  }
}

