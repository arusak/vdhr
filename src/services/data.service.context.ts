import React from 'react';
import { HgraphDataService } from './hgraph.data.service';

import { Observation } from './observation.model';

export interface DataService {
    getObservations(): Promise<Observation[]>;

    getYears(): Promise<number[]>;
}

export const hgraphDataService = new HgraphDataService();
export const DataServiceContext =
    React.createContext<DataService>(hgraphDataService);
