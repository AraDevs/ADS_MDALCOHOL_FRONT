import { Injectable } from '@angular/core';
import { RequestClient } from '@core/client';
import { EffectsFactoryService } from '@core/services';

@Injectable()
export class ClientsEffects {
  constructor(private effectFactory: EffectsFactoryService, private requestClient: RequestClient) {}
}
