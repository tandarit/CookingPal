import { TestBed } from '@angular/core/testing';

import { RecipesResorverService } from './recipes-resorver.service';

describe('RecipesResorverService', () => {
  let service: RecipesResorverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipesResorverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
