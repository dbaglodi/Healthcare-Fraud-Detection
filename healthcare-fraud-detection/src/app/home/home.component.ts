import { Component } from '@angular/core';
import { PredictionService } from '../prediction.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  userInput: number[] = [];  // Collect input as array
  prediction: string | null = null;

  constructor(private predictionService: PredictionService) {}
  // Function to get prediction
  getPrediction(): void {
    this.predictionService.getPrediction(this.userInput)
      .subscribe(data => {
        this.prediction = data.prediction;
      });
  }

}
