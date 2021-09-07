import React from 'react';

import styles from './years-selector.module.sass';
import { getYearColor } from '../../utils/color.utils';

type Props = {
    onInclude: (value: string) => void;
    onExclude: (value: string) => void;
    yearsList: string[];
    selectedYears: string[];
}

export const YearsSelectorComponent = ({ onInclude, onExclude, yearsList, selectedYears }: Props) => {
    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = evt.target;
        checked ? onInclude(value) : onExclude(value);
    };

    return (
        <div className={styles.container}>
            {yearsList.map(y => {
                const checked = selectedYears.includes(y);
                const labelProps = {
                    className: `${styles.label} ${checked && styles.checked}`,
                    style: { background: `${checked ? getYearColor(y) : 'none'}` },
                    key: y,
                };
                const checkboxProps = {
                    type: 'checkbox',
                    className: styles.input,
                    value: y,
                    checked,
                    onChange: handleChange,
                };
                return <label {...labelProps}>
                    <input {...checkboxProps}/>{' '}{y}
                </label>;
            })}
        </div>
    );
};


