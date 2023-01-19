import { useState, memo, useContext, useEffect } from 'react';
import Table from './Table';
import { TableRow } from "../_model/stateType";
import { stateContext } from '../App';
import { getRowData } from '../common/getRowData';
import { getTableData } from '../common/getTableData';

const Row = ({ location, reLoad }: { location: number[], reLoad: () => void }) => {
    const [isClick, setIsClick] = useState(false);
    const state = useContext(stateContext);
    const [data, setData] = useState<TableRow>(getRowData(state.state, location));
    const dataKeys = Object.keys(data.data);
    const tableName = Object.keys(data.kids)[0] || null;

    const [subLocation, setSubLocation] = useState<number[]>([]);

    useEffect(() => {
        setSubLocation([...location]);
        setData(getRowData(state.state, location))
    }, [location]);

    function handleClick() {
        setIsClick((isClick) => !isClick);
    }

    function newState(state: TableRow[], id: number) {
        if (id === subLocation.length - 1) {
            state.splice(subLocation[id], 1);
            return state;
        } else {
            const subTableName = Object.keys(state[subLocation[id]].kids)[0];
            state[subLocation[id]].kids[subTableName].records = newState(state[subLocation[id]].kids[subTableName].records, id + 1);
            return state;
        }
    }

    function handleDelete() {
        state.setState(newState(state.state, 0));
        reLoad();
    }

    return (<>
        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
            <td className="w-2 p-2">
                <div className="flex items-center">
                    <input type="checkbox" checked={!!isClick} onChange={handleClick} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                </div>
            </td>
            {dataKeys.map((value, index) => <td key={index} className='px-3 py-3'>{data.data[value]}</td>)}
            <td className='px-3 py-3 items-right'>
                <div className="flex items-center">
                    <button onClick={handleDelete} className="bg-red-500 text-white text-[10px] px-1 py-[2px] rounded">Del</button>
                </div>
            </td>
        </tr>
        {isClick && tableName && getTableData(state.state, subLocation).length > 0 && <>
            <tr>
                <td></td>
                <td colSpan={dataKeys.length} className='px-3 py-2'>{tableName}</td>
            </tr>
            <tr>
                <td></td>
                <td colSpan={dataKeys.length}><Table location={subLocation} /></td>
            </tr>
        </>}
    </>);
}

export default memo(Row)