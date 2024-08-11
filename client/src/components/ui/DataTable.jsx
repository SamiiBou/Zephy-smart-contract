import PropTypes from "prop-types";

export default function DataTable({ data, headers }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers
                .map((e) => e.toLowercase())
                .map((header, cellIndex) => (
                  <td key={cellIndex}>{row[header]}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};
