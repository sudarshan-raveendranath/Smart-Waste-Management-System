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
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
