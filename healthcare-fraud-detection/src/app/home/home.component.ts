import { Component } from '@angular/core';
import { PredictionService } from '../prediction.service';
import { VertexAIService } from '../vertex-ai.service';
import { BeneficiariesService } from '../beneficiaries.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  id: string | null = null;

  findIdOld() {
    // Simulating an asynchronous operation to find an ID
    setTimeout(() => {
      this.id = 'USER_' + Math.floor(Math.random() * 1000);
      console.log('ID found:', this.id);
    }, 1000);
  }

  findId(person: string): string {
    
    return ""
  }

  userInput: number[] = [];  // Collect input as array
  prediction: string | null = null;
  response: string = '';
  // datamap: Map<any, any> = new Map<any, any>;

  // loadData(): void {
  //   this.beneficiariesService.getData()
  //     .subscribe(data => {
  //       for(let d of data) {
  //         data.put(d.desynpufid)
  //       }

  //     });
  // }



  constructor(private predictionService: PredictionService, private vertexAIService: VertexAIService, private beneficiariesService: BeneficiariesService) {}
  // Function to get prediction
  getPrediction(): void {
    this.predictionService.getPrediction(this.userInput)
      .subscribe(data => {
        this.prediction = data.prediction;
      });
  }
  generateText(CLM_PMT_AMT:any, NCH_PRMRY_PYR_CLM_PD_AMT:any, CLM_PASS_THRU_PER_DIEM_AMT:any, NCH_BENE_IP_DDCTBL_AMT:any, NCH_BENE_PTA_COINSRNC_LBLTY_AM:any, NCH_BENE_BLOOD_DDCTBL_LBLTY_AM:any, CLM_UTLZTN_DAY_CNT:any, PRVDR_NUM:any, NUM_OCCURENCES:any) {
    const prompt = `Given the following parameters for an inpatient beneficiary:
  [Claim Payment Amount: ${CLM_PMT_AMT},
  NCH  Primary Payer Claim Paid Amount: ${NCH_PRMRY_PYR_CLM_PD_AMT},
  Claim Pass Thru Per Diem Amount: ${CLM_PASS_THRU_PER_DIEM_AMT},
  NCH Beneficiary Inpatient Deductible Amount: ${NCH_BENE_IP_DDCTBL_AMT},
  NCH Beneficiary Part A Coinsurance Liability Amount: ${NCH_BENE_PTA_COINSRNC_LBLTY_AM},
  NCH Beneficiary Blood Deductible Liability Amount: ${NCH_BENE_BLOOD_DDCTBL_LBLTY_AM},
  Claim Utilization Day Count: ${CLM_UTLZTN_DAY_CNT},
  Provider Institution: ${PRVDR_NUM}
  Frequency of Beneficiary Code: ${NUM_OCCURENCES}],
  explain why this beneficiary's claim is likely to be fraud. Limit your output to at most 3 sentences.`;
    this.vertexAIService.generateText(prompt).subscribe((response: any) => {
      this.response = response.predictions[0];
    });
  }

}
