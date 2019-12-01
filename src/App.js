import React, { useState } from 'react'
import { decodeConsentString as decode } from 'consent-string'

import iAB from './iAB'

const DecodedConsentString = ({ consentString }) => {
  const [decodedString, setConsentString] = useState({})
  try { setConsentString(decode(consentString)) } catch {}
  return (
    <code>
      <table>
        <tbody>
          {Object.keys(decodedString).map((attr, i) => (
            <tr key={i}>
              <td>{attr}</td>
              <td>{`${decodedString[attr] || '<i>test</i>'}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </code>
  )
}

export default () => {
  const [consentString, setConsentString] = useState('BOq2z-OOq2z-OAGABBENCw-AAAAsyADABUADQAUg')
  const [vendorList, setVendorList] = useState({ meta: {}, vendors: [], purposes: [] })
  new iAB().vendorList.then(setVendorList)
  return (
    <div>
      <header>
        <a href="/">CONSENT STRING EXPLORER</a>
      </header>
      <main>
        <section>
          <input value={consentString} onChange={e => setConsentString(e.target.value)} placeholder="Consent String..." />
        </section>
        <section>
          <p>Decoded String</p>
          <DecodedConsentString {...{consentString}} />
        </section>
        <footer>
          <small>
            Vendors List version <a href="/" target="_blank"><i>{vendorList.meta.version}</i></a> last updated <i>{vendorList.meta.lastUpdated}</i>
          </small>
        </footer>
      </main>
    </div>
  )
}