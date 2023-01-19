import { TableRow } from "../_model/stateType";

export function getRowData(tableData: TableRow[], location: number[]) {
    // console.log(location)
    function getSubTableData(state: TableRow[], id: number): TableRow {

        if (id >= location.length - 1) {
            return state[location[id]];
        } else {
            const subTableName = Object.keys(state[location[id]].kids)[0];
            return getSubTableData(state[location[id]].kids[subTableName].records, id + 1);
        }
    }
    // console.log(getSubTableData(tableData, 0))
    return getSubTableData(tableData, 0);
}