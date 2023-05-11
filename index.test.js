const fs = require('fs');
const axios = require('axios');
const {
  getAllOutages,
  getSiteInfo,
  filterOutages,
  attachDeviceNames,
  postSiteOutages,
} = require('./index.js');

jest.mock('fs');
jest.mock('axios');

describe('getAllOutages', () => {
  it('should call axios with the correct parameters and return the data', async () => {
    const testData = [
      {
        id: '0bd995be-f298-40dd-83d3-830b23487aee',
        begin: '2021-11-14T16:19:21.507Z',
        end: '2022-04-07T17:59:39.017Z',
      },
    ];
    axios.get.mockResolvedValue({ data: testData });

    const result = await getAllOutages();

    expect(axios.get).toHaveBeenCalledWith('outages');
    expect(result).toEqual(testData);
  });
});

describe('getSiteInfo', () => {
  it('should call axios with the correct parameters and return the data', async () => {
    const testData = {
      devices: [
        {
          id: '0bd995be-f298-40dd-83d3-830b23487aee',
          name: 'Device 1',
        },
      ],
    };
    const siteId = 'norwich-pear-tree';
    axios.get.mockResolvedValue({ data: testData });

    const result = await getSiteInfo(siteId);

    expect(axios.get).toHaveBeenCalledWith(`site-info/${siteId}`);
    expect(result).toEqual(testData);
  });
});

describe('filterOutages', () => {
  it('should return only valid outages', () => {
    const outages = [
      {
        id: '0bd995be-f298-40dd-83d3-830b23487aee',
        begin: '2021-11-14T16:19:21.507Z',
        end: '2022-04-07T17:59:39.017Z',
      },
      {
        id: '0e4d59ba-43c7-4451-a8ac-ca628bcde417',
        begin: '2022-02-15T11:28:26.735Z',
        end: '2022-08-28T03:37:48.568Z',
      },
    ];
    const siteInfo = {
      devices: [
        {
          id: '0bd995be-f298-40dd-83d3-830b23487aee',
          name: 'Device 1',
        },
      ],
    };

    const result = filterOutages(outages, siteInfo);

    expect(result.length).toBe(1);
    expect(result[0]).toEqual(outages[1]);
  });
});

describe('attachDeviceNames', () => {
  it('should add device names to outages', () => {
    const outages = [
      {
        id: '0bd995be-f298-40dd-83d3-830b23487aee',
        begin: '2022-01-01T00:00:00.000Z',
        end: '2022-09-15T19:45:10.341Z',
      },
    ];
    const siteInfo = {
      devices: [
        {
          id: '0bd995be-f298-40dd-83d3-830b23487aee',
          name: 'Device 1',
        },
      ],
    };

    const result = attachDeviceNames(outages, siteInfo);

    expect(result.length).toBe(1);
    expect(result[0]).toEqual({ ...outages[0], name: 'Device 1' });
  });
});

describe('postSiteOutages', () => {
  it('should call axios with the correct parameters and return the data', async () => {
    const testData = { success: true };
    const siteId = 'norwich-pear-tree';
    const outages = [
      {
        id: '0bd995be-f298-40dd-83d3-830b23487aee',
        begin: '2022-01-01T00:00:00.000Z',
        end: '2022-09-15T19:45:10.341Z',
        name: 'Device 1',
      },
    ];
    axios.post.mockResolvedValue({ data: testData });

    const result = await postSiteOutages(siteId, outages);

    expect(axios.post).toHaveBeenCalledWith(`site-outages/${siteId}`, outages);
    expect(result).toEqual(testData);
  });
});

// Test cases for edge scenarios
describe('Edge scenarios', () => {
  it('should handle empty outages list', () => {
    const outages = [];
    const siteInfo = {
      devices: [
        {
          id: '0bd995be-f298-40dd-83d3-830b23487aee',
          name: 'Device 1',
        },
      ],
    };

    const result = filterOutages(outages, siteInfo);

    expect(result.length).toBe(0);
  });

  it('should handle empty siteInfo devices list', () => {
    const outages = [
      {
        id: '0bd995be-f298-40dd-83d3-830b23487aee',
        begin: '2022-01-01T00:00:00.000Z',
        end: '2022-09-15T19:45:10.341Z',
      },
    ];
    const siteInfo = {
      devices: [],
    };

    const result = filterOutages(outages, siteInfo);

    expect(result.length).toBe(0);
  });

  it('should handle outages with no matching device', () => {
    const outages = [
      {
        id: 'nonexistent-device-id',
        begin: '2022-01-01T00:00:00.000Z',
        end: '2022-09-15T19:45:10.341Z',
      },
    ];
    const siteInfo = {
      devices: [
        {
          id: '0bd995be-f298-40dd-83d3-830b23487aee',
          name: 'Device 1',
        },
      ],
    };

    const result = filterOutages(outages, siteInfo);

    expect(result.length).toBe(0);
  });
});
