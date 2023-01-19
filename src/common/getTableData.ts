import { TableRow } from "../_model/stateType";

export function getTableData(tableData: TableRow[], location: number[]) {

    function getSubTableData(state: TableRow[], id: number): TableRow[] {
        if (id >= location.length) {
            return state;
        } else {
            const subTableName = Object.keys(state[location[id]].kids)[0];
            return getSubTableData(state[location[id]].kids[subTableName].records, id + 1);
        }
    }
    return getSubTableData(tableData, 0);
}