import React, { useState } from 'react';
import './home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/Explore-menu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

import AppDownload from '../../components/AppDownload/AppDownload';



const Home = () => {
  const [category, setCategory] = useState('All'); // Initialize state

  return (
    <div className='Home'>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
       <FoodDisplay category={category}></FoodDisplay>
       <AppDownload/>
    </div>
  );
};

export default Home;
