
const GridInput = ({ value, onChange }) => {
  return (
    <div>
        <input type="text" value={value} maxLength={1} onChange={onChange} class="w-15 h-10 text-center text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>
  )
}

export default GridInput