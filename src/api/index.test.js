import { Api } from './index';

describe('API methods', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  //POST /createComment
  it('should call POST request with a body and return data', async () => {
    const mockResponse = { "id": 98 };
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

  //GET /getComments
  it('should call GET request and return data', async () => {
    const mockResponse = [{"id":95,"name":"Cris","message":"Hello, world!","created":"2023-10-02 15:44:57"},{"id":96,"name":"Marceline's Mom","message":"Something weird might just be something familiar viewed from a different angle.","created":"2023-10-02 15:55:27"},{"id":97,"name":"Royal Tart Toter","message":"This cosmic dance of bursting decadence and withheld permissions twists all our arms collectively, but if sweetness can win, and it can, then I’ll still be here tomorrow to high-five you yesterday, my friend. Peace.","created":"2023-10-02 15:55:51"}];
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const url = '/getComments';
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

  //GET /getComment
  it('should call GET request and return data', async () => {
    const mockResponse = {"id":97,"name":"Royal Tart Toter","message":"This cosmic dance of bursting decadence and withheld permissions twists all our arms collectively, but if sweetness can win, and it can, then I’ll still be here tomorrow to high-five you yesterday, my friend. Peace.","created":"2023-10-02 15:55:51"};
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const url = '/getComment?id=97';
    //const body = {id: 97};
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


  it('should call DELETE request and return data', async () => {
    const mockResponse = { "id": 98 };
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
