import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import TopBar from './components/TopBar';
import SocialMediaDock from './components/SocialMediaDock';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import Layout from './Layout';
import HomePageContent from './components/HomepageContent';
import FeaturesAndServices from './components/FeaturesAndServices';

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
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
