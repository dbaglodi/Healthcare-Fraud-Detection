import { TestBed } from '@angular/core/testing';

import { VertexAiService } from './vertex-ai.service';

describe('VertexAiService', () => {
  let service: VertexAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VertexAiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
