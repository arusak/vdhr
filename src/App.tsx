import React from 'react';

import styles from './App.module.sass';
import { Chart, YearsSelector } from './components';
import { DataServiceContext, hgraphDataService } from './services';
import { StateProvider } from './contexts/state/state.context';

function App() {
    return (
        <div className={styles.app}>
            <StateProvider>
                <h1 className={styles.h1}>Уровень воды в Рыбинском вдхр.</h1>
                <DataServiceContext.Provider value={hgraphDataService}>
                    <div className={styles.interface}>
                        <div style={{ width: '100%' }}>
                            <Chart />
                        </div>
                        <div>
                            <YearsSelector />
                        </div>
                    </div>
                </DataServiceContext.Provider>
            </StateProvider>
        </div>
    );
}

export default App;
