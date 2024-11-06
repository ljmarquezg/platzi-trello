export default interface ToDo {
    id: string;
    title: string;
    completed: boolean;
};

export interface Column {
    title: string;
    todos: ToDo[];
    addNew: boolean;
    optionsOpen: boolean;
};