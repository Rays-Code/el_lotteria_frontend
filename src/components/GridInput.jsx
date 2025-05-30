
const GridInput = ({ value, onChange }) => {
  return (
    <div>
        <input type="text" value={value} maxLength={1} onChange={onChange} class="w-20 h-20 text-center text-2xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>
  )
}

export default GridInput