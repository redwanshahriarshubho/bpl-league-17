import React from 'react';
import removeIcon from '../../assets/Frame.png';

const SelectedCard = ({ player, removePlayer }) => {
  return (
    <div className="flex justify-between items-center p-4 border rounded-xl mb-2">
      <div className="flex items-center">
        <img src={player.player_image} alt={player.player_name} className="w-12 h-12 rounded-xl mr-4" />
        <div>
          <h3 className="font-semibold">{player.player_name}</h3>
          <p className="text-sm text-gray-600">{player.playing_role}</p>
        </div>
      </div>
      <button onClick={() => removePlayer(player)}>
        <img src={removeIcon} alt="Remove" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default SelectedCard;
