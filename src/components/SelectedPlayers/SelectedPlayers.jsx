import React from 'react';
import SelectedCard from '../SelectedCard/SelectedCard';

const SelectedPlayers = ({ purchasedPlayers, removePlayer }) => {
  return (
    <div>
      {purchasedPlayers.length === 0 ? (
        <p className="text-center text-gray-500">No players selected yet.</p>
      ) : (
        purchasedPlayers.map(player => (
          <SelectedCard key={player.player_name} player={player} removePlayer={removePlayer} />
        ))
      )}
    </div>
  );
};

export default SelectedPlayers;
