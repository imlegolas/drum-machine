import logo from './logo.svg';
import './App.css';
import React, { Component, useState } from 'react';

const audioClips = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

function App()
{
  const [volume, setVolume] = useState(1);
  const [recording, setRecording] = useState("");
  const [speed, setSpeed] = useState(0.5);
  const [clipName, setClipName] = useState();

  const playRecording = () =>
  {
    let index = 0;
    let recordArray = recording.split(" ");
    const interval = setInterval(() =>
    {
      const audioTag = document.getElementById(recordArray[index])
      // setActive(true);
      // setTimeout(() => setActive(false), 200);
      audioTag.volume = volume;
      audioTag.currentTime = 0;
      audioTag.play();
      // setRecording(prev => prev + clip.keyTrigger + " ");
      index++;
    }, speed * 600)
    setTimeout(() => clearInterval(interval), 600 * speed * recordArray.length - 1);
  };

  return (
    <div className="App" id="drum-machine">
      <div className="container">
        <div id="display" className="display">
          {audioClips.map(clip => (
            <Pad key={clip.id} clip={clip} volume={volume} setRecording={setRecording} setClipName={setClipName}></Pad>
          ))}
          <h3 className="clip-name">{clipName}</h3>
        </div>



      </div>
      <h4>Volume</h4>
      <input type="range" step="0.01" value={volume} max="1" min="0" onChange={(e) => setVolume(e.target.value)}></input>

      <h3 className="recorded-keys"> {recording} </h3>
      {recording && (
        <>
          <div className="recording-buttons">      
            <button className="clear-button" onClick={() => setRecording("")} >Clear</button>
            <button className="play-button" onClick={playRecording} >Play</button>
          </div>

          <h4>Speed</h4>
          <input type="range" step="0.01" value={speed} max="1.2" min="0.1" onChange={(e) => setSpeed(e.target.value)}></input>
        </>
      )}
    </div>
  )
}

function Pad({ clip, volume, setRecording, setClipName })
{

  const [active, setActive] = useState(false);

  React.useEffect(() =>
  {
    document.addEventListener('keydown', handleKeyPress);
    return () =>
    {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }, [])

  const handleKeyPress = (e) =>
  {
    if (e.keyCode === clip.keyCode)
    {
      playSound();
    }
  }

  const playSound = () =>
  {
    setClipName(clip.id);
    const audioTag = document.getElementById(clip.keyTrigger)
    setActive(true);
    setTimeout(() => setActive(false), 200);
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
    setRecording(prev => prev + clip.keyTrigger + " ");
  };

  return (
    <div className={`drum-pad ${active && "drum-pad-active"}`} id="drum-pad" onClick={playSound} >
      <audio className="clip" id={clip.keyTrigger} src={clip.url} />
      {clip.keyTrigger}
    </div>
  );
}

export default App;
