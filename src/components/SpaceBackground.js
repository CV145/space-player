// SpaceBackground.js
import React, { useEffect } from 'react';
import Dot from './Dot'; // Import the Dot component
import MusicPlayer from './MusicPlayer';
import SpotifyLoginButton from './SpotifyLoginButton';
import SpotifyPlayerContainer from './SpotifyPlayerContainer';

function SpaceBackground() {

    
    useEffect(() => {
        // This is where you change the document.body.style, which is a side effect.
        document.body.style.backgroundColor = 'black';
      }, []);

    const numDots = 100;
    const dotComponents = [];

    for (let i=0; i < numDots; i++)
    {
        console.log("Added dot " + i);
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        //Create Dot component and push to array
        dotComponents.push(<Dot key={i} x={x} y={y} />);
    }

    return <div className="space-background">
        {dotComponents}
            <SpotifyPlayerContainer/>
    </div>;
}

export default SpaceBackground;

/*
Side effects: operations that effect the outside world, such as DOM

useEffect manages side effects by performing them in a controlled manner. The effect runs once, only after the component has mounted. We can control when the side effect occurs using useEffect
*/