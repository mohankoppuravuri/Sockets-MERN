import React          from 'react';
import TableHead      from '@material-ui/core/TableHead';
import TableCell      from '@material-ui/core/TableCell';
import TableRow       from '@material-ui/core/TableRow';

const TableHeader = (props) => {

	const {css, data} = props;

	return (
		<TableHead>
			<TableRow>
				{data.map ( ( value, index) => {
					return (
						<TableCell key = {index} className = {css + '-column-'+ index}> {value} </TableCell>
					);
				})}
			</TableRow> 
		</TableHead>
	);
}

export default TableHeader;
