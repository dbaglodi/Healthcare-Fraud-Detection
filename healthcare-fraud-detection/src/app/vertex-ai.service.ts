import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VertexAIService {
  private vertexAiEndpoint = `https://us-central1-aiplatform.googleapis.com/v1/projects/${environment.projectId}/locations/us-central1/publishers/google/models/text-bison-001:predict`;

  constructor(private http: HttpClient) {}

  generateText(prompt: string) {
    const requestBody = {
      instances: [{ prompt: prompt }],
      parameters: { temperature: 0.5 },
    };

    return this.http.post(this.vertexAiEndpoint, requestBody, {
      headers: {
        Authorization: `Bearer ${environment.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }
}
