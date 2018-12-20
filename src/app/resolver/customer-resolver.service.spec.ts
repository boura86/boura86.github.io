import { TestBed } from '@angular/core/testing';

import { CustomerResolver } from './customer-resolver.service';

describe('CustomerResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerResolver = TestBed.get(CustomerResolver);
    expect(service).toBeTruthy();
  });
});
