import React from 'react';
import { HgraphDataService } from './hgraph.data.service';

import { Level } from './levels.model';

export interface DataService {
    getLevels(): Promise<Level[]>;

    getYears(): Promise<number[]>;
}

export const hgraphDataService = new HgraphDataService();
export const DataServiceContext =
    React.createContext<DataService>(hgraphDataService);
