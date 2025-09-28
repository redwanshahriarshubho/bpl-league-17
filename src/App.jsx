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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <Navbar availableBalance={availableBalance} />
      
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 relative z-10">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-xs font-bold tracking-wider">
            BPL 2024
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            Player Auction
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Build your championship-winning team
          </p>
        </div>

        {/* Toggle Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-6">
          <h2 className="text-3xl font-bold text-gray-100">
            {toggle ? 'Available Players' : `Your Squad (${purchasedPlayers.length}/6)`}
          </h2>
          
          <div className="flex bg-gray-800/50 backdrop-blur-sm rounded-full p-1 border border-gray-700 shadow-lg">
            <button
              onClick={() => setToggle(true)}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                toggle 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-900 shadow-lg shadow-cyan-500/20 transform scale-105' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Available
            </button>
            <button
              onClick={() => setToggle(false)}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                !toggle 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-gray-900 shadow-lg shadow-purple-500/20 transform scale-105' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Selected ({purchasedPlayers.length})
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-gray-800/30 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden transition-all duration-500 hover:border-gray-600/50">
          {toggle ? (
            <Suspense 
              fallback={
                <div className="flex justify-center items-center h-96">
                  <div className="text-center">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-gray-700 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-cyan-500 border-r-purple-500 rounded-full animate-spin"></div>
                    </div>
                    <p className="mt-6 text-gray-400 font-medium text-lg">Loading players...</p>
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
        <div className="mt-10 text-center">
          <div className="inline-block px-6 py-3 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700">
            <p className="text-gray-300 font-medium">
              Budget remaining: <span className="text-cyan-400 font-bold">৳{availableBalance.toLocaleString()}</span>
            </p>
          </div>
        </div>
      </div>
      
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        className="text-sm"
        toastClassName="bg-gray-800/90 backdrop-blur-lg border border-gray-700 rounded-xl shadow-2xl"
        bodyClassName="p-4 text-gray-100"
        progressClassName="bg-gradient-to-r from-cyan-500 to-purple-500 h-1"
      />
    </div>
  );
}

export default App;