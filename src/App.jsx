import { useState, Suspense } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar';
import AvailablePlayers from './components/AvailablePlayers/AvailablePlayers';
import SelectedPlayers from './components/SelectedPlayers/SelectedPlayers';

const fetchPlayers = async () => {
  const res = await fetch('/players.json');
  return res.json();
};
const playersPromise = fetchPlayers();

function App() {
  const [toggle, setToggle] = useState(true);
  const [availableBalance, setAvailableBalance] = useState(10000000);
  const [purchasedPlayers, setPurchasedPlayers] = useState([]);

  const parsePrice = (price) => {
    return parseInt(price.replace(/[^0-9]/g, ''));
  };

  const removePlayer = (player) => {
    setPurchasedPlayers(purchasedPlayers.filter(p => p.player_name !== player.player_name));
    setAvailableBalance(availableBalance + parsePrice(player.price));
    toast.success(`${player.player_name} removed!`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar availableBalance={availableBalance} />
      <div className="max-w-6xl mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {toggle ? 'Available BPL Players' : `Selected BPL Players (${purchasedPlayers.length}/6)`}
          </h1>
          <div className="space-x-2">
            <button
              onClick={() => setToggle(true)}
              className={`px-4 py-2 rounded-l-xl ${toggle ? 'bg-yellow-400' : 'bg-gray-200'} border`}
            >
              Available
            </button>
            <button
              onClick={() => setToggle(false)}
              className={`px-4 py-2 rounded-r-xl ${!toggle ? 'bg-yellow-400' : 'bg-gray-200'} border`}
            >
              Selected ({purchasedPlayers.length})
            </button>
          </div>
        </div>
        {toggle ? (
          <Suspense fallback={<div className="text-center"><span className="loading loading-spinner loading-lg"></span></div>}>
            <AvailablePlayers
              playersPromise={playersPromise}
              setAvailableBalance={setAvailableBalance}
              availableBalance={availableBalance}
              setPurchasedPlayers={setPurchasedPlayers}
              purchasedPlayers={purchasedPlayers}
              parsePrice={parsePrice}
            />
          </Suspense>
        ) : (
          <SelectedPlayers purchasedPlayers={purchasedPlayers} removePlayer={removePlayer} />
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;