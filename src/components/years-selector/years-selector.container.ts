import React, { useContext, useEffect, useState } from 'react';
import { DataServiceContext } from '../../services';
import { YearsSelectorComponent } from './years-selector.component';

export type YearsSelectorProps = {
    onChange: (selectedYears: string[]) => void;
    selectedYears: string[];
}

export const YearsSelector = ({ onChange, selectedYears }: YearsSelectorProps) => {
    const service = useContext(DataServiceContext);
    const [yearsList, setYearsList] = useState<string[]>([]);
    useEffect(() => {
        service.getYears().then(years => setYearsList(years.map(String)));
    }, [service]);

    return React.createElement(YearsSelectorComponent, { onChange, yearsList, selectedYears });
};
