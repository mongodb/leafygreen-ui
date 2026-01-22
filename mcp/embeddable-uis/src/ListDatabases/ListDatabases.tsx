import React, { type ReactElement } from "react";

import { Cell, HeaderCell, HeaderRow, Row, Table, TableBody, TableHead } from "@leafygreen-ui/table";
import { Body } from "@leafygreen-ui/typography";

import { AmountTextStyles, getContainerStyles } from "./ListDatabases.styles";
import { ListDatabasesProps } from "./ListDatabases.types";

function formatBytes(bytes: number): string {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

export const ListDatabases = ({
    databases,
    darkMode,
}: ListDatabasesProps): ReactElement | null => {
    return (
        <div className={getContainerStyles(darkMode)}>
            <Body className={AmountTextStyles} darkMode={darkMode}>
                Your cluster has <strong>{databases.length} databases</strong>:
            </Body>
            <Table darkMode={darkMode}>
                <TableHead>
                    <HeaderRow>
                        <HeaderCell>Database</HeaderCell>
                        <HeaderCell>Size</HeaderCell>
                    </HeaderRow>
                </TableHead>
                <TableBody>
                    {databases.map((db) => (
                        <Row key={db.name}>
                            <Cell>{db.name}</Cell>
                            <Cell>{formatBytes(db.size)}</Cell>
                        </Row>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};