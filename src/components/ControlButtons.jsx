

const ControlButtons = ({handleStart, handleStop}) => {
  return (
    <div className='flex flex-col gap-15 mt-42'>
        <button onClick={handleStart} className="px-10 py-8 border rounded-2xl text-3xl cursor-pointer active:scale-95 active:bg-gray-100">
            <span>START GAME</span>
        </button>
        <button onClick={handleStop} className="px-10 py-8 border rounded-2xl text-3xl cursor-pointer active:scale-95 active:bg-gray-100">
            <span>STOP GAME</span>
        </button>
    </div>
  )
}

export default ControlButtons