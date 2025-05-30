import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import GridInput from './GridInput'
import ControlButtons from '../components/ControlButtons'
import { generateUniqueRandomNumbers } from '../utils/generateUniqueRandomNumbers';

const UserGrid = () => {
    const [user1Grid, setUser1Grid] = useState(Array(9).fill(''));
    const [user2Grid, setUser2Grid] = useState(Array(9).fill(''));
    const [numbersdrawn, setNumbersdrawn] = useState([])
    const [winner, setWinner] = useState('')
    const [randomGenNumber, setRandomGenNumber] = useState(null);
    const randomGenRef = useRef(null);

    // testing for values between >=1 and <=9 and updating state
    const handleUser1Change = (index, value) => {
      if (/^[1-9]?$/.test(value)) {
      const newValues = [...user1Grid];
      newValues[index] = value;
      setUser1Grid(newValues);
    }
    };

    const handleUser2Change = (index, value) => {
      if (/^[1-9]?$/.test(value)) {
      const newValues = [...user2Grid];
      newValues[index] = value;
      setUser2Grid(newValues);
    }
    };

    const handleStart = async () => {
  const isUser1GridValid = user1Grid.every(val => /^[1-9]$/.test(val));
  const isUser2GridValid = user2Grid.every(val => /^[1-9]$/.test(val));

  // Checking for duplicates in user1Grid
  const user1Unique = new Set(user1Grid).size === user1Grid.length;
  // here also the same - Checking for duplicates in user2Grid
  const user2Unique = new Set(user2Grid).size === user2Grid.length;

  if (!isUser1GridValid || !isUser2GridValid) {
    alert("All grid values must be filled with numbers from 1 to 9.");
    return;
  }

  if (!user1Unique) {
    alert("User 1 grid contains duplicate values.");
    return;
  }

  if (!user2Unique) {
    alert("User 2 grid contains duplicate values.");
    return;
  }

  // first removing old data from db, then add
  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/game/stop`);

  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/game/start`, {
    user1Grid: user1Grid,
    user2Grid: user2Grid
  });

  if (!randomGenRef.current) {
    randomGenRef.current = generateUniqueRandomNumbers(setRandomGenNumber);
  }
  randomGenRef.current.start();
}


    const handleStop = () => {        
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/game/stop`)
        randomGenRef.current?.stop();
    }

    useEffect(() => {
    if (randomGenNumber !== null) {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/game/draw`, {
            number: randomGenNumber,
        }).then(() => {
            // Delay state check to allow change stream to update winner
            return new Promise(resolve => setTimeout(resolve, 1)); // 
        }).then(() => {
            return axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/game/state`);
        }).then((response) => {
            const { numbersCut, winner } = response.data;

            setNumbersdrawn(numbersCut);
            setWinner(winner);

            if (winner && randomGenRef.current) {
                randomGenRef.current.stop();
            }

            if (winner) {
            alert(`🎉 ${winner} wins the game! Congratulations! 🎊\n\nClick OK to stop the game.`);
            handleStop();
            }

        }).catch((err) => {
            console.error("Error updating game state:", err);
        });
    }
}, [randomGenNumber]);




  return (
    <div className='flex flex-col gap-20 mt-10'>
       <h1 className='font-bold text-3xl'>EL Lotteria 🎰</h1>

        <div className='flex gap-20'>
        <div className='flex flex-col gap-10'>
        <div>
            <h1 className='bold text-xl mb-5'>User 1 Grid {winner=='User 1'? '(Winner🎉)': ''}</h1>
            <div className='grid grid-cols-3 w-[250px] gap-4'>
            {user1Grid.map((val, idx) => {
                const lastDrawn = numbersdrawn[numbersdrawn.length - 1];
                const isCut = numbersdrawn.includes(Number(val)) 
                && !(winner !== 'User 1' && Number(val) === lastDrawn);
            return <GridInput key={idx} value={isCut? '❌' + val: val} onChange={(e) => handleUser1Change(idx, e.target.value)} disabled={isCut}/>
        })}
        </div>

        </div>

        <div>
            <h1 className='bold text-xl mb-5'>User 2 Grid {winner=='User 2'? '(Winner🎉)': ''}</h1>
            <div className='grid grid-cols-3 w-[250px] gap-4'>
            {user2Grid.map((val, idx) => {
                const lastDrawn = numbersdrawn[numbersdrawn.length - 1];
                const isCut = numbersdrawn.includes(Number(val)) 
                && !(winner !== 'User 2' && Number(val) === lastDrawn);
            return <GridInput key={idx} value={isCut? '❌' + val: val} onChange={(e) => handleUser2Change(idx, e.target.value)} disabled={isCut}/>
        })}
        </div>
        </div>
    </div>

    <ControlButtons handleStart={handleStart} handleStop={handleStop}/>

    </div>
    <div className='text-base'>Made with ❤️ by Dipraj Ray</div>
    </div>
    
    

  )
}

export default UserGrid