import React, { useState, useEffect } from 'react';
import { FaMicrophone } from 'react-icons/fa'; // Import the microphone icon
import TopNavbar from './TNav';
import BottomNav from './BNav';
import Footer from './footer';
import ostrich from './assets/panther.png'; // Import your image

const WoofAI = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Handle microphone logo click
  const handleMicClick = () => {
    setShowOptions(!showOptions);
  };

  // Handle record option
  const handleRecord = () => {
    setIsRecording(true);
    setShowOptions(false);
  };

  // Handle upload option
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file); // Debugging
      setAudioFile(file);
      setShowOptions(false);
    } else {
      console.log('No file selected'); // Debugging
    }
  };

  // Handle submit (simulate analysis)
  const handleSubmit = () => {
    // Simulate analyzing the audio
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
      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          backgroundColor: 'black', // Dark background
          fontFamily: 'Montaga',
          overflow: 'hidden',
        }}
      >
        {/* Spotlight Effect */}
        <div
          style={{
            position: 'absolute',
            top: cursorPosition.y - 100, // Adjust to center the spotlight
            left: cursorPosition.x - 100, // Adjust to center the spotlight
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent 70%)',
            pointerEvents: 'none', // Ensure the spotlight doesn't interfere with clicks
            zIndex: 2,
          }}
        ></div>

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2, // Ensure content is above the spotlight
            display: 'flex',
            minHeight: '100vh',
          }}
        >
          {/* Left Side Image */}
          <div
            style={{
              flex: '1',
              backgroundImage: `url(${ostrich})`,
              backgroundSize: 'cover',
              //backgroundPosition: 'center',
              left: '-200px'
            }}
          ></div>

          {/* Right Side Content */}
          <div
            style={{
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              color: 'black', // Light text for dark background
            }}
          >
            {/* Title */}
            <h1 style={{ fontSize: '3.5rem', marginBottom: '10px' }}>WoofAI</h1>

            {/* Description */}
            <p style={{ fontSize: '1.5rem', marginBottom: '30px', textAlign: 'center' }}>
              WoofAI is an innovative tool that analyzes your pet's sayings to provide insights such as transcription, sentiment, and keywords. Click the microphone to get started!
            </p>

            {/* Microphone Logo with Red Circle */}
            <div
              style={{
                position: 'relative',
                cursor: 'pointer',
                marginBottom: '20px',
              }}
              onClick={handleMicClick}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'black',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FaMicrophone
                  style={{ width: '40px', height: '40px', color: 'red' }} // Microphone icon
                />
              </div>

              {/* Options (Record or Upload) */}
              {showOptions && (
                <div
                  style={{
                    position: 'absolute',
                    top: '80px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
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
            </div>

            {/* Recording Card */}
            {isRecording && (
              <div
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  width: '300px',
                  textAlign: 'center',
                  color: 'black', // Dark text for light background
                }}
              >
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Recording...</h3>
                <button
                  onClick={() => {
                    setIsRecording(false);
                    handleSubmit();
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Stop & Submit
                </button>
              </div>
            )}

            {/* Uploaded File Card */}
            {audioFile && (
              <div
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  width: '600px',
                  textAlign: 'center',
                  color: 'black', // Dark text for light background
                }}
              >
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Uploaded File</h3>
                <p style={{ fontSize: '1rem', marginBottom: '20px' }}>{audioFile.name}</p>
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Submit for Analysis
                </button>
              </div>
            )}

            {/* Analysis Result */}
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
                  color: 'black', // Dark text for light background
                }}
              >
                <h3 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Analysis Result</h3>
                <p style={{ fontSize: '1.3rem', marginBottom: '10px' }}>
                  <strong>Transcript:</strong> {analysisResult.transcript}
                </p>
                <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                  <strong>Sentiment:</strong> {analysisResult.sentiment}
                </p>
                <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                  <strong>Keywords:</strong> {analysisResult.keywords.join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WoofAI;