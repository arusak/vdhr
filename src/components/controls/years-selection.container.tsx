import React from 'react';
import { DataService, DataServiceContext } from '../../services/data.service.context';
import { ChangeHandler } from './change-handler';

type YearsSelectionProps = ChangeHandler<string[]> & { defaultYear: string };
type YearsSelectionState = { years: string[], selectedYears: string[] };

export class YearsSelection extends React.Component<YearsSelectionProps, YearsSelectionState> {
	static contextType = DataServiceContext;

	state = {
		years: [],
		selectedYears: [],
	};

	componentDidMount() {
		const service: DataService = this.context;
		service.getYears().then(years => this.setState({ years: years.map(String) }));
		let selectedYears = [this.props.defaultYear];
		this.setState({ selectedYears });
		this.props.handleChange(selectedYears);
	}

	render() {
		const { handleChange } = this.props;
		const { selectedYears, years } = this.state;

		const onChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
			const selectedYears = [...evt.target.options].filter(option => option.selected).map(option => option.value);
			this.setState({ selectedYears });
			handleChange(selectedYears);
		};

		return (
			<div>
				<select multiple={true}
				        value={selectedYears}
				        size={years.length}
				        onChange={onChange}>
					{years.map(year => <option value={year}>{year}</option>)}
				</select>
			</div>
		);
	}
}


