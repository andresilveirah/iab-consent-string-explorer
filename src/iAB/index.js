const vendorListUrl = (version) => version ? 
  `https://vendorlist.consensu.org/v-${version}/vendorlist.json` :
  `https://vendorlist.consensu.org/vendorlist.json`

const getVendorList = (version) => () => fetch(vendorListUrl(version), { mode: 'cors' }).then(r => r.json())

export default class iAB {
  constructor(version, fetchVendorList = getVendorList(version) ) {
    this.fetchVendorList = fetchVendorList
  }

  get vendorList() {
    return this.fetchVendorList()
  }

  get meta() {
    return this.vendorList.then(({ vendorListVersion, lastUpdated }) => ({ 
      version: vendorListVersion,
      lastUpdated: lastUpdated
    }))
  }

  get vendors() {
    return this.vendorList.then(({ vendors }) => vendors)
  }

  get purposes() {
    return this.vendorList.then(({ purposes }) => purposes)
  }
}