import React, { useState, useRef } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import TopNavbar from './TNav';
import BottomNav from './BNav';
import Footer from './footer';
import TestimonialCard from './woofcards';
import talk from "./assets/talking.jpg";
import bgImage from "./assets/background.jpg";  // Import local background image

const WoofAI = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  // 🎤 Toggle microphone options
  const handleMicClick = () => {
    setShowOptions(prev => !prev);
    console.log("Mic Clicked, showOptions:", !showOptions);
  };

  // 🎙️ Start Recording
  const handleRecord = async () => {
    setIsRecording(true);
    setShowOptions(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunks.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        setAudioFile(audioBlob);
        console.log("Recording saved:", audioBlob);
      };

      mediaRecorder.start();
      console.log("Recording started...");
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  // ⏹️ Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      handleSubmit();
    }
  };

  // 📤 Upload Audio File
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioFile(file);
      setShowOptions(false);
      console.log("File uploaded:", file.name);
    }
  };

  // 🔍 Simulated Analysis
  const handleSubmit = () => {
    setTimeout(() => {
      setAnalysisResult({
        transcript: "This is a simulated transcript of the audio.",
        sentiment: "Positive",
        keywords: ["dog", "bark", "happy"],
      });
    }, 2000);
  };

  return (
    <>
      <TopNavbar />
      <BottomNav />

      {/* 🖼️ Large Banner Image with Text Overlay */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        textAlign: 'center' ,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', /* Semi-transparent black overlay */

      }}>
        <img 
          src={talk}
          alt="Large Banner" 
          style={{ width: '100%', maxHeight: '550px', objectFit: 'cover', filter: 'brightness(0.8)' }} 

        />

        {/* Text Overlay */}
        <div 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            color: 'white', 
            textAlign: 'center', 
            textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
            padding: '20px',
            width: '90%',
          }}
        >
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
            Wanna know what your pet wants to say to you?
          </h1>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 'lighter' }}>
            we present you
          </h3>
        </div>
      </div>

      {/* 🐶 Main Content Section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '20px',
          fontFamily: 'Montaga',
          position: 'relative', // Ensures absolute positioning works inside
        }}
      >
        <h1 style={{ fontSize: '3.5rem', color: 'black', marginBottom: '10px' }}>WoofAI</h1>
        <p style={{ fontSize: '1.5rem', color: 'black', marginBottom: '20px', textAlign: 'center' }}>
          WoofAI is an innovative tool that analyzes your pet's sayings to provide insights such as transcription, sentiment, and keywords. Click the microphone to get started!
        </p>

        {/* 🎤 Microphone Button with Red Circle */}
        <div
          style={{
            position: 'relative',
            cursor: 'pointer',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80px',
            height: '80px',
            backgroundColor: 'red',
            borderRadius: '50%',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          }}
          onClick={handleMicClick}
        >
          <FaMicrophone style={{ width: '50px', height: '50px', color: 'white' }} />
        </div>

        {/* 🎛️ Options (Record or Upload) */}
        {showOptions && (
          <div
            style={{
              position: 'absolute',
              top: '330px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              zIndex: 10, // Ensures visibility
            }}
          >
            <button
              onClick={handleRecord}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Record
            </button>
            <label
              htmlFor="upload-audio"
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                textAlign: 'center',
                fontSize: '14px',
              }}
            >
              Upload
              <input
                id="upload-audio"
                type="file"
                accept="audio/*"
                style={{ display: 'none' }}
                onChange={handleUpload}
              />
            </label>
          </div>
        )}

        {/* 📝 Analysis Result */}
        {analysisResult && (
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              width: '600px',
              textAlign: 'center',
              marginTop: '20px',
            }}
          >
            <h3 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Analysis Result</h3>
            <p><strong>Transcript:</strong> {analysisResult.transcript}</p>
            <p><strong>Sentiment:</strong> {analysisResult.sentiment}</p>
            <p><strong>Keywords:</strong> {analysisResult.keywords.join(' ')}</p>
          </div>
        )}

        <TestimonialCard />
      </div>

      <Footer />
    </>
  );
};

export default WoofAI;
