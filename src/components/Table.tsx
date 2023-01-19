import { memo, useState, useEffect, useContext } from 'react';
import Row from './Row'
import { TableRow } from "../_model/stateType"
import { getTableData } from '../common/getTableData';
import { stateContext } from '../App';

const Table = ({ location }: { location: number[] }) => {
    const [subLocation, setSubLocation] = useState<number[]>([]);
    const state = useContext(stateContext);
    const [data, setData] = useState<TableRow[]>(getTableData(state.state, location));

    useEffect(() => {
        setSubLocation([...location]);
        setData([...getTableData(state.state, location)])
    }, [location])

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {data.length > 0 && <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr >
                        <th></th>
                        {Object.keys(data[0].data).map((value, index) => <th key={index} className='px-3 py-2'>{value}</th>)}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* To use unique and immutable key, I've used JSON.stgringify() to use ecample-data.json.
                    To set unique value in data is good practice. */}
                    {data.map((value, index) => <Row reLoad={() => { setData([...getTableData(state.state, location)]) }} location={[...subLocation, index]} key={JSON.stringify(value)} />)}
                </tbody>
            </table>}
        </div>

    );
}

export default memo(Table)