/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Lobby from './pages/Lobby/Lobby';
import HowToPlay from './pages/HowToPlay/HowToPlay';
import Promos from './pages/Promos/Promos';
import ContestDetails from './pages/ContestDetails/ContestDetails';
import DraftRoom from './pages/DraftRoom/DraftRoom';
import SalaryCap from './pages/SalaryCap/SalaryCap';
import AuctionDraft from './pages/AuctionDraft/AuctionDraft';
import FantasyLobby from './pages/Fantasy/FantasyLobby';
import TournamentTeamBuilder from './pages/Fantasy/TournamentTeamBuilder';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/fantasy" element={<FantasyLobby />} />
        <Route path="/fantasy/tournament/:id" element={<TournamentTeamBuilder />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="/promos" element={<Promos />} />
        <Route path="/contest/:id" element={<ContestDetails />} />
        <Route path="/draft/:id" element={<DraftRoom />} />
        <Route path="/salary-cap/:id" element={<SalaryCap />} />
        <Route path="/auction/:id" element={<AuctionDraft />} />
      </Routes>
    </Router>
  );
}
