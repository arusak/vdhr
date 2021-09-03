import React, { useState } from 'react';

import styles from './App.module.sass';
import { Chart, YearsSelector } from './components';
import { DataServiceContext, getDefaultYear, hgraphDataService } from './services';

function App() {
    const [selectedYears, setSelectedYears] = useState([getDefaultYear()]);

    return (
        <div className={styles.app}>
            <h1 className={styles.h1}>Уровень воды в Рыбинском вдхр.</h1>
            <DataServiceContext.Provider value={hgraphDataService}>
                <div className={styles.interface}>
                    <div style={{ width: '100%' }}>
                        <Chart years={selectedYears}/>
                    </div>
                    <div>
                        <YearsSelector
                            onChange={setSelectedYears}
                            selectedYears={selectedYears}/>
                    </div>
                </div>
            </DataServiceContext.Provider>
        </div>
    );
}

export default App;
