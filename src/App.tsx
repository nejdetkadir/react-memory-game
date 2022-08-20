import React from 'react';
import { DefaultLayout } from './layouts'
import { GameArea } from './components';
import { GameProvider } from "./hooks/useGame";

const App: React.FC = () => {
  return (
    <GameProvider>
      <DefaultLayout>
        <GameArea />
      </DefaultLayout>
    </GameProvider>
  );
}

export default App;
