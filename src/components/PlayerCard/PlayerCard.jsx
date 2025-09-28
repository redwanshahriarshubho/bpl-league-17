import React, { useState } from 'react';
import { toast } from 'react-toastify';
import userIcon from '../../assets/user-1.png';
import flagIcon from '../../assets/report-1.png';

const PlayerCard = ({ player, setAvailableBalance, availableBalance, setPurchasedPlayers, purchasedPlayers, parsePrice }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    const price = parsePrice(player.price);
    if (availableBalance < price) {
      toast.error('Not enough coins!');
      return;
    }
    if (purchasedPlayers.length >= 6) {
      toast.error('Maximum 6 players can be selected!');
      return;
    }
    setIsSelected(true);
    setAvailableBalance(availableBalance - price);
    setPurchasedPlayers([...purchasedPlayers, player]);
    toast.success(`${player.player_name} selected!`);
  };

  return (
    <div className="card bg-white shadow-md p-4 rounded-xl">
      <img src={player.player_image} alt={player.player_name} className="w-full h-48 object-cover rounded-t-xl" />
      <div className="p-4">
        <div className="flex items-center mb-2">
          <img src={userIcon} alt="User" className="w-6 h-6 mr-2" />
          <h2 className="text-xl font-bold">{player.player_name}</h2>
        </div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <img src={flagIcon} alt="Flag" className="w-5 h-5 mr-2" />
            <span>{player.player_country}</span>
          </div>
          <span className="badge badge-primary">{player.playing_role}</span>
        </div>
        <div className="border-t pt-2">
          <div className="flex justify-between">
            <span>Rating:</span>
            <span>{player.rating}</span>
          </div>
          <div className="flex justify-between">
            <span>Batting:</span>
            <span>{player.batting_style}</span>
          </div>
          <div className="flex justify-between">
            <span>Bowling:</span>
            <span>{player.bowling_style}</span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="font-bold">Price: {player.price}</span>
            <button
              className={`btn ${isSelected ? 'btn-success cursor-not-allowed' : 'btn-primary'}`}
              onClick={handleSelect}
              disabled={isSelected}
            >
              {isSelected ? 'Selected' : 'Choose Player'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
