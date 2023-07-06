export interface Employee {
    id: number ;
    age: string;
    name: string;
    position: string;
    office: string;
    startDate: string;
    salary: string;
    [key: string]: any;
}

export const PopUpVariant = {
    ADD_NEW_EMPLOYEE: 'ADD_NEW_EMPLOYEE',
    EDIT_EMPLOYEE: 'EDIT_EMPLOYEE',
    CONFIRM: 'CONFIRM',
}

export const SortProperties = {
    ID: 'id',
    AGE: 'age',
    NAME: 'name',
    POSITION: 'position',
    OFFICE: 'office',
    START_DATE: 'startDate',
    SALARY: 'salary'
}

export const TABLE_HEADERS = [{
        title: 'Id',
        sortProperty: SortProperties.ID,
    },
    {
        title: 'Name',
        sortProperty: SortProperties.NAME,
    },
    {
        title: 'Position',
        sortProperty: SortProperties.POSITION,
    },
    {
        title: 'Office',
        sortProperty: SortProperties.OFFICE,
    },
    {
        title: 'Age',
        sortProperty: SortProperties.AGE,
    },
    {
        title: 'Start Date',
        sortProperty: SortProperties.START_DATE,
    },
    {
        title: 'Salary',
        sortProperty: SortProperties.SALARY,
    },
];

export const NUM_OF_ROWS_BTNS = [{
        numOfRows: 10,
    },
    {
        numOfRows: 15,
    },
    {
        numOfRows: 20,
    },
];