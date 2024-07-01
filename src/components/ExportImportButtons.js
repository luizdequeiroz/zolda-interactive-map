import React from 'react';

function ExportImportButtons({ onExport, onImport }) {
  const handleFileChange = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      onImport(event.target.result);
    };
    fileReader.readAsText(e.target.files[0]);
  };

  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
      <button onClick={onExport} style={{ marginRight: '10px' }}>Exportar</button>
      <input type="file" accept=".json" onChange={handleFileChange} />
    </div>
  );
}

export default ExportImportButtons;
