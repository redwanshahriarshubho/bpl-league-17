import React, { use } from 'react';
import PlayerCard from '../PlayerCard/PlayerCard';

const AvailablePlayers = ({ playersPromise, setAvailableBalance, availableBalance, setPurchasedPlayers, purchasedPlayers, parsePrice }) => {
  const players = use(playersPromise);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {players.map(player => (
        <PlayerCard
          key={player.player_name}
          player={player}
          setAvailableBalance={setAvailableBalance}
          availableBalance={availableBalance}
          setPurchasedPlayers={setPurchasedPlayers}
          purchasedPlayers={purchasedPlayers}
          parsePrice={parsePrice}
        />
      ))}
    </div>
  );
};

export default AvailablePlayers;
