import React from "react";
import {Switch, Route} from 'react-router-dom';

import Home from './components/home/Home';
import Bag from './components/bag/Bag';

export default

<Switch>
    <Route path='/bag' component={Bag}/>
    <Route path='/' component={Home}/> 
</Switch>