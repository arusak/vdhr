import React, { useState } from 'react';
import { Chart } from './components/chart.container';
import { YearsSelection } from './components/controls/years-selection.container';
import { DataServiceContext, hgraphDataService } from './services/data.service.context';
import { getDefaultYear } from './services/date-time.utils';

function App() {
	const [years, setYears] = useState<string[]>([]);
	const defaultYear = String(getDefaultYear());

	return (
		<div className="App" style={{ display: 'flex', flex: 1 }}>
			<DataServiceContext.Provider value={hgraphDataService}>
				<div style={{ display: 'flex', flex: 1 }}>
					<div style={{ width: '100%' }}>
						<Chart years={years} />
					</div>
					<div>
						<YearsSelection handleChange={setYears} defaultYear={defaultYear} />
					</div>
				</div>
			</DataServiceContext.Provider>
		</div>
	);
}

export default App;
