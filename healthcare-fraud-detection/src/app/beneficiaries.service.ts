import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeneficiariesService {
  metadataList:any = [];
  pairs:any = new Map<any, any>();
  private apiUrl = 'http://localhost:3000/api/data';

  constructor(private http: HttpClient) { }

  // Get JSON data
  getData(): Observable<any> {
    this.http.get<any>(this.apiUrl).subscribe(response => {
      this.metadataList = response;
      for (let item of this.metadataList) {
        this.pairs.put(item.DESYNPUF_ID, {
          CLM_ID: item.CLM_ID,
          SEGMENT: item.SEGMENT,
          CLM_FROM_DT: item.CLM_FROM_DT,
          CLM_THRU_DT: item.CLM_THRU_DT,
          PRVDR_NUM: item.PRVDR_NUM,
          CLM_PMT_AMT: item.CLM_PMT_AMT,
          NCH_PRMRY_PYR_CLM_PD_AMT: item.NCH_PRMRY_PYR_CLM_PD_AMT, 
          AT_PHYSN_NPI: item.AT_PHYSN_NPI,
          OP_PHYSN_NPI: item.OP_PHYSN_NPI, 
          OT_PHYSN_NPI: item.OT_PHYSN_NPI, 
          CLM_ADMSN_DT: item.OT_PHYSN_NPI, 
          ADMTNG_ICD9_DGNS_CD: item.OT_PHYSN_NPI,
          CLM_PASS_THRU_PER_DIEM_AMT: item.CLM_PASS_THRU_PER_DIEM_AMT, 
          NCH_BENE_IP_DDCTBL_AMT: item.NCH_BENE_IP_DDCTBL_AMT,
          NCH_BENE_PTA_COINSRNC_LBLTY_AM: item.NCH_BENE_PTA_COINSRNC_LBLTY_AM, 
          NCH_BENE_BLOOD_DDCTBL_LBLTY_AM: item.NCH_BENE_BLOOD_DDCTBL_LBLTY_AM,
          CLM_UTLZTN_DAY_CNT: item.CLM_UTLZTN_DAY_CNT, 
          NCH_BENE_DSCHRG_DT: item.NCH_BENE_DSCHRG_DT, 
          CLM_DRG_CD: item.CLM_DRG_CD,
          PRVDR_NUM_HASH: item.PRVDR_NUM_HASH, 
          NUM_OCCURENCES: item.NUM_OCCURENCES,
          fraud_prediction: item.fraud_prediction
        });
      }
    });
    return of(this.pairs);
  }

  // Update JSON data
  updateData(newData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newData);
  }
}