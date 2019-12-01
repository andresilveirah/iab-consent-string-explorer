const proxied = (url) => `https://shrouded-island-73798.herokuapp.com/${url}`

const vendorListUrl = (version) => version ?
  `https://vendorlist.consensu.org/v-${version}/vendorlist.json` :
  `https://vendorlist.consensu.org/vendorlist.json`

const getVendorList = (version) => () =>
  fetch(proxied(vendorListUrl(version)))
  .then(r => r.json())
  .then(list => ({ ...list, url: vendorListUrl(version)}))

const byId = (arr) => arr.reduce((collection, element) => {
  collection[element.id] = element
  return collection
}, {})

export default (version, fetchVendorList = getVendorList(version)) => fetchVendorList().then(list => ({
  meta: {
    url: list.url,
    version: list.vendorListVersion,
    lastUpdated: list.lastUpdated,
  },
  vendorsById: byId(list.vendors),
  purposesById: byId(list.purposes)
}))
