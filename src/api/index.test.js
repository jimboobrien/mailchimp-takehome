import { Api } from './index';

describe('API methods', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call GET request and return data', async () => {
    const mockResponse = { data: 'test' };
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const url = '/getcomments';
    const result = await Api.get(url);

    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    expect(result).toEqual(mockResponse);
  });

  it('should call POST request with a body and return data', async () => {
    const mockResponse = { data: 'test' };
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const url = '/createComment';
    const body = {"id": 105, "name": "Jim OBrien", "message": "Jimbo Test Message", "created": "2024-09-24 00:09:06" };
    const result = await Api.post(url, body);

    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    expect(result).toEqual(mockResponse);
  });

  it('should call DELETE request and return data', async () => {
    const mockResponse = { data: 'test' };
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const url = '/deleteComments';
    const result = await Api.delete(url);

    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    expect(result).toEqual(mockResponse);
  });

});
