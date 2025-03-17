import React, { useState } from 'react';
import { FaMicrophone } from 'react-icons/fa'; // Import the microphone icon
import TopNavbar from './TNav';
import BottomNav from './BNav';
import Footer from './footer';

const WoofAI = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

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
      setAudioFile(file);
      setShowOptions(false);
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: 'rgb(231, 131, 68)',
          padding: '20px',
          fontFamily: 'Montaga',
        }}
      >
        {/* Title */}
        <h1 style={{ fontSize: '3.5rem', color: 'black', marginBottom: '10px' }}>WoofAI</h1>

        {/* Description */}
        <p style={{ fontSize: '1.5rem', color: 'black', marginBottom: '30px', textAlign: 'center' }}>
          WoofAI is an innovative tool that analyzes your pet's sayings to provide insights such as transcription, sentiment, and keywords. Click the microphone to get started!
        </p>

        {/* Microphone Logo */}
        <div
          style={{
            position: 'relative',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
          onClick={handleMicClick}
        >
          <FaMicrophone
            style={{ width: '50px', height: '50px', color: 'black' }} // Microphone icon
          />

          {/* Options (Record or Upload) */}
          {showOptions && (
            <div
              style={{
                position: 'absolute',
                top: '60px',
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
            }}
          >
            <h3 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Analysis Result</h3>
            <p style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
              <strong>Transcript:</strong> {analysisResult.transcript}
            </p>
            <p style={{ fontSize: '1rem', marginBottom: '10px' }}>
              <strong>Sentiment:</strong> {analysisResult.sentiment}
            </p>
            <p style={{ fontSize: '1rem', marginBottom: '10px' }}>
              <strong>Keywords:</strong> {analysisResult.keywords.join(', ')}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WoofAI;