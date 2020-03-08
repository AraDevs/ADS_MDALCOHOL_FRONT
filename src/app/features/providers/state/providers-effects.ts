import { Injectable } from '@angular/core';
import { RequestClient } from '@core/client';
import { EffectsFactoryService } from '@core/services';

@Injectable()
export class ProvidersEffects {
  constructor(private effectFactory: EffectsFactoryService, private requestClient: RequestClient) {}
}
