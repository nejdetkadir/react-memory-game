import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import useGame from "./../../hooks/useGame";
import { GAME_SETTINGS } from "./../../constants"

type Props = {}

type Inputs = {
  horizontalCardsCount: number,
  verticalCardsCount: number,
}

const GameSettings: React.FC<Props> = () => {
  const { gameSettings, setGameSettings } = useGame();

  const { register, watch } = useForm<Inputs>({
    defaultValues: {
      horizontalCardsCount: gameSettings.horizontalCardsCount,
      verticalCardsCount: gameSettings.verticalCardsCount,
    }
  });

  const watchHorizontalCardsCount = watch("horizontalCardsCount");
  const watchVerticalCardsCount = watch("verticalCardsCount");

  useEffect(() => {
    let newGameSettings = {
      ...gameSettings
    };

    if (watchHorizontalCardsCount >= GAME_SETTINGS.MINIMUM_HORIZONTAL_CARDS_COUNT
      && watchHorizontalCardsCount <= GAME_SETTINGS.MAXIMUM_HORIZONTAL_CARDS_COUNT) {
      newGameSettings.horizontalCardsCount = watchHorizontalCardsCount;
    }

    if (watchVerticalCardsCount >= GAME_SETTINGS.MINIMUM_VERTICAL_CARDS_COUNT
      && watchVerticalCardsCount <= GAME_SETTINGS.MAXIMUM_VERTICAL_CARDS_COUNT) {
      newGameSettings.verticalCardsCount = watchVerticalCardsCount;
    }

    setGameSettings(newGameSettings);
  }, [watchHorizontalCardsCount, watchVerticalCardsCount])

  return (
    <div className='grid grid-cols-1 gap-6'>
      <div>
        <label>Horizontal cards count {gameSettings.horizontalCardsCount}</label>
        <input
          className='block w-full px-4 py-2'
          {...register('horizontalCardsCount')}
          type="range"
          min={GAME_SETTINGS.MINIMUM_HORIZONTAL_CARDS_COUNT}
          max={GAME_SETTINGS.MAXIMUM_HORIZONTAL_CARDS_COUNT}
        />
      </div>

      <div>
        <label>Vertical cards count {gameSettings.verticalCardsCount}</label>
        <input
          className='block w-full px-4 py-2'
          {...register('verticalCardsCount')}
          type="range"
          min={GAME_SETTINGS.MINIMUM_VERTICAL_CARDS_COUNT}
          max={GAME_SETTINGS.MAXIMUM_VERTICAL_CARDS_COUNT}
        />
      </div>
    </div>
  )
}

export default GameSettings;
