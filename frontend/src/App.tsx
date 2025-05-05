import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Insights from './pages/Insights';
import Layout from './layouts/Layout';
import HateApi from './pages/HateAPI';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/hate_api" element={<HateApi />} />
          <Route path="/insights" element={<Insights />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
