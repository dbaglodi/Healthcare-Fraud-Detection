import { Component } from '@angular/core';
import { PredictionService } from '../prediction.service';
import { VertexAIService } from '../vertex-ai.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  userInput: number[] = [];  // Collect input as array
  prediction: string | null = null;
  response: string = '';

  constructor(private predictionService: PredictionService, private vertexAIService: VertexAIService) {}
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
