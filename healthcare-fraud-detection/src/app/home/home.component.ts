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
  generateText() {
    const prompt = 'Hello world!';
    this.vertexAIService.generateText(prompt).subscribe((response: any) => {
      this.response = response.predictions[0];
    });
  }

}
