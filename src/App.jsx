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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar availableBalance={availableBalance} />
      
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            BPL Player Auction
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Build your dream team from Bangladesh Premier League's top players
          </p>
        </div>

        {/* Toggle Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {toggle ? 'Available Players' : `Your Squad (${purchasedPlayers.length}/6)`}
          </h2>
          
          <div className="flex bg-gray-200 rounded-full p-1 shadow-inner">
            <button
              onClick={() => setToggle(true)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                toggle 
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md transform scale-105' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Available
            </button>
            <button
              onClick={() => setToggle(false)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                !toggle 
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md transform scale-105' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Selected ({purchasedPlayers.length})
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
          {toggle ? (
            <Suspense 
              fallback={
                <div className="flex justify-center items-center h-96">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500 mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading players...</p>
                  </div>
                </div>
              }
            >
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

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Budget remaining: ৳{availableBalance.toLocaleString()}</p>
        </div>
      </div>
      
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        className="text-sm"
        toastClassName="bg-white shadow-lg rounded-lg"
        bodyClassName="p-4"
        progressClassName="bg-gradient-to-r from-yellow-400 to-yellow-500"
      />
    </div>
  );
}

export default App;