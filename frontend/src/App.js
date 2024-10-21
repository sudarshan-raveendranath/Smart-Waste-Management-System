<<<<<<< Updated upstream
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import TopBar from './components/TopBar';
import SocialMediaDock from './components/SocialMediaDock';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import Layout from './Layout';
import HomePageContent from './components/HomepageContent';
import FeaturesAndServices from './components/FeaturesAndServices';
import TrashBin from './components/TrashBin';
import RequestBin from './components/RequestBin';
import ViewMyBins from './components/ViewMyBins';
import ManageBin from './components/ManageBin';
import BinPayments from './components/BinPayments';
import SpecialEventsPage from './components/SpecialEventsPage';
import ManageSpecialEvents from './components/ManageSpecialEvents';
import RequestSpecialEvents from './components/RequestSpecialEvent';
import SpecialEventPayment from './components/SpecialEventPayment';
import UpdateSpecialEvent from './components/UpdateSpecialEvent';
import AllBins from './components/AllBins';
import BinRequest from './components/BinRequest';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/NavBar" element={<NavBar />} />
          <Route path="/TopBar" element={<TopBar />} />
          <Route path="/SocialMediaDock" element={<SocialMediaDock />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/HomePageContent" element={<HomePageContent />} />
          <Route path="/FeaturesAndServices" element={<FeaturesAndServices />} />
          <Route path="/TrashBin" element={<TrashBin />} />
          <Route path="/RequestBins" element={<RequestBin />} />
          <Route path="/ViewMyBins" element={<ViewMyBins />} />
          <Route path="/ManageBins" element={<ManageBin />} />
          <Route path="/BinPayments" element={<BinPayments />} />
          <Route path="/SpecialEventsPage" element={<SpecialEventsPage />} />
          <Route path="/ManageSpecialEvents" element={<ManageSpecialEvents />} />
          <Route path="/RequestSpecialEvents" element={<RequestSpecialEvents />} />
          <Route path="/SpecialEventPayment" element={<SpecialEventPayment />} />
          <Route path="/UpdateSpecialEvent" element={<UpdateSpecialEvent />} />
          <Route path="/Allbins" element={<AllBins />} />
          <Route path="/BinRequests" element={<BinRequest />} />
          
        </Routes>
      </Layout>
    </Router>
>>>>>>> Stashed changes
  );
}

export default App;
