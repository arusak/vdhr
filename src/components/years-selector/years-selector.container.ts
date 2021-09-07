import React, { useContext, useEffect, useState } from 'react';
import { DataServiceContext } from '../../services';
import { YearsSelectorComponent } from './years-selector.component';
import { StateContext } from '../../contexts/state/state.context';
import {
    ExcludeYearAction,
    IncludeYearAction,
} from '../../contexts/state/state.reducer';

export const YearsSelector = () => {
    const service = useContext(DataServiceContext);
    const [yearsList, setYearsList] = useState<string[]>([]);
    const [{ selectedYears }, dispatch] = useContext(StateContext);
    useEffect(() => {
        service.getYears().then((years) => setYearsList(years.map(String)));
    }, [service]);

    const onInclude = (year: string) => dispatch(new IncludeYearAction(year));
    const onExclude = (year: string) => dispatch(new ExcludeYearAction(year));

    return React.createElement(YearsSelectorComponent, {
        onInclude,
        onExclude,
        yearsList,
        selectedYears,
    });
};
