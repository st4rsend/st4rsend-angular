import { TestBed } from '@angular/core/testing';

import { DocService } from './doc.service';

describe('DocService', () => {
  beforeEach(() => TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } }));

  it('should be created', () => {
    const service: DocService = TestBed.get(DocService);
    expect(service).toBeTruthy();
  });
});
