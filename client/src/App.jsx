import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [malzemeKartlari, setMalzemeKartlari] = useState([]);

  useEffect(() => {
    // bilesen render olduktan sonra malzeme kartlarini getirmek icin cagri yapar
    const fetchMalzemeKartlari = async () => {
      const url = "http://localhost:8000/malzeme-kartlari";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        setMalzemeKartlari(json);
      } catch(error) {
        console.log(error.message);
      }
    }

    fetchMalzemeKartlari()
  }, [])

  return (
    <div className='table-container'>
      <h1 className='table-title'>Malzeme Kartları</h1>
      <table className='styled-table'>
        <thead>
          <tr>
            <th>Malzeme Kodu</th>
            <th>Malzeme Adı</th>
            <th>Grup Adı</th>
            <th>KAF Kodu</th>
            <th>Artikel Kodu</th>
            <th>Malzeme Yabancı Adı</th>
            <th>Birim</th>
          </tr>
        </thead>
        <tbody>
          {malzemeKartlari.map(malzemeKarti => (
            <tr key={malzemeKarti.KAFKodu}>
              <td>{malzemeKarti.MalzemeKodu}</td>
              <td>{malzemeKarti.MalzemeAdi}</td>
              <td>{malzemeKarti.GrupAdi}</td>
              <td>{malzemeKarti.KAFKodu}</td>
              <td>{malzemeKarti.ArtikelKodu}</td>
              <td>{malzemeKarti.YabanciAdi}</td>
              <td>{malzemeKarti.Birim}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
