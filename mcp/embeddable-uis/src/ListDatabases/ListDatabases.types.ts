export interface Database {
    name: string;
    size: number;
}

export interface ListDatabasesProps {
    databases: Array<Database>;
    darkMode: boolean;
}