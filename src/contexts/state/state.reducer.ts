export type State = {
    selectedYears: string[];
};

export class IncludeYearAction {
    readonly type = 'IncludeYear';

    constructor(readonly value: string) {}
}

export class ExcludeYearAction {
    readonly type = 'ExcludeYear';

    constructor(readonly value: string) {}
}

export type Action = IncludeYearAction | ExcludeYearAction;

export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'IncludeYear':
            return {
                ...state,
                selectedYears: [...state.selectedYears, action.value],
            };

        case 'ExcludeYear':
            return {
                ...state,
                selectedYears: state.selectedYears.filter(
                    (y) => y !== action.value,
                ),
            };

        default:
            return state;
    }
};

export const initialState: State = {
    selectedYears: [],
};
