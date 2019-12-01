import iAB from './'

const mockClient = (response) => () => Promise.resolve(response)

describe('iAB', () => {
  describe('meta', () => {
    const now = Date.now()
    const client = mockClient({ vendorListVersion: 1, lastUpdated: now })

    it('contains version and lastUpdated', async () => {
      await expect(new iAB(1, client).meta).resolves.toMatchObject({ 
        version: 1,
        lastUpdated: now
      })
    })
  })

  it('contains vendors', async () => {
    const client = mockClient({ vendors: [{ foo: 'bar' }] })
    await expect(new iAB(1, client).vendors).resolves.toEqual([{ foo: 'bar' }])
  })


  it('contains purposes', async () => {
    const client = mockClient({ purposes: [{ foo: 'bar' }] })
    await expect(new iAB(1, client).purposes).resolves.toEqual([{ foo: 'bar' }])
  })

  describe('vendorList', () => {
    it('contains meta, purposes and vendors', async () => {
      const client = mockClient({ meta: {}, vendors: [], purposes: [] })
      await expect(new iAB(1, client).vendorList).resolves.toMatchObject({ 
        meta: {},
        vendors: [],
        purposes: []
      })
    });
  });
})