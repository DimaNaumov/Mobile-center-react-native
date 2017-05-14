import React, { Component } from 'react';
import Crashes from "mobile-center-crashes";

export class SelfCrashes extends Component {
    constructor(props) {
        super(props);
    }
    crash(){
        Crashes.generateTestCrash();
    }
}

export default SelfCrashes;