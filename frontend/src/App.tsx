import { useState } from 'react';
import LandingPage from './components/LandingPage';
import CodeUpload from './components/CodeUpload';
import Dashboard from './components/Dashboard';
import { ScanResult } from './types';

type AppState = 'landing' | 'upload' | 'results';

function App() {
  const [state, setState] = useState<AppState>('landing');
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [scannedCode, setScannedCode] = useState<string>('');

  const handleStartScan = () => {
    setState('upload');
  };

  const handleScanComplete = (result: ScanResult, code: string) => {
    setScanResult(result);
    setScannedCode(code);
    setState('results');
  };

  const handleNewScan = () => {
    setState('upload');
    setScanResult(null);
    setScannedCode('');
  };

  const handleBackToHome = () => {
    setState('landing');
    setScanResult(null);
    setScannedCode('');
  };

  return (
    <>
      {state === 'landing' && <LandingPage onStartScan={handleStartScan} />}
      {state === 'upload' && (
        <CodeUpload onScanComplete={handleScanComplete} onBack={handleBackToHome} />
      )}
      {state === 'results' && scanResult && (
        <Dashboard result={scanResult} code={scannedCode} onNewScan={handleNewScan} />
      )}
    </>
  );
}

export default App;
