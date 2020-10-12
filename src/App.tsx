import React, {useState} from 'react';

import styles from './App.module.sass';
import {Chart} from './components/chart/chart.container';
import {YearsSelection} from './components/controls/years-selection.component';
import {DataServiceContext, hgraphDataService} from './services/data.service.context';
import {getDefaultYear} from './services/date-time.utils';

function App() {
    const [years, setYears] = useState<string[]>([]);
    const defaultYear = String(getDefaultYear());

    return (
        <div className={styles.app}>
            <h1 className={styles.h1}>Уровень воды в Рыбинском вдхр.</h1>
            <DataServiceContext.Provider value={hgraphDataService}>
                <div className={styles.interface}>
                    <div style={{width: '100%'}}>
                        <Chart years={years}/>
                    </div>
                    <div>
                        <YearsSelection handleChange={setYears} defaultYear={defaultYear}/>
                    </div>
                </div>
            </DataServiceContext.Provider>
        </div>
    );
}

export default App;
