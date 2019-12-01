import React, { useState, useEffect } from 'react'
import { decodeConsentString as decode } from 'consent-string'

import fetchVendorList from './iAB'

const Names = ({ ids, list }) => (
  <span>
    {String(ids)} - 
      <small>{
        ids.map(id =>
          list[id] ? list[id].name : '-'
        ).join(',')}
      </small>
  </span>
)

const getAttribute = (attr, value, vendorList) => {
  switch (attr) {
    case 'allowedVendorIds':
      return <Names ids={value} list={vendorList.vendorsById} />
    case 'allowedPurposeIds':
      return <Names ids={value} list={vendorList.purposesById} />
    case 'lastUpdated':
    case 'created': 
      return value.toDateString()
    default:
      return String(value)
  }
}

const DecodedConsentString = ({ consentString, vendorList }) => {
  const [decodedString, setConsentString] = useState({})
  try { setConsentString(decode(consentString)) } catch {}

  return (
    <code>
      <table>
        <tbody>
          {Object.keys(decodedString).map((attr, i) => (
            <tr
              key={i}
              style={{ 
                backgroundColor: i % 2 ? '#ddd':'#eee'
              }}>
              <td style={{ padding: 15 }}>{attr}</td>
              <td style={{ padding: 15 }}>
                {getAttribute(attr, decodedString[attr] || [], vendorList)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </code>
  )
}

export default () => {
  const [consentString, setConsentString] = useState('')
  const [vendorList, setVendorList] = useState({ meta: {}, vendors: [], purposes: [] })
  useEffect(() => { fetchVendorList().then(setVendorList) }, []);
  
  return (
    <div>
      <header style={{ 
        padding: "10px 0"
      }}>
        <a href="/">CONSENT STRING EXPLORER</a>
      </header>
      <main>
        <section>
          <input
            style={{
              height: 30,
              width: '100%',
              fontSize: '1.5em'
            }} 
            value={consentString}
            onChange={e => setConsentString(e.target.value)} placeholder="Consent String..."
          />
        </section>
        <section
          style={{
            padding: '10px 0'
          }}
        >
          <p>Decoded String</p>
          <DecodedConsentString consentString={consentString} vendorList={vendorList} />
        </section>
        <footer>
          <small>
            Vendors List version <a href={vendorList.meta.url} target="_blank" rel='noopener noreferrer'><i>{vendorList.meta.version}</i></a> last updated <i>{vendorList.meta.lastUpdated}</i>
          </small>
        </footer>
        <p>BOq5iXTOq5iXTAGABBENCx-AAAAs6ADABUADQAUg</p>
      </main>
    </div>
  )
}