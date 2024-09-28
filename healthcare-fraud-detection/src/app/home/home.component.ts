import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor() {}

  // Method for handling 'Find ID' button click
  findIdOld() {
    // You can add your logic for finding an ID here
    console.log('Find ID button clicked');
  }

  // Method to dynamically create the form when 'Create ID' is clicked
  createId() {
    const newIdSection = document.getElementById('newIdSection');
    
    if (newIdSection) {
      const formSection = document.createElement('div');
      formSection.classList.add('create-id-form');
      
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
        <button (click)="createId()">Create ID</button>
        <br />
      `;
      
      newIdSection.appendChild(formSection);
    }
  }
}
