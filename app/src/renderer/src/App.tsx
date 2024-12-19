import Versions from './components/Versions'
import mapLogo from './assets/map-logo.svg'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <img alt="logo" className="logo" src={mapLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Open any <span className="react">GPX</span>
        &nbsp;file with <span className="ts">ease</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Learn More
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Get Started
          </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
